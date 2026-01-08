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

// Tooltip de WhatsApp
document.addEventListener('DOMContentLoaded', function() {
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
            
            // Bloquear el botón
            submitButton.disabled = true;
            submitButton.style.opacity = '0.6';
            submitButton.style.cursor = 'not-allowed';
            
            // Mostrar modal de carga
            showLoadingModal();
            
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                message: document.getElementById('message').value
            };
            
            try {
                const response = await fetch('https://portfolio-production-7e00.up.railway.app/send-email', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(formData)
                });
                
                const data = await response.json();
                
                // Ocultar modal de carga
                hideLoadingModal();
                
                // Pequeño delay para transición suave
                setTimeout(() => {
                    if (data.success) {
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
                    showModal('error', 'Error de conexión', 'Hubo un problema al conectar con el servidor. Por favor, verifica tu conexión e inténtalo de nuevo.');
                }, 300);
                
                console.error('Error:', error);
            } finally {
                // Restaurar el botón
                submitButton.disabled = false;
                submitButton.style.opacity = '1';
                submitButton.style.cursor = 'pointer';
            }
        });
    }
});

