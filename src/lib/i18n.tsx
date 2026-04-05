"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export type Lang = "en" | "es";

/* ─────────────────────────────────────────────────────────── */
/*  FULL TRANSLATION DICTIONARY                                */
/* ─────────────────────────────────────────────────────────── */
export const t: Record<string, Record<Lang, string>> = {
    /* — Nav — */
    "nav.courses": { en: "Courses", es: "Cursos" },
    "nav.blog": { en: "Blog", es: "Blog" },
    "nav.contact": { en: "Contact", es: "Contacto" },
    "nav.signin": { en: "Sign In", es: "Iniciar sesión" },
    "nav.getstarted": { en: "Get Started", es: "Comenzar" },
    "lang.switch": { en: "ES", es: "EN" },
    "lang.mobile": { en: "Switch to Spanish (ES)", es: "Cambiar a inglés (EN)" },

    /* — Landing Hero — */
    "hero.badge": { en: "Free 30-minute trial — no credit card required", es: "Prueba gratuita de 30 minutos — sin tarjeta de crédito" },
    "hero.h1": { en: "Speak English & Spanish\nwith Real Confidence", es: "Habla inglés y español\ncon verdadera confianza" },
    "hero.sub": { en: "Live 1:1 and group classes with expert tutors. Real conversation practice that gets you fluent — far faster than any app.", es: "Clases en vivo 1:1 y grupales con tutores expertos. Practica conversación real y alcanza la fluidez mucho más rápido que con cualquier app." },
    "hero.cta1": { en: "Book Free Trial", es: "Reservar prueba gratis" },
    "hero.cta2": { en: "Explore Courses", es: "Ver cursos" },
    "hero.trust1": { en: "Free 30-min trial", es: "Prueba gratis 30 min" },
    "hero.trust2": { en: "No commitment", es: "Sin compromiso" },
    "hero.trust3": { en: "All timezones", es: "Todos los husos" },
    "hero.trust4": { en: "4.9★ average rating", es: "4.9★ valoración media" },
    "hero.feat1": { en: "Live Zoom Classes", es: "Clases en vivo por Zoom" },
    "hero.feat1n": { en: "Real interaction, not recorded", es: "Interacción real, sin grabación" },
    "hero.feat2": { en: "Flexible Schedule", es: "Horario flexible" },
    "hero.feat2n": { en: "Any timezone, any day", es: "Cualquier huso, cualquier día" },
    "hero.feat3": { en: "1:1 or Group", es: "Individual o grupal" },
    "hero.feat3n": { en: "Your choice of format", es: "Tú eliges el formato" },
    "hero.feat4": { en: "100% Satisfaction", es: "100% satisfacción" },
    "hero.feat4n": { en: "Free reschedule anytime", es: "Reprogramación gratuita siempre" },

    /* — Stats — */
    "stats.students": { en: "Students Taught", es: "Estudiantes" },
    "stats.classes": { en: "Classes Delivered", es: "Clases impartidas" },
    "stats.countries": { en: "Countries Reached", es: "Países" },
    "stats.rating": { en: "Average Rating", es: "Valoración media" },

    /* — Steps — */
    "steps.badge": { en: "Simple Process", es: "Proceso simple" },
    "steps.title": { en: "Start Speaking in 3 Steps", es: "Empieza a hablar en 3 pasos" },
    "steps.sub": { en: "From sign-up to your first class in minutes. Zero complicated setup.", es: "Desde el registro hasta tu primera clase en minutos. Sin configuración complicada." },
    "steps.s1t": { en: "Choose a Course", es: "Elige un curso" },
    "steps.s1d": { en: "Browse English and Spanish classes for every level — A1 to C2.", es: "Explora clases de inglés y español para todos los niveles — de A1 a C2." },
    "steps.s2t": { en: "Book a Time Slot", es: "Reserva un horario" },
    "steps.s2d": { en: "Pick any slot in your local timezone. We're available Mon–Sat.", es: "Elige cualquier franja en tu zona horaria. Estamos disponibles de lunes a sábado." },
    "steps.s3t": { en: "Join & Speak", es: "Únete y habla" },
    "steps.s3d": { en: "Connect via Zoom and start speaking English or Spanish today.", es: "Conéctate por Zoom y empieza a hablar inglés o español hoy mismo." },

    /* — Featured Courses — */
    "courses.badge": { en: "Featured Courses", es: "Cursos destacados" },
    "courses.title": { en: "Classes for Every Level", es: "Clases para cada nivel" },
    "courses.sub": { en: "Beginner to advanced — English and Spanish.", es: "De principiante a avanzado — inglés y español." },
    "courses.viewall": { en: "View All", es: "Ver todos" },

    /* — Why Us — */
    "why.badge": { en: "Why LinguaConnect", es: "Por qué LinguaConnect" },
    "why.title": { en: "Learning That Actually Works", es: "Aprendizaje que realmente funciona" },
    "why.sub": { en: "Unlike apps that rely on gamification, we use proven conversation-first techniques with real human tutors — so you speak with confidence from day one.", es: "A diferencia de las apps que dependen de la gamificación, usamos técnicas conversacionales probadas con tutores humanos reales — para que hables con confianza desde el primer día." },
    "why.cta": { en: "Start for Free", es: "Empieza gratis" },
    "why.f1t": { en: "Live Classes", es: "Clases en vivo" },
    "why.f1d": { en: "Real-time sessions with your tutor via Zoom.", es: "Sesiones en tiempo real con tu tutor por Zoom." },
    "why.f2t": { en: "Progress Tracking", es: "Seguimiento del progreso" },
    "why.f2d": { en: "Structured curriculum and visible skill growth.", es: "Plan de estudios estructurado y mejora visible." },
    "why.f3t": { en: "Guaranteed Quality", es: "Calidad garantizada" },
    "why.f3d": { en: "Free reschedule, no contracts, cancel anytime.", es: "Reprogramación gratuita, sin contratos, cancela cuando quieras." },
    "why.f4t": { en: "Any Timezone", es: "Cualquier huso" },
    "why.f4d": { en: "Tutors available Mon–Sat from 8 AM to 9 PM in any TZ.", es: "Tutores disponibles de lun–sáb de 8 a 21 h en cualquier huso." },

    /* — Testimonials — */
    "test.badge": { en: "Student Stories", es: "Historias de estudiantes" },
    "test.title": { en: "Real Results from Real Students", es: "Resultados reales de estudiantes reales" },
    "test.sub": { en: "500+ students in 12 countries have improved with LinguaConnect.", es: "Más de 500 estudiantes en 12 países han mejorado con LinguaConnect." },

    /* — Blog — */
    "blog.badge": { en: "From the Blog", es: "Del blog" },
    "blog.title": { en: "Language Learning Tips", es: "Consejos de aprendizaje" },
    "blog.viewall": { en: "Read All", es: "Ver todo" },
    "blog.read": { en: "min read", es: "min lectura" },

    /* — FAQ — */
    "faq.badge": { en: "FAQ", es: "Preguntas frecuentes" },
    "faq.title": { en: "Questions? We've Got Answers", es: "¿Preguntas? Las tenemos respondidas" },
    "faq.sub": { en: "Everything you need to know before booking your first class.", es: "Todo lo que necesitas saber antes de reservar tu primera clase." },
    "faq.ask": { en: "Ask a Question", es: "Hacer una pregunta" },

    /* — CTA Banner — */
    "cta.badge": { en: "Limited spots available each week", es: "Plazas limitadas cada semana" },
    "cta.title": { en: "Ready to Start Speaking?", es: "¿Listo para empezar a hablar?" },
    "cta.sub": { en: "Join 500+ students who've transformed their language skills. Your free trial is one click away.", es: "Únete a más de 500 estudiantes que han transformado su nivel de idiomas. Tu prueba gratuita está a un clic." },
    "cta.main": { en: "Book Free Trial Now", es: "Reserva tu prueba gratis" },
    "cta.browse": { en: "Browse Courses", es: "Ver cursos" },
    "cta.note": { en: "No credit card required · Cancel anytime", es: "Sin tarjeta de crédito · Cancela cuando quieras" },

    /* — Course card — */
    "card.session": { en: "session", es: "sesión" },
    "card.min": { en: "min", es: "min" },
    "card.students": { en: "students", es: "alumnos" },
    "card.view": { en: "View course", es: "Ver curso" },

    /* — Sign In — */
    "signin.title": { en: "Welcome back", es: "Bienvenido de nuevo" },
    "signin.sub": { en: "Sign in to continue your language journey.", es: "Inicia sesión para continuar tu viaje lingüístico." },
    "signin.google": { en: "Continue with Google", es: "Continuar con Google" },
    "signin.orEmail": { en: "or sign in with email", es: "o inicia sesión con e-mail" },
    "signin.email": { en: "Email Address", es: "Correo electrónico" },
    "signin.password": { en: "Password", es: "Contraseña" },
    "signin.forgot": { en: "Forgot password?", es: "¿Olvidaste la contraseña?" },
    "signin.btn": { en: "Sign In", es: "Iniciar sesión" },
    "signin.loading": { en: "Signing in…", es: "Iniciando sesión…" },
    "signin.noAccount": { en: "Don't have an account?", es: "¿No tienes cuenta?" },
    "signin.signupFree": { en: "Sign Up Free", es: "Regístrate gratis" },
    "signin.trialNote": { en: "New here? Your first 30-minute class is completely free — no credit card needed.", es: "¿Eres nuevo? Tu primera clase de 30 minutos es completamente gratis — sin tarjeta de crédito." },
    "signin.brand.trust": { en: "TRUSTED BY 500+ STUDENTS", es: "CON LA CONFIANZA DE MÁS DE 500 ESTUDIANTES" },
    "signin.brand.title": { en: "Start speaking a new language with confidence", es: "Empieza a hablar un nuevo idioma con confianza" },
    "signin.brand.sub": { en: "Live classes. Real tutors. Proven results.", es: "Clases en vivo. Tutores reales. Resultados probados." },

    /* — Sign Up — */
    "signup.title": { en: "Create your account", es: "Crea tu cuenta" },
    "signup.sub": { en: "Free trial included — no credit card required.", es: "Prueba gratuita incluida — sin tarjeta de crédito." },
    "signup.google": { en: "Sign up with Google", es: "Registrarse con Google" },
    "signup.orEmail": { en: "or with email", es: "o con e-mail" },
    "signup.name": { en: "Full Name", es: "Nombre completo" },
    "signup.email": { en: "Email Address", es: "Correo electrónico" },
    "signup.password": { en: "Password", es: "Contraseña" },
    "signup.btn": { en: "Create Free Account", es: "Crear cuenta gratis" },
    "signup.loading": { en: "Creating account…", es: "Creando cuenta…" },
    "signup.terms1": { en: "By signing up you agree to our", es: "Al registrarte aceptas nuestros" },
    "signup.termsLink": { en: "Terms", es: "Términos" },
    "signup.and": { en: "and", es: "y" },
    "signup.privLink": { en: "Privacy Policy", es: "Política de privacidad" },
    "signup.already": { en: "Already have an account?", es: "¿Ya tienes cuenta?" },
    "signup.signinLink": { en: "Sign In", es: "Iniciar sesión" },
    "signup.trialNote": { en: "Your first 30-minute class is free. No credit card. No strings attached.", es: "Tu primera clase de 30 minutos es gratis. Sin tarjeta. Sin compromisos." },
    "signup.brand.badge": { en: "JOIN 500+ STUDENTS WORLDWIDE", es: "ÚNETE A MÁS DE 500 ESTUDIANTES" },
    "signup.brand.title": { en: "Your language journey starts here", es: "Tu viaje lingüístico empieza aquí" },
    "signup.brand.sub": { en: "Real tutors. Live sessions. Practical conversation skills you'll use from day one.", es: "Tutores reales. Sesiones en vivo. Habilidades conversacionales prácticas desde el primer día." },
    "signup.step1": { en: "Create your free account in 30 seconds", es: "Crea tu cuenta gratis en 30 segundos" },
    "signup.step2": { en: "Choose your language and level", es: "Elige tu idioma y nivel" },
    "signup.step3": { en: "Book your free 30-minute trial class", es: "Reserva tu clase de prueba gratuita de 30 minutos" },
    "signup.step4": { en: "Start speaking with confidence", es: "Empieza a hablar con confianza" },

    /* — Contact — */
    "contact.hero.badge": { en: "WE'D LOVE TO HEAR FROM YOU", es: "NOS ENCANTARÍA SABER DE TI" },
    "contact.hero.title": { en: "Get in Touch", es: "Contáctanos" },
    "contact.hero.sub": { en: "Have a question about our courses, pricing, or schedules? We're here and we respond fast.", es: "¿Tienes preguntas sobre nuestros cursos, precios u horarios? Estamos aquí y respondemos rápido." },
    "contact.email.t": { en: "Email Us", es: "Escríbenos" },
    "contact.email.s": { en: "Reply within 2 hours", es: "Respuesta en 2 horas" },
    "contact.phone.t": { en: "WhatsApp", es: "WhatsApp" },
    "contact.phone.s": { en: "Mon–Sat 8AM–8PM EST", es: "Lun–Sáb 8–20 h EST" },
    "contact.hours.t": { en: "Office Hours", es: "Horario de atención" },
    "contact.hours.b": { en: "Mon–Sat, 8AM–9PM", es: "Lun–Sáb, 8–21 h" },
    "contact.hours.s": { en: "All major timezones", es: "Todos los husos" },
    "contact.online.t": { en: "We're online", es: "Estamos en línea" },
    "contact.online.b": { en: "Serving 12 countries", es: "Servicio en 12 países" },
    "contact.online.s": { en: "No physical office needed", es: "Sin oficina física" },
    "contact.form.title": { en: "Send Us a Message", es: "Envíanos un mensaje" },
    "contact.form.sub": { en: "We reply within 2 hours on weekdays.", es: "Respondemos en 2 horas en días hábiles." },
    "contact.form.name": { en: "Full Name *", es: "Nombre completo *" },
    "contact.form.email": { en: "Email Address *", es: "Correo electrónico *" },
    "contact.form.subj": { en: "Subject *", es: "Asunto *" },
    "contact.form.msg": { en: "Message *", es: "Mensaje *" },
    "contact.form.send": { en: "Send Message", es: "Enviar mensaje" },
    "contact.form.loading": { en: "Sending…", es: "Enviando…" },
    "contact.form.sent.t": { en: "Message sent! 🎉", es: "¡Mensaje enviado! 🎉" },
    "contact.form.sent.s": { en: "We'll get back to you within 2 hours.", es: "Te responderemos en 2 horas." },
    "contact.sidebar.t": { en: "Just want to try a class?", es: "¿Solo quieres probar una clase?" },
    "contact.sidebar.s": { en: "Skip the form. Book your free 30-minute trial directly — no credit card, no commitment.", es: "Omite el formulario. Reserva tu prueba gratuita directamente — sin tarjeta, sin compromisos." },
    "contact.sidebar.btn": { en: "Book Free Trial", es: "Reservar prueba gratis" },
    "contact.faq.t": { en: "Common Questions", es: "Preguntas frecuentes" },
};

/* ─────────────────────────────────────────────────────────── */
/*  CONTEXT                                                     */
/* ─────────────────────────────────────────────────────────── */
type LangCtx = { lang: Lang; toggle: () => void; tr: (key: string) => string };
const LangContext = createContext<LangCtx>({ lang: "en", toggle: () => { }, tr: (k) => k });

export function LangProvider({ children }: { children: ReactNode }) {
    const [lang, setLang] = useState<Lang>("en");

    useEffect(() => {
        const cookie = document.cookie.split(";").find(c => c.trim().startsWith("locale="));
        if (cookie) {
            const v = cookie.split("=")[1]?.trim() as Lang;
            if (v === "es" || v === "en") setLang(v);
        }
    }, []);

    const toggle = () => {
        const next: Lang = lang === "en" ? "es" : "en";
        setLang(next);
        document.cookie = `locale=${next}; path=/; max-age=31536000`;
    };

    const tr = (key: string): string => t[key]?.[lang] ?? key;

    return <LangContext.Provider value={{ lang, toggle, tr }}>{children}</LangContext.Provider>;
}

export function useLang() { return useContext(LangContext); }
