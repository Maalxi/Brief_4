const button: HTMLButtonElement | null = document.querySelector('button');
const section1: HTMLButtonElement | null = document.querySelector('.page_accueil');
const section2: HTMLButtonElement | null = document.querySelector('.premiere_page_question');
const section3: HTMLButtonElement | null = document.querySelector('.premiere_page_reponse');
const section4: HTMLButtonElement | null = document.querySelector('.page_de_fin');


if (button !== null && section1 !== null && section3 !== null && section4 !== null) {
  button.addEventListener('click', () => {
    section1.style.display = 'none';
    section3.style.display = 'none';
    section4.style.display = 'none';
  });
}


