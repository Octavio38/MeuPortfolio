/* =========================================
   Toggle do Menu Mobile (Hambúrguer)
========================================= */
const menuIcon = document.querySelector('#menu-icon');
const navbar = document.querySelector('.navbar');

menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x'); // Transforma o ícone em "X"
    navbar.classList.toggle('active');
};

/* =========================================
   Monitoramento de Scroll (Sticky Header & Active Link)
========================================= */
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('header nav a');
const header = document.querySelector('header');

window.onscroll = () => {
    /* Destaca o link no menu baseado na seção visível */
    sections.forEach(sec => {
        const top = window.scrollY;
        const offset = sec.offsetTop - 150;
        const height = sec.offsetHeight;
        const id = sec.getAttribute('id');

        if (top >= offset && top < offset + height) {
            navLinks.forEach(links => {
                links.classList.remove('active');
                document.querySelector('header nav a[href*=' + id + ']').classList.add('active');
            });
        }
    });

    /* Adiciona fundo "glass" ao header ao rolar */
    header.classList.toggle('sticky', window.scrollY > 100);

    /* Remove o menu mobile ao clicar em um link ou rolar a página */
    menuIcon.classList.remove('bx-x');
    navbar.classList.remove('active');
};

/* =========================================
   Efeito de Digitação (Typing Effect Simples)
========================================= */
const multipleText = document.querySelector('.multiple-text');
const words = ['Desenvolvedor em formação', 'Estudante de TI', 'Apaixonado por Tecnologia'];
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

    // Deleta mais rápido
    if (isDeleting) {
        typingSpeed /= 2;
    }

    // Espera antes de deletar
    if (!isDeleting && charIndex === currentWord.length) {
        typingSpeed = 2000;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex++;
        if (wordIndex === words.length) {
            wordIndex = 0;
        }
        typingSpeed = 500;
    }

    setTimeout(typeEffect, typingSpeed);
}

// Inicia o efeito
setTimeout(typeEffect, 1000);

/* =========================================
   Animação Reveal (Aparecer ao Rolar a Página)
========================================= */
function revealElements() {
    const reveals = document.querySelectorAll('.reveal');

    for (let i = 0; i < reveals.length; i++) {
        const windowHeight = window.innerHeight;
        const elementTop = reveals[i].getBoundingClientRect().top;
        const elementVisible = 150;

        if (elementTop < windowHeight - elementVisible) {
            reveals[i].classList.add('active-reveal');
        }
    }
}

window.addEventListener('scroll', revealElements);
// Mostra elementos visíveis no carregamento inicial
revealElements();

/* =========================================
   Animação das Barras de Progresso
========================================= */
function animateBars() {
    const bars = document.querySelectorAll('.habilidade-bar');
    const triggerBottom = window.innerHeight * 0.8;

    bars.forEach(bar => {
        const barTop = bar.getBoundingClientRect().top;
        if (barTop < triggerBottom) {
            // Pega o %. Ex: "90%" do HTML e aplica na largura (width) do span interno
            const progress = bar.getAttribute('data-progress');
            bar.querySelector('.bar-progress').style.width = progress;
        }
    });
}

window.addEventListener('scroll', animateBars);
animateBars();

/* =========================================
   Atualização Automática do Ano no Footer
========================================= */
const anoAtualElement = document.getElementById('ano-atual');
const dataAtual = new Date();
anoAtualElement.textContent = dataAtual.getFullYear();

/* =========================================
   Validação Simples do Formulário
========================================= */
const form = document.getElementById('contact-form');
const formMsg = document.getElementById('form-msg');

form.addEventListener('submit', (e) => {
    e.preventDefault(); // Previne o envio padrão form (recarregar página)

    // Pega os valores (pode usar depois)
    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const msg = document.getElementById('mensagem').value;

    if (nome.trim() !== '' && email.trim() !== '' && msg.trim() !== '') {
        // Exibe mensagem de sucesso visualmente
        formMsg.classList.add('active');

        // Limpa o formulário
        form.reset();

        // Remove a mensagem após 5 segundos
        setTimeout(() => {
            formMsg.classList.remove('active');
        }, 5000);
    }
});
