
/* =========================================
   ECHOVERSE - FUNCIONALIDADES
   ========================================= */

"use strict";

// 1. Seleccionar elementos del documento

const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");
const navigationLinks = document.querySelectorAll(".nav-links a");

const newsletterForm = document.querySelector("#newsletter-form");
const emailInput = document.querySelector("#email");
const formMessage = document.querySelector("#form-message");

const currentYear = document.querySelector("#current-year");

// 2. Actualizar el año del pie de página

if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
}

// 3. Abrir y cerrar el menú móvil

function closeMenu() {
    if (!menuToggle || !navLinks) {
        return;
    }

    navLinks.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Abrir menú");
}

if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
        const isOpen = navLinks.classList.toggle("open");

        menuToggle.setAttribute("aria-expanded", String(isOpen));
        menuToggle.setAttribute(
            "aria-label",
            isOpen ? "Cerrar menú" : "Abrir menú"
        );
    });

    // Cerrar el menú al seleccionar una sección

    navigationLinks.forEach((link) => {
        link.addEventListener("click", closeMenu);
    });

    // Cerrar el menú si se pulsa Escape

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
            closeMenu();
            menuToggle.focus();
        }
    });

    // Cerrar el menú si se vuelve a una pantalla grande

    window.addEventListener("resize", () => {
        if (window.innerWidth > 640) {
            closeMenu();
        }
    });
}

// 4. Resaltar el enlace de navegación de la sección visible

const observedSections = document.querySelectorAll(
    "main section[id]"
);

if ("IntersectionObserver" in window) {
    const sectionObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) {
                    return;
                }

                const sectionId = entry.target.id;

                navigationLinks.forEach((link) => {
                    const isActive =
                        link.getAttribute("href") === `#${sectionId}`;

                    if (isActive) {
                        link.classList.add("active");
                        link.setAttribute("aria-current", "location");
                    } else {
                        link.classList.remove("active");
                        link.removeAttribute("aria-current");
                    }
                });
            });
        },
        {
            rootMargin: "-25% 0px -60% 0px"
        }
    );

    observedSections.forEach((section) => {
        sectionObserver.observe(section);
    });
}

// 5. Formulario de suscripción de demostración

if (newsletterForm && emailInput && formMessage) {
    newsletterForm.addEventListener("submit", (event) => {
        event.preventDefault();

        if (!emailInput.checkValidity()) {
            emailInput.reportValidity();
            return;
        }

        formMessage.textContent =
            "¡Gracias! El formulario funciona, pero todavía no hay un servicio de suscripción conectado.";

        formMessage.setAttribute("role", "status");

        newsletterForm.reset();
    });
}
