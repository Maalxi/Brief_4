// Bouton start - Lancement du quiz

const button: HTMLButtonElement | null = document.querySelector('button');
const section1: HTMLElement | null = document.querySelector('.page_accueil');
const section2: HTMLElement | null = document.querySelector('.premiere_page_question');
const section3: HTMLElement | null = document.querySelector('.premiere_page_reponse');
const section4: HTMLElement | null = document.querySelector('.page_de_fin');


// Afficher la section1 et cacher les autres sections

if (section1) {
  section1.style.display = 'block';
}

if (section2) {
  section2.style.display = 'none';
}

if (section3) {
  section3.style.display = 'none';
}

if (section4) {
  section4.style.display = 'none';
}



if (button !== null && section1 !== null && section2 !== null && section3 !== null && section4 !== null) {
  button.addEventListener('click', () => {
    section:nth-child(1) {
      /* styles pour afficher la setion */
          section1.style.display = 'block';
    }
  });
}