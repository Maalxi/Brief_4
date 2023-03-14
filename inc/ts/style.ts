const button: HTMLButtonElement | null = document.querySelector('button');
const section1: HTMLButtonElement | null = document.querySelector('.page_accueil');

button.addEventListener('click', () => {
  section1.style.display = 'none';
});
