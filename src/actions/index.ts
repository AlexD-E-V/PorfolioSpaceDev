import { defineAction } from "astro:actions";
import { z } from "astro/zod";
import { Resend } from "resend";

export const server = {
  submitContact: defineAction({
    accept: "form",
    input: z.object({
      name: z.string().min(2),
      email: z.string().email(),
      mission_type: z.enum(["web", "gaming", "apps", "arvr", "other"]),
      message: z.string().min(10),
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
          from: "Space DEV <onboarding@resend.dev>",
          to: contactEmail,
          subject: `Nueva misión: ${data.mission_type.toUpperCase()}`,
          html:`
            <h2>Nueva misión recibida</h2>
            <p><strong>Nombre:</strong> ${data.name}</p>
            <p><strong>Email:</strong> ${data.email}</p>
            <p><strong>Tipo de misión:</strong> ${data.mission_type}</p>
            <p><strong>Mensaje:</strong></p>
            <p>${data.message}</p>
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

