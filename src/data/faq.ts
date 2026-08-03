/* Cuatro preguntas, no cinco, y todas son objeciones de compra: precio,
   plazo, propiedad y soporte. Viven junto al formulario para responderlas en
   el momento exacto de la duda, no a media página de distancia. */

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export const FAQS: FaqItem[] = [
  {
    id: 'precio',
    question: '¿Cuánto cuesta?',
    answer:
      'Depende del alcance, pero nunca lo sabrás a mitad del proyecto: el presupuesto se cierra por escrito antes de empezar y no se mueve salvo que tú cambies el alcance.',
  },
  {
    id: 'plazo',
    question: '¿Cuánto tarda?',
    answer:
      'Un sitio corporativo suele estar entre tres y seis semanas. Los proyectos grandes se parten en fases con entregas visibles cada semana, así que nunca esperas meses a ciegas.',
  },
  {
    id: 'propiedad',
    question: '¿De quién es el código?',
    answer:
      'Tuyo. Al entregar recibes el repositorio y los accesos completos. No trabajamos con plataformas que te aten a nosotros para poder tocar tu propia web.',
  },
  {
    id: 'soporte',
    question: '¿Y después de lanzar?',
    answer:
      'Incluimos un periodo de soporte tras el lanzamiento. A partir de ahí puedes contratar horas mensuales o volver cuando lo necesites, sin permanencia.',
  },
];
