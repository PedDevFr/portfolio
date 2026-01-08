// Función para mostrar/ocultar modal de carga
function showLoadingModal() {
    const loadingModal = document.getElementById('loading-modal');
    loadingModal.classList.add('show');
    // Bloquear scroll del body
    document.body.style.overflow = 'hidden';
}

function hideLoadingModal() {
    const loadingModal = document.getElementById('loading-modal');
    loadingModal.classList.remove('show');
    // Restaurar scroll del body
    document.body.style.overflow = '';
}

// Función para mostrar modal personalizado
function showModal(type, title, message) {
    // Asegurar que el modal de carga esté cerrado
    hideLoadingModal();
    
    const modal = document.getElementById('custom-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalMessage = document.getElementById('modal-message');
    const modalIcon = document.getElementById('modal-icon-svg');
    const iconContainer = modalIcon.parentElement;
    
    // Limpiar clase anterior
    iconContainer.className = 'modal-icon';
    
    // Configurar contenido
    modalTitle.textContent = title;
    modalMessage.textContent = message;
    
    // Configurar icono según el tipo
    if (type === 'success') {
        iconContainer.classList.add('success');
        modalIcon.innerHTML = `
            <circle cx="12" cy="12" r="10" fill="#10B981"/>
            <path d="M9 12l2 2 4-4" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        `;
    } else if (type === 'error') {
        iconContainer.classList.add('error');
        modalIcon.innerHTML = `
            <circle cx="12" cy="12" r="10" fill="#EF4444"/>
            <line x1="8" y1="8" x2="16" y2="16" stroke="white" stroke-width="2.5" stroke-linecap="round"/>
            <line x1="16" y1="8" x2="8" y2="16" stroke="white" stroke-width="2.5" stroke-linecap="round"/>
        `;
    }
    
    // Mostrar modal
    modal.classList.add('show');
    
    // Cerrar modal al hacer clic en el botón
    const closeBtn = document.getElementById('modal-close');
    closeBtn.onclick = function() {
        modal.classList.remove('show');
        // Restaurar scroll del body cuando se cierra
        document.body.style.overflow = '';
    };
    
    // Cerrar modal al hacer clic fuera del contenido
    modal.onclick = function(e) {
        if (e.target === modal) {
            modal.classList.remove('show');
            // Restaurar scroll del body cuando se cierra
            document.body.style.overflow = '';
        }
    };
    
    // Cerrar modal con la tecla Escape
    const escapeHandler = function(e) {
        if (e.key === 'Escape') {
            modal.classList.remove('show');
            // Restaurar scroll del body cuando se cierra
            document.body.style.overflow = '';
            document.removeEventListener('keydown', escapeHandler);
        }
    };
    document.addEventListener('keydown', escapeHandler);
}

// Inicializar EmailJS
// Reemplaza 'YOUR_PUBLIC_KEY' con tu Public Key de EmailJS
const EMAILJS_PUBLIC_KEY = '3GBIupBbgiWpSlV8P';
const EMAILJS_SERVICE_ID = 'service_5qsbvt2';
const EMAILJS_TEMPLATE_ID = 'template_a3dfxmh';

// Tooltip de WhatsApp
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar EmailJS
    if (typeof emailjs !== 'undefined') {
        emailjs.init(EMAILJS_PUBLIC_KEY);
    }
    
    const tooltip = document.querySelector('.whatsapp-tooltip');
    
    if (tooltip) {
        // Mostrar tooltip automáticamente
        setTimeout(function() {
            tooltip.classList.add('show');
        }, 1000);
        
        // Ocultar tooltip después de 5 segundos
        setTimeout(function() {
            tooltip.classList.remove('show');
        }, 6000);
    }
    
    // Manejar envío del formulario
    const contactForm = document.getElementById('contact-form');
    const submitButton = contactForm ? contactForm.querySelector('.form-submit') : null;
    
    if (contactForm && submitButton) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            // Validar que EmailJS esté configurado
            if (EMAILJS_PUBLIC_KEY === 'YOUR_PUBLIC_KEY' || EMAILJS_TEMPLATE_ID === 'YOUR_TEMPLATE_ID' || !EMAILJS_SERVICE_ID) {
                showModal('error', 'Error de configuración', 'El servicio de correo no está configurado correctamente. Por favor, configura el TEMPLATE_ID en script.js');
                return;
            }
            
            // Bloquear el botón
            submitButton.disabled = true;
            submitButton.style.opacity = '0.6';
            submitButton.style.cursor = 'not-allowed';
            
            // Mostrar modal de carga
            showLoadingModal();
            
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            
            // HTML personalizado del correo (mismo que tenías en el servidor)
            const emailHtml = `
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
            <p style="background: #f5f5f5; padding: 15px; border-radius: 5px; margin-top: 10px; white-space: pre-wrap;">${message.replace(/\n/g, '<br>')}</p>
        </div>
        
        <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0; text-align: center;">
            <a href="mailto:${email}" style="background: #667eea; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; display: inline-block; font-weight: bold;">Responder correo</a>
        </div>
    </div>
</body>
</html>
            `;
            
            const formData = {
                from_name: name,
                from_email: email,
                message: message,
                to_email: 'peinfantepoma@outlook.com',
                html_content: emailHtml // Enviamos el HTML completo
            };
            
            try {
                // Enviar correo con EmailJS
                const response = await emailjs.send(
                    EMAILJS_SERVICE_ID,
                    EMAILJS_TEMPLATE_ID,
                    formData
                );
                
                // Ocultar modal de carga
                hideLoadingModal();
                
                // Pequeño delay para transición suave
                setTimeout(() => {
                    if (response.status === 200) {
                        showModal('success', '¡Mensaje enviado!', 'Tu mensaje ha sido enviado correctamente. Te responderé pronto.');
                        contactForm.reset();
                    } else {
                        showModal('error', 'Error al enviar', 'No se pudo enviar el mensaje. Por favor, inténtalo de nuevo.');
                    }
                }, 300);
                
            } catch (error) {
                // Ocultar modal de carga
                hideLoadingModal();
                
                // Pequeño delay para transición suave
                setTimeout(() => {
                    console.error('Error EmailJS:', error);
                    showModal('error', 'Error al enviar', 'Hubo un problema al enviar el mensaje. Por favor, verifica tu conexión e inténtalo de nuevo.');
                }, 300);
            } finally {
                // Restaurar el botón
                submitButton.disabled = false;
                submitButton.style.opacity = '1';
                submitButton.style.cursor = 'pointer';
            }
        });
    }
});

