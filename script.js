/* =========================================
   Toggle do Menu Mobile
========================================= */
const menuIcon = document.querySelector('#menu-icon');
const navbar = document.querySelector('.navbar');

menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
};

/* =========================================
   Scroll: Sticky Header & Active Link
========================================= */
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('header nav a');
const header = document.querySelector('header');

window.onscroll = () => {
    sections.forEach(sec => {
        const top = window.scrollY;
        const offset = sec.offsetTop - 150;
        const height = sec.offsetHeight;
        const id = sec.getAttribute('id');

        if (top >= offset && top < offset + height) {
            navLinks.forEach(link => link.classList.remove('active'));
            const activeLink = document.querySelector('header nav a[href*=' + id + ']');
            if (activeLink) activeLink.classList.add('active');
        }
    });

    header.classList.toggle('sticky', window.scrollY > 100);

    menuIcon.classList.remove('bx-x');
    navbar.classList.remove('active');
};

/* =========================================
   Efeito de Digitação
========================================= */
const multipleText = document.querySelector('.multiple-text');
const words = ['Estudante de TI', 'Técnico em Manutenção', 'Desenvolvedor Frontend', 'Apaixonado por Tecnologia'];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
    const currentWord = words[wordIndex];

    if (isDeleting) {
        multipleText.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;
    } else {
        multipleText.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;
    }

    let typingSpeed = 100;
    if (isDeleting) typingSpeed /= 2;

    if (!isDeleting && charIndex === currentWord.length) {
        typingSpeed = 2000;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        typingSpeed = 500;
    }

    setTimeout(typeEffect, typingSpeed);
}

setTimeout(typeEffect, 1000);

/* =========================================
   Reveal ao Rolar
========================================= */
function revealElements() {
    const reveals = document.querySelectorAll('.reveal');
    reveals.forEach(el => {
        const elementTop = el.getBoundingClientRect().top;
        if (elementTop < window.innerHeight - 150) {
            el.classList.add('active-reveal');
        }
    });
}

window.addEventListener('scroll', revealElements);
revealElements();

/* =========================================
   Ano no Footer
========================================= */
document.getElementById('ano-atual').textContent = new Date().getFullYear();

/* =========================================
   EmailJS — Formulário de Contato
========================================= */
emailjs.init('mqoPalRluaKEIrEhG');

const form = document.getElementById('contact-form');
const formMsg = document.getElementById('form-msg');
const submitBtn = form.querySelector('button[type="submit"]');

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const nome = document.getElementById('nome').value.trim();
    const email = document.getElementById('email').value.trim();
    const mensagem = document.getElementById('mensagem').value.trim();

    if (!nome || !email || !mensagem) return;

    submitBtn.textContent = 'Enviando...';
    submitBtn.disabled = true;

    emailjs.send('service_hgz6eia', 'template_31k1shu', {
        nome: nome,
        email: email,
        mensagem: mensagem
    })
    .then(() => {
        formMsg.textContent = '✅ Mensagem enviada com sucesso! Entrarei em contato em breve.';
        formMsg.style.background = 'rgba(16, 185, 129, 0.15)';
        formMsg.style.color = '#3fefb0';
        formMsg.style.border = '1px solid #059669';
        formMsg.classList.add('active');
        form.reset();
        setTimeout(() => formMsg.classList.remove('active'), 6000);
    })
    .catch(() => {
        formMsg.textContent = '❌ Erro ao enviar. Tente novamente ou me contate diretamente pelo e-mail.';
        formMsg.style.background = 'rgba(220, 38, 38, 0.15)';
        formMsg.style.color = '#f87171';
        formMsg.style.border = '1px solid #dc2626';
        formMsg.classList.add('active');
        setTimeout(() => formMsg.classList.remove('active'), 6000);
    })
    .finally(() => {
        submitBtn.textContent = 'Enviar Mensagem';
        submitBtn.disabled = false;
    });
});
