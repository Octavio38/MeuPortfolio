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
const words = ['Desenvolvedor Frontend', 'Estudante de TI', 'Apaixonado por Tecnologia'];
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
   Formulário de Contato
========================================= */
const form = document.getElementById('contact-form');
const formMsg = document.getElementById('form-msg');

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const msg = document.getElementById('mensagem').value;

    if (nome.trim() && email.trim() && msg.trim()) {
        formMsg.classList.add('active');
        form.reset();
        setTimeout(() => formMsg.classList.remove('active'), 5000);
    }
});
