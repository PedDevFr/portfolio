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
const EMAILJS_TEMPLATE_ID_NOTIFICATION = 'template_a3dfxmh';
const EMAILJS_TEMPLATE_ID_CONFIRMATION = 'template_ceudljj';


// Tooltip de WhatsApp
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar EmailJS
    if (typeof emailjs !== 'undefined') {
        emailjs.init(EMAILJS_PUBLIC_KEY);
    }
    
    // Menú hamburguesa
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navOverlay = document.querySelector('.nav-overlay');
    const body = document.body;
    
    if (hamburger && navMenu) {
        function toggleMenu() {
            const isActive = navMenu.classList.contains('active');
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
            if (navOverlay) {
                navOverlay.classList.toggle('active');
            }
            body.style.overflow = !isActive ? 'hidden' : '';
        }
        
        function closeMenu() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            if (navOverlay) {
                navOverlay.classList.remove('active');
            }
            body.style.overflow = '';
        }
        
        hamburger.addEventListener('click', function(e) {
            e.stopPropagation();
            toggleMenu();
        });
        
        // Cerrar menú al hacer clic en el overlay
        if (navOverlay) {
            navOverlay.addEventListener('click', closeMenu);
        }
        
        // Cerrar menú al hacer clic en un enlace
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', closeMenu);
        });
        
        // Cerrar menú con ESC
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && navMenu.classList.contains('active')) {
                closeMenu();
            }
        });
    }
    
    // Configurar scroll suave para los enlaces del menú (solo para enlaces de anclas)
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            // Solo prevenir default si es un ancla (#)
            if (href && href.startsWith('#')) {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    const navHeight = document.querySelector('.nav').offsetHeight;
                    const targetPosition = targetElement.offsetTop - navHeight - 20;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
            // Si no es un ancla (es un enlace de descarga), dejar que el navegador maneje el clic normalmente
        });
    });
    
    // Asegurar que el botón de descarga CV funcione correctamente
    const downloadCvDesktop = document.getElementById('download-cv-desktop');
    if (downloadCvDesktop) {
        downloadCvDesktop.addEventListener('click', function(e) {
            // No prevenir el comportamiento por defecto para permitir la descarga
            const href = this.getAttribute('href');
            if (href) {
                // Forzar la descarga si el navegador no la maneja automáticamente
                const link = document.createElement('a');
                link.href = href;
                link.download = this.getAttribute('download') || 'CV_Pedro_Infante.pdf';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            }
        });
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
            if (EMAILJS_PUBLIC_KEY === 'YOUR_PUBLIC_KEY' || 
                !EMAILJS_TEMPLATE_ID_CONFIRMATION || 
                !EMAILJS_TEMPLATE_ID_NOTIFICATION || 
                !EMAILJS_SERVICE_ID) {
                showModal('error', 'Error de configuración', 'El servicio de correo no está configurado correctamente. Por favor, verifica las constantes en script.js');
                return;
            }
            
            // Bloquear el botón
            submitButton.disabled = true;
            submitButton.style.opacity = '0.6';
            submitButton.style.cursor = 'not-allowed';
            
            // Mostrar modal de carga
            showLoadingModal();
            
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();
            
            // Validar formato de email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                hideLoadingModal();
                setTimeout(() => {
                    showModal('error', 'Email inválido', 'Por favor, ingresa un correo electrónico válido (ejemplo: nombre@dominio.com)');
                }, 300);
                submitButton.disabled = false;
                submitButton.style.opacity = '1';
                submitButton.style.cursor = 'pointer';
                return;
            }
            
            try {
                // Enviar correo de confirmación al usuario
                const confirmationData = {
                    from_name: name,
                    from_email: email,
                    message: message,
                    to_email: email // Al usuario que completó el formulario
                };
                
                // Enviar correo de confirmación al usuario
                const confirmationResponse = await emailjs.send(
                    EMAILJS_SERVICE_ID,
                    EMAILJS_TEMPLATE_ID_CONFIRMATION,
                    confirmationData
                );
                
                // Enviar correo de notificación a ti
                const notificationData = {
                    from_name: name,
                    from_email: email,
                    message: message,
                    to_email: 'peinfantepoma@outlook.com' // A tu email
                };
                
                const notificationResponse = await emailjs.send(
                    EMAILJS_SERVICE_ID,
                    EMAILJS_TEMPLATE_ID_NOTIFICATION,
                    notificationData
                );
                
                // Ocultar modal de carga
                hideLoadingModal();
                
                // Pequeño delay para transición suave
                setTimeout(() => {
                    if (confirmationResponse.status === 200 && notificationResponse.status === 200) {
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

