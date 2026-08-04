<?php
/* =============================================================================
   Mizarium — receptor del formulario de contacto
   =============================================================================

   QUÉ ES ESTO
   Un único archivo PHP que recibe el formulario, lo valida y manda el correo.
   Sustituye a las Astro Actions + Resend, que obligaban a tener la web en un
   servidor Node (por eso estaba en Vercel). Con esto el sitio vuelve a ser
   HTML estático y se puede subir tal cual a Hostinger.

   CÓMO LLEGA AQUÍ
   Astro copia todo lo que hay en `public/` a `dist/` sin tocarlo, así que al
   subir el contenido de `dist/` a `public_html/` este archivo queda colgando
   de https://mizarium.com/contacto.php y Apache lo ejecuta.

   POR QUÉ ESTO Y NO WEB3FORMS
   Web3Forms es más rápido de montar, pero: la clave va a la vista en el JS del
   cliente, el correo sale de sus servidores y no de @mizarium.com, hay tope de
   250 envíos al mes y los mensajes pasan por un tercero. Esto es tuyo entero,
   sin límite y con validación de servidor de verdad.

   ANTES DE SUBIRLO — LO ÚNICO QUE HAY QUE TOCAR
   1. $DESTINO   → dónde quieres recibir los mensajes.
   2. $REMITENTE → una dirección @mizarium.com. Hostinger rechaza los correos
                   cuyo remitente no sea del propio dominio, así que aquí NO
                   puede ir un @gmail.com. No hace falta que el buzón exista.
   3. $ORIGENES  → los dominios desde los que aceptas envíos. OJO: si pruebas
                   primero en el dominio temporal de Hostinger (algo.hostinger
                   site.com), añádelo aquí o el envío devolverá 403.

   CÓMO PROBARLO
   `astro dev` no ejecuta PHP: en local este archivo se sirve como texto y el
   formulario mostrará el estado de error. Es lo esperado. Para probarlo de
   verdad, súbelo al hosting, o levanta PHP en local con:
       php -S localhost:8080 -t dist

   REQUISITO
   PHP 7.4 o superior (por las funciones flecha `fn`). Hostinger viene con 8.x
   por defecto, así que no hay nada que configurar.
   ========================================================================== */

$DESTINO   = 'mizariumstudio@gmail.com';       // buzón actual del estudio
$REMITENTE = 'no-reply@mizarium.com';          // TODO: debe ser del dominio propio
$ORIGENES  = ['https://mizarium.com', 'https://www.mizarium.com'];

$MAX_POR_HORA = 5;                             // envíos permitidos por IP

header('Content-Type: application/json; charset=utf-8');

/* --- Respuesta corta y salida ------------------------------------------- */
function responder($codigo, $ok, $mensaje) {
    http_response_code($codigo);
    echo json_encode(['ok' => $ok, 'mensaje' => $mensaje], JSON_UNESCAPED_UNICODE);
    exit;
}

/* --- 1. Solo POST -------------------------------------------------------
   Un GET a esta URL no debe hacer nada. */
if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    responder(405, false, 'Método no permitido.');
}

/* --- 2. El envío viene de nuestra propia web ----------------------------
   No es infalible (una cabecera se falsifica), pero corta de raíz los bots
   que rastrean endpoints y disparan desde cualquier sitio. */
$origen = $_SERVER['HTTP_ORIGIN'] ?? '';
if ($origen === '' && !empty($_SERVER['HTTP_REFERER'])) {
    $partes = parse_url($_SERVER['HTTP_REFERER']);
    $origen = ($partes['scheme'] ?? '') . '://' . ($partes['host'] ?? '');
}
if ($origen !== '' && !in_array($origen, $ORIGENES, true)) {
    responder(403, false, 'Origen no permitido.');
}

/* --- 3. Honeypot --------------------------------------------------------
   El formulario incluye un campo `website` escondido fuera de pantalla. Una
   persona no lo ve y no lo rellena; muchos bots rellenan todo lo que
   encuentran. Si viene con algo, fingimos éxito: si le devolviéramos un
   error, el bot sabría que hay un filtro y probaría otra cosa. */
if (!empty($_POST['website'] ?? '')) {
    responder(200, true, 'Recibido.');
}

/* --- 4. Límite por IP ---------------------------------------------------
   Un contador en un archivo temporal. No necesita base de datos y basta para
   evitar que alguien envíe cien mensajes seguidos. */
$ip      = $_SERVER['REMOTE_ADDR'] ?? '0.0.0.0';
$archivo = sys_get_temp_dir() . '/mizarium_' . sha1($ip) . '.txt';
$ahora   = time();

$marcas = is_readable($archivo)
    ? array_filter(
        array_map('intval', explode(',', (string) file_get_contents($archivo))),
        fn ($t) => $t > $ahora - 3600     // solo la última hora
      )
    : [];

if (count($marcas) >= $MAX_POR_HORA) {
    responder(429, false, 'Demasiados envíos. Inténtalo de nuevo en un rato.');
}

/* --- 5. Validación de servidor ------------------------------------------
   Esto es lo que NO da una solución solo-cliente: da igual lo que el
   navegador haya comprobado, cualquiera puede lanzar un POST a mano. La
   validación que cuenta es esta. */
$nombre  = trim((string) ($_POST['name'] ?? ''));
$email   = trim((string) ($_POST['email'] ?? ''));
$tipo    = trim((string) ($_POST['mission_type'] ?? ''));
$meta    = trim((string) ($_POST['goal'] ?? ''));
$mensaje = trim((string) ($_POST['message'] ?? ''));

$TIPOS = ['web', 'gaming', 'apps', 'arvr', 'other'];

if (mb_strlen($nombre) < 2 || mb_strlen($nombre) > 120) {
    responder(422, false, 'Nombre no válido.');
}
if (!filter_var($email, FILTER_VALIDATE_EMAIL) || mb_strlen($email) > 200) {
    responder(422, false, 'Email no válido.');
}
if (mb_strlen($mensaje) < 10 || mb_strlen($mensaje) > 5000) {
    responder(422, false, 'Mensaje no válido.');
}
if (!in_array($tipo, $TIPOS, true)) {
    $tipo = 'other';
}
if (mb_strlen($meta) > 120) {
    $meta = '';
}

/* --- 6. Nada con saltos de línea entra en una cabecera ------------------
   Esta es LA vulnerabilidad clásica de los formularios en PHP: si dejas que
   el usuario meta "\r\n" en un campo que acaba dentro de una cabecera,
   puede añadir sus propias cabeceras y usar tu servidor para enviar spam a
   quien quiera. Se llama inyección de cabeceras y se corta aquí. */
$limpiar = fn (string $s): string => str_replace(["\r", "\n", "\0"], ' ', $s);

$nombreCabecera = $limpiar($nombre);
$emailCabecera  = $limpiar($email);

/* --- 7. El correo -------------------------------------------------------
   htmlspecialchars evita que alguien meta etiquetas en el mensaje que nos
   llega a nosotros. nl2br conserva los saltos de línea que sí escribió. */
$e = fn (string $s): string => htmlspecialchars($s, ENT_QUOTES, 'UTF-8');

$asunto = 'Nuevo proyecto (' . strtoupper($tipo) . ') — ' . $nombreCabecera;
/* Los asuntos con tildes o eñes necesitan codificarse o llegan rotos. */
$asuntoCodificado = '=?UTF-8?B?' . base64_encode($asunto) . '?=';

$cuerpo = '<html><body style="font-family:system-ui,sans-serif;line-height:1.6">'
    . '<h2 style="margin:0 0 16px">Nuevo mensaje desde mizarium.com</h2>'
    . '<p><strong>Nombre:</strong> ' . $e($nombre) . '</p>'
    . '<p><strong>Email:</strong> ' . $e($email) . '</p>'
    . '<p><strong>Quiere:</strong> ' . $e($tipo)
    . ($meta !== '' ? ' — para ' . $e($meta) : '') . '</p>'
    . '<hr style="border:none;border-top:1px solid #ddd;margin:20px 0">'
    . '<p>' . nl2br($e($mensaje)) . '</p>'
    . '</body></html>';

$cabeceras = implode("\r\n", [
    'MIME-Version: 1.0',
    'Content-Type: text/html; charset=UTF-8',
    'From: Mizarium <' . $REMITENTE . '>',
    /* Con esto, al pulsar "Responder" en tu correo contestas directamente a
       quien escribió, no a la dirección no-reply. */
    'Reply-To: ' . $nombreCabecera . ' <' . $emailCabecera . '>',
]);

/* El quinto parámetro fija el remitente del sobre (return-path). Sin él
   algunos servidores marcan el correo como sospechoso. */
$enviado = mail($DESTINO, $asuntoCodificado, $cuerpo, $cabeceras, '-f' . $REMITENTE);

if (!$enviado) {
    error_log('[mizarium] mail() falló para ' . $emailCabecera);
    responder(500, false, 'No se pudo enviar el mensaje.');
}

/* --- 8. Se apunta el envío para el límite por IP ------------------------ */
$marcas[] = $ahora;
@file_put_contents($archivo, implode(',', $marcas), LOCK_EX);

responder(200, true, 'Recibido.');
