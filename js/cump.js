// tableau qui contiendra les tableaux représentant chaque ligne
let tabCump = [];

const saisie = {
  STOCKINITIAL = "si",
  ENTREE = "entree",
  SORTIE = "sortie"
};

// représente la ligne sur laquelle on va travailler
let index = 1;

// variable qui permet de définir quelle type d'entrée est saisie (stock initial, entrée ou sortie)
saisieEnCours = saisie.STOCKINITIAL;


// faire un sorte de système qui en fonction du type de saisie va recalculer ce qu'on a en stock
// et le CU si entrée.
// penser à un éventuel système de modification et de suppression (en fonction du temps)