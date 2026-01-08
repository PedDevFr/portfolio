const express = require("express");
const cors = require("cors");
const { Resend } = require("resend");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static("."));

// Inicializar Resend
const resend = new Resend(process.env.RESEND_API_KEY);

app.post("/send-email", async (req, res) => {
  const { name, email, message } = req.body;

  // Validar que exista la API key
  if (!process.env.RESEND_API_KEY) {
    console.error("Error: RESEND_API_KEY no está configurada");
    return res.status(500).json({
      success: false,
      message: "Error de configuración del servidor",
    });
  }

  // Validar que exista el email de remitente
  // En Resend, el 'from' debe ser un dominio verificado o usar 'onboarding@resend.dev' para pruebas
  const fromEmail = process.env.EMAIL_USER;

  // HTML del correo de confirmación (mantenido sin cambios)
  const confirmationEmailHtml = `
        <!DOCTYPE html>
        <html>
            <head>
                <meta charset="UTF-8">
            </head>
            <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
                <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
                    <h1 style="color: white; margin: 0; font-size: 28px;">¡Hola ${name}!</h1>
                </div>
                
                <div style="background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px;">
                    <p style="font-size: 16px; margin-bottom: 20px;">
                        Gracias por contactarme a través de mi portafolio. He recibido tu mensaje y me pondré en contacto contigo lo antes posible.
                    </p>
                    
                    <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #667eea;">
                        <h3 style="color: #667eea; margin-top: 0;">Resumen de tu mensaje:</h3>
                        <p style="margin: 5px 0;"><strong>Nombre:</strong> ${name}</p>
                        <p style="margin: 5px 0;"><strong>Email:</strong> ${email}</p>
                        <p style="margin: 5px 0;"><strong>Mensaje:</strong></p>
                        <p style="background: #f5f5f5; padding: 15px; border-radius: 5px; margin-top: 10px; white-space: pre-wrap;">${message}</p>
                    </div>
                    
                    <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0;">
                        <h3 style="color: #667eea; margin-top: 0;">¿Cómo contactarme?</h3>
                        <p style="margin: 10px 0;">
                            <strong>📧 Email:</strong> 
                            <a href="mailto:peinfantepoma@outlook.com" style="color: #667eea; text-decoration: none;">peinfantepoma@outlook.com</a>
                        </p>
                        <p style="margin: 10px 0;">
                            <strong>📱 WhatsApp:</strong> 
                            <a href="https://wa.me/51942221250" style="color: #667eea; text-decoration: none;">Contáctame por WhatsApp</a>
                        </p>
                    </div>
                    
                    <p style="font-size: 14px; color: #666; margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd;">
                        Este es un correo automático de confirmación. Si tienes alguna pregunta adicional, no dudes en responder este correo o contactarme directamente.
                    </p>
                    
                    <p style="font-size: 14px; color: #666; margin-top: 10px;">
                        Saludos cordiales,<br>
                        <strong style="color: #667eea;">Pedro Infante</strong><br>
                        <em>Desarrollador Frontend</em>
                    </p>
                </div>
            </body>
        </html>
    `;

  // HTML del correo de notificación (mantenido sin cambios)
  const notificationEmailHtml = `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8">
        </head>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
                <h1 style="color: white; margin: 0; font-size: 28px;">Nuevo mensaje recibido</h1>
            </div>
            
            <div style="background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px;">
                <p style="font-size: 16px; margin-bottom: 20px;">
                    Has recibido un nuevo mensaje a través de tu portafolio.
                </p>
                
                <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #667eea;">
                    <h3 style="color: #667eea; margin-top: 0;">Información del contacto:</h3>
                    <p style="margin: 5px 0;"><strong>Nombre:</strong> ${name}</p>
                    <p style="margin: 5px 0;"><strong>Email:</strong> <a href="mailto:${email}" style="color: #667eea; text-decoration: none;">${email}</a></p>
                    <p style="margin: 5px 0;"><strong>Mensaje:</strong></p>
                    <p style="background: #f5f5f5; padding: 15px; border-radius: 5px; margin-top: 10px; white-space: pre-wrap;">${message}</p>
                </div>
                
                <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0; text-align: center;">
                    <a href="mailto:${email}" style="background: #667eea; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; display: inline-block; font-weight: bold;">Responder correo</a>
                </div>
            </div>
        </body>
        </html>
    `;

  try {
    // Enviar correo de confirmación al usuario
    const confirmationResult = await resend.emails.send({
      from: fromEmail,
      to: email,
      subject: `Gracias por contactarme - ${name}`,
      html: confirmationEmailHtml,
    });

    if (confirmationResult.error) {
      throw new Error(confirmationResult.error.message);
    }

    // Enviar correo de notificación
    const notificationResult = await resend.emails.send({
      from: fromEmail,
      to: "peinfantepoma@outlook.com",
      subject: `Nuevo contacto desde portafolio - ${name}`,
      html: notificationEmailHtml,
      replyTo: email, // Para que las respuestas vayan al usuario original
    });

    if (notificationResult.error) {
      throw new Error(notificationResult.error.message);
    }

    res.json({ success: true, message: "Correo enviado correctamente" });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({
      success: false,
      message: "Error al enviar correo",
      error: error.message,
    });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
