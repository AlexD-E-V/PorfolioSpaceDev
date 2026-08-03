import { defineAction } from "astro:actions";
import { z } from "astro/zod";
import { Resend } from "resend";

/* Los datos del formulario se interpolaban crudos en el HTML del correo, así
   que cualquiera podía inyectar etiquetas en el mensaje que nos llega. */
const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

export const server = {
  submitContact: defineAction({
    accept: "form",
    input: z.object({
      /* Los `max` evitan que alguien mande megabytes al endpoint. */
      name: z.string().min(2).max(120),
      email: z.string().email().max(200),
      mission_type: z.enum(["web", "gaming", "apps", "arvr", "other"]),
      /* Lo que arma el compositor de la sección de contacto. */
      goal: z.string().max(120).optional(),
      message: z.string().min(10).max(5000),
      website: z.string().optional(),
    }),
    handler: async (data) => {
      if (data.website && data.website.length > 0) {
        return { success: true };
      }

      const apiKey = import.meta.env.RESEND_API_KEY;
      const contactEmail = import.meta.env.CONTACT_EMAIL;

      if (!apiKey || !contactEmail) {
        throw new Error("Variables de entorno no configuradas");
      }

      const resend = new Resend(apiKey);

      try {
        await resend.emails.send({
          from: "Mizarium <onboarding@resend.dev>",
          to: contactEmail,
          replyTo: data.email,
          subject: `Nuevo proyecto: ${data.mission_type.toUpperCase()}`,
          html: `
            <h2>Nuevo mensaje desde mizarium.com</h2>
            <p><strong>Nombre:</strong> ${esc(data.name)}</p>
            <p><strong>Email:</strong> ${esc(data.email)}</p>
            <p><strong>Quiere:</strong> ${esc(data.mission_type)}${
              data.goal ? ` — para ${esc(data.goal)}` : ""
            }</p>
            <p><strong>Mensaje:</strong></p>
            <p>${esc(data.message).replace(/\n/g, "<br>")}</p>
          `,
        });

        return { success: true };
      } catch (error) {
        console.error("Error enviando email:", error);
        throw new Error("No se pudo enviar el email");
      }
    },
  }),
};

