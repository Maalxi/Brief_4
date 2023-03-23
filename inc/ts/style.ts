import datajson from "../json/question_quizz.json";

// Toutes les sections

const section1: HTMLElement | null = document.querySelector(".page_accueil");
const section2: HTMLElement | null = document.querySelector(
  ".premiere_page_question"
);
const section3: HTMLElement | null = document.querySelector(
  ".premiere_page_reponse"
);
const section4: HTMLElement | null = document.querySelector(".page_de_fin");

// Bouton start - Lancement du quiz

const button: HTMLButtonElement | null = document.querySelector(
  ".button_start > button"
);

// Récupération de l'user input

const usernameInput: HTMLInputElement | null =
  document.querySelector("#username");

// Récupération des questions

const reponse_A: Element | null = document.querySelector(".reponse_A");
const reponse_B: Element | null = document.querySelector(".reponse_B");
const reponse_C: Element | null = document.querySelector(".reponse_C");
const reponse_D: Element | null = document.querySelector(".reponse_D");

// Récupération de la réponse juste et des fausses

const valeurReponseA: string | null | undefined =
  reponse_A?.getAttribute("data-reponse");
const valeurReponseB: string | null | undefined =
  reponse_B?.getAttribute("data-reponse");
const valeurReponseC: string | null | undefined =
  reponse_C?.getAttribute("data-reponse");
const valeurReponseD: string | null | undefined =
  reponse_D?.getAttribute("data-reponse");

// Bouton next pour les questions

const button_next: Element | null = document.querySelector("#button_next");
const button_info: Element | null = document.querySelector("#button_info");

// Boutton next pour la section anecdote

const button_next_anecdote = document.querySelector(".button_next_anecdote");

// Bouton Quitter - Retour au début du quizz

const button_fin: HTMLButtonElement | null = document.querySelector(
  ".button_fin > button"
);

// Choix d'une questions

const reponses = [reponse_A, reponse_B, reponse_C, reponse_D];

// Tableau des réponses valides pour chaque question

const reponsesValides = ["D", "B", "A", "B", "B"];

let score = 0;

// Validation du pseudo lors de l'appui sur la touche Entrée
// Validation du pseudo et passage à la section suivante lors du clic sur le bouton Start

usernameInput?.addEventListener("keydown", (event: KeyboardEvent) => {
  if (event.keyCode === 13) {
    event.preventDefault();
    validateUsername();
  }
});

if (
  button !== null &&
  section1 !== null &&
  section2 !== null &&
  section3 !== null &&
  section4 !== null
) {
  // Passer à la section suivante lors du clic sur le bouton Start
  button.addEventListener("click", () => {
    validateUsername();
  });
}

function validateUsername() {
  const username = usernameInput?.value.trim();
  if (username!.length > 0) {
    localStorage.setItem("username", username!);
    if (section1 !== null && section2 !== null) {
      section1.classList.remove("show");
      section1.classList.add("hide");
      section2.classList.remove("hide");
      section2.classList.add("show");
      button_info?.classList.add("hide");
    }
  } else {
    alert("Le pseudo ne peut pas être vide !");
  }
}

// Récupération des questions depuis le JSON

let current_question_index = 0;

// Afficher la première question dès le début

const current_question: string =
  datajson.Question[current_question_index].question;

const A: string = datajson.Question[current_question_index].propositions[0];
const B: string = datajson.Question[current_question_index].propositions[1];
const C: string = datajson.Question[current_question_index].propositions[2];
const D: string = datajson.Question[current_question_index].propositions[3];

const h3_question = document.querySelector(".h3_question");
if (h3_question) {
  h3_question.innerHTML = current_question;
}

const docA = document.querySelector(".A");
if (docA) {
  docA.innerHTML = A;
}

const docB = document.querySelector(".B");
if (docB) {
  docB.innerHTML = B;
}

const docC = document.querySelector(".C");
if (docC) {
  docC.innerHTML = C;
}

const docD = document.querySelector(".D");
if (docD) {
  docD.innerHTML = D;
}

// Ajouter un événement de clic sur le bouton_next
if (button_next) {
  button_next.addEventListener("click", () => {
    // Vérifie si une réponse a été sélectionnée
    const selected_response = document.querySelector(".selected");
    if (!selected_response) {
      alert("Veuillez sélectionner une réponse.");
      return;
    }
    // Continuer l'exécution si une réponse a été sélectionnée
    current_question_index++;

    // Vérifie si la réponse sélectionnée est la réponse valide
    const reponseSelectionnee = selected_response.getAttribute("data-reponse");
    if (reponseSelectionnee === reponsesValides[current_question_index - 1]) {
      score++;
    }

    // Vérifie si toutes les questions ont été répondues
    if (current_question_index === datajson.Question.length) {
      // Cacher la section des questions et afficher la section de fin
      if (section2 && section4) {
        section2.classList.remove("show");
        section2.classList.add("hide");
        section4.classList.remove("hide");
        section4.classList.add("show");
        // Afficher le score total sur la page de fin
        const scoreElement = document.querySelector("#score_user");
        if (scoreElement) {
          scoreElement.textContent = `${score}/${datajson.Question.length}`;
        }
        // Récupération du pseudo

        const username_get = localStorage.getItem("username");

        const pseudo = document.querySelector("#pseudo");

        if (username_get !== null && pseudo !== null) {
          pseudo.innerHTML = username_get;
        }
      }
    } else {
      // Afficher la question suivante
      const previous_question: string =
        datajson.Question[current_question_index - 1].question;
      const current_question: string =
        datajson.Question[current_question_index].question;
      const data_anecdote =
        datajson.Question[current_question_index - 1].anecdote;

      const A = datajson.Question[current_question_index].propositions[0];
      const B = datajson.Question[current_question_index].propositions[1];
      const C = datajson.Question[current_question_index].propositions[2];
      const D = datajson.Question[current_question_index].propositions[3];

      // Réinitialiser les boutons de réponse
      reponses.forEach((reponse) => {
        reponse?.classList.remove("selected");
      });

      const h3_question = document.querySelector(".h3_question");
      if (h3_question) {
        h3_question.innerHTML = current_question;
      }

      const h3_reponse = document.querySelector(".h3_reponse");
      if (h3_reponse) {
        h3_reponse.innerHTML = previous_question;
      }

      const docA = document.querySelector(".A");
      if (docA) {
        docA.innerHTML = A;
      }

      const docB = document.querySelector(".B");
      if (docB) {
        docB.innerHTML = B;
      }

      const docC = document.querySelector(".C");
      if (docC) {
        docC.innerHTML = C;
      }

      const docD = document.querySelector(".D");
      if (docD) {
        docD.innerHTML = D;
      }

      const anecdote = document.querySelector(".anecdote");
      if (anecdote) {
        anecdote.innerHTML = data_anecdote;
      }

      // Réinitialiser la sélection de réponse
      reponses.forEach((reponse) => {
        reponse?.classList.remove("selected");
      });

      // Réapparition du bouton_info
      if (button_info) {
        button_info.classList.remove("hide");
      }
    }
  });
}

// Choix d'une questions

for (const reponse of reponses) {
  reponse?.addEventListener("click", () => {
    // Retire la classe "selected" de toutes les réponses
    for (const autreReponse of reponses) {
      autreReponse?.classList.remove("selected");
    }
    // Ajoute la classe "selected" à la réponse sélectionnée
    reponse?.classList.add("selected");
  });
}

// Boutton info / Anecdote
if (button_info !== null && section2 !== null && section3 !== null) {
  button_info.addEventListener("click", () => {
    section2.classList.remove("show");
    section2.classList.add("hide");
    section3.classList.remove("hide");
    section3.classList.add("show");
  });
}

// Boutton next pour la section anecdote

if (button_next_anecdote !== null && section2 !== null && section3 !== null) {
  button_next_anecdote.addEventListener("click", () => {
    section2.classList.remove("hide");
    section2.classList.add("show");
    section3.classList.remove("show");
    section3.classList.add("hide");
  });
}

// Boutton Quitter
if (button_fin !== null && section1 !== null && section4 !== null) {
  button_fin.addEventListener("click", () => {
    section1.classList.remove("hide");
    section1.classList.add("show");
    section4.classList.remove("show");
    section4.classList.add("hide");
    localStorage.clear();
  });
}
