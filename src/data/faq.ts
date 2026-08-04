/* Tres preguntas, y las tres son objeciones de compra: precio, plazo y
   soporte. Viven junto al formulario para responderlas en el momento exacto
   de la duda, no a media página de distancia.

   Aquí había una cuarta, "¿De quién es el código?". Se retiró por decisión
   del cliente: la propiedad se acuerda proyecto a proyecto, así que darla por
   zanjada en la web comprometía algo que es negociable. */

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
    id: 'soporte',
    question: '¿Y después de lanzar?',
    answer:
      'Incluimos un periodo de soporte tras el lanzamiento. A partir de ahí puedes contratar horas mensuales o volver cuando lo necesites, sin permanencia.',
  },
];
