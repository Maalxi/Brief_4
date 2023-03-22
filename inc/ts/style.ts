import datajson from "../json/question_quizz.json"

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

// Récupération du pseudo

const usernameInput = document.getElementById("username") as HTMLInputElement;

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

// Choix d'une questions

const reponses = [reponse_A, reponse_B, reponse_C, reponse_D];

// Tableau des réponses valides pour chaque question

const reponsesValides = ["B", "C", "A", "D"];

// Validation du pseudo lors de l'appui sur la touche Entrée
// Validation du pseudo et passage à la section suivante lors du clic sur le bouton Start

usernameInput.addEventListener("keydown", (event: KeyboardEvent) => {
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
  const username = usernameInput.value.trim();
  if (username.length > 0) {
    localStorage.setItem("username", username);
    if (section1 !== null && section2 !== null) {
      section1.classList.remove("show");
      section1.classList.add("hide");
      section2.classList.remove("hide");
      section2.classList.add("show");
    }
  } else {
    alert("Le pseudo ne peut pas être vide !");
  }
}

// Récupération des questions depuis le JSON

const current_question_index = 0;

const current_question = datajson.Question[current_question_index].question;

const A = datajson.Question[current_question_index].propositions[0];
const B = datajson.Question[current_question_index].propositions[1];
const C = datajson.Question[current_question_index].propositions[2];
const D = datajson.Question[current_question_index].propositions[3];

const h3_question = document.querySelector('.h3_question');
if (h3_question) {
  h3_question.innerHTML = current_question;
}

const docA = document.querySelector('.A');
if (docA) {
  docA.innerHTML = A;
}

const docB = document.querySelector('.B');
if (docB) {
  docB.innerHTML = B;
}

const docC = document.querySelector('.C');
if (docC) {
  docC.innerHTML = C;
}

const docD = document.querySelector('.D');
if (docD) {
  docD.innerHTML = D;
}

// Choix d'une questions

for (const reponse of reponses) {
  reponse?.addEventListener("click", () => {
    console.log("Réponse sélectionnée");
    // Retire la classe "selected" de toutes les réponses
    for (const autreReponse of reponses) {
      autreReponse?.classList.remove("selected");
    }
    // Ajoute la classe "selected" à la réponse sélectionnée
    reponse?.classList.add("selected");
  });
}










// // Index de la question courante
// let indexQuestionCourante = 0;

// // Ajoute un écouteur d'événements "click" sur le bouton next
// if (
//   button_info !== null &&
//   button_next !== null &&
//   section1 !== null &&
//   section2 !== null &&
//   section3 !== null &&
//   section4 !== null
// ) {
//   button_next.addEventListener("click", () => {
//     // Récupère la réponse sélectionnée
//     const reponseSelectionnee: HTMLElement | null = document.querySelector(
//       ".reponses .selected"
//     );

//     // Vérifie si une réponse a été sélectionnée
//     if (reponseSelectionnee !== null) {
//       // Vérifie si la réponse sélectionnée est la bonne
//       const reponseValide = reponsesValides[indexQuestionCourante];
//       if (reponseSelectionnee.dataset.reponse === reponseValide) {
//         // Incrémente le score dans le localstorage
//         const score = localStorage.getItem("score");
//         if (score !== null) {
//           localStorage.setItem("score", (parseInt(score) + 1).toString());
//         } else {
//           localStorage.setItem("score", "1");
//         }
//       }

//       // Sauvegarde la réponse sélectionnée dans le localstorage

//       localStorage.setItem(
//         `reponse_${indexQuestionCourante}`,
//         reponseSelectionnee.dataset.reponse!
//       );

//       // Passe à la question suivante
//       indexQuestionCourante++;
//       const questionSuivante = document.querySelector(
//         `#question_${indexQuestionCourante}`
//       ) as HTMLElement;
//       if (questionSuivante !== null) {
//         section2.classList.remove("show");
//         section2.classList.add("hide");
//         section3.classList.remove("hide");
//         section3.classList.add("show");
//       } else {
//         // Fin du quiz - Affiche le score final
//         const scoreFinal = localStorage.getItem("score");
//         if (scoreFinal !== null) {
//           const scoreElement = document.getElementById("score_final");
//           if (scoreElement !== null) {
//             scoreElement.textContent = scoreFinal;
//           }
//         }
//         section3.classList.remove("show");
//         section3.classList.add("hide");
//         section4.classList.remove("hide");
//         section4.classList.add("show");
//       }
//     } else {
//       alert("Veuillez sélectionner une réponse !");
//     }
//   });
// }

// fetch('../json/question_quizz.json')

// interface Question {
//   id: number;
//   question: string;
//   propositions: string[];
//   reponse: string;
//   anecdote: string;
// }

// const questions: Question[] = [
//   // Insérez ici les questions du JSON
// ];

// const quizContainer: HTMLElement | null = document.querySelector(".questions");

// function buildQuiz() {
//   // Pour chaque question, générer le HTML pour la question et les réponses
//   questions.forEach((question) => {
//     const questionContainer = document.createElement("div");
//     questionContainer.classList.add("question-container");

//     const questionTitle = document.createElement("h2");
//     questionTitle.innerText = question.question;
//     questionContainer.appendChild(questionTitle);

//     question.propositions.forEach((proposition) => {
//       const label = document.createElement("label");
//       const radio = document.createElement("input");
//       radio.type = "radio";
//       radio.name = `question-${question.id}`;
//       radio.value = proposition;

//       label.appendChild(radio);
//       label.append(proposition);

//       questionContainer.appendChild(label);
//     });

//     quizContainer?.appendChild(questionContainer);
//   });

//   // Ajouter un gestionnaire d'événements sur le bouton de soumission
//   // button_next?.addEventListener("click", onSubmit);
// }
