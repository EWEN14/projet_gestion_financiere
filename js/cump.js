//Projet MEJK/UNC MIAGE/Méthode agile/cump
// TODO: Retirer plus tard les values dans les inputs créés.

// Tableau contenant les objets représentant chaque ligne. 
let tabCump = [];
// Insertion d'un élément inutile pour manipuler le tableau à partir de l'index 1.
tabCump.push("CUMP");

// Ci-dessous les propriétés de chaque objet :
/**
 * type: type de saisie;
 * eQ: quantité en entrée;
 * eCu: coût unitaire du produit entrée;
 * eM : montant total de l'entrée;
 * sQ: quantité en sortie;
 * sCu: coût unitaire du produit sortie;
 * sM : montant total de la sortie;
 * stkQ: quantité du stock;
 * stkCu: coût unitaire d(u/es) produit(s) en stock;
 * stkM: montant total d(u/es) produit(s) en stock;
 */

// Représente la ligne sur laquelle on travaille.
const saisie = {
  STOCKINITIAL: 'si',
  ENTREE: 'entree',
  SORTIE: 'sortie'
};

// Représente la ligne sur laquelle on travaille.
let index = 1;

/* Définit si une ligne est actuellement en train d'être éditée. Si c'est le cas, 
on ne pourra pas ajouter de nouvelle entrée ou sortie avant que cette variable passe à false, 
lorsque la ligne aura été validée. */
let editOn = true;

// Variable permettant de définir quel type d'entrée est saisie (stock initial, entrée ou sortie).
saisieEnCours = saisie.STOCKINITIAL;

// Action qui se déclenche lorsque l'on clique sur le bouton "valider" d'une ligne.
$('table').on('click', '.valider', function () {
  let quantiteSaisie = $(`#i1_l${index}`).val();
  let coutUnitaireSaisi = "";

  if (saisieEnCours != saisie.SORTIE) { // si pas de sortie, on récupère la valeur de l'input.
    coutUnitaireSaisi = $(`#i2_l${index}`).val();
  } else { // sinon, on récupère le texte dans la colonne.
    coutUnitaireSaisi = $(`#i2_l${index}`).text();
  }

  if (quantiteSaisie && coutUnitaireSaisi) {
    switch (saisieEnCours) {
      case saisie.STOCKINITIAL:

        // On remplace les inputs par le texte contenant les valeurs.
        $(`#td1_l1`).text(`${quantiteSaisie}`);
        $(`#td2_l1`).text(`${coutUnitaireSaisi}`);
        $(`#td3_l1`).text(`${parseInt(quantiteSaisie) * parseFloat(coutUnitaireSaisi)}`);

        // On remplace le bouton "validation" par un bouton "modification". 
        $('#act_l1').html(`<span></span>`);
        // $('#act_l1').html(`<button id="m_${index}" class="btn btn-primary modifier">✏️</button>`);

        // Objet représentant la ligne de stock initial créé, que l'on va pousser dans notre tableau. 
        let stockInitial = {
          type: saisie.STOCKINITIAL,
          eQ: 0,
          eCu: 0,
          eM: 0,
          sQ: 0,
          sCu: 0,
          sM: 0,
          stkQ: parseInt(quantiteSaisie),
          stkCu: parseFloat(coutUnitaireSaisi),
          stkM: parseInt(quantiteSaisie) * parseFloat(coutUnitaireSaisi)
        }
        tabCump.push(stockInitial);

        // En appuyant sur "valider", edit passe à false car le travail sur la ligne est terminé.
        editOn = false;

        // Pour indiquer que l'on va travailler sur une nouvelle ligne, on augmente index de 1. 
        index++;
        break;

      case saisie.ENTREE:
        // Remplacement des inputs par le texte contenant les valeurs. 
        $(`#td1_l${index}`).text(`${quantiteSaisie}`);
        $(`#td2_l${index}`).text(`${coutUnitaireSaisi}`);
        // Le montant en entrée est arrondi à deux chiffres après la virgule.
        let valeurEntree = +(parseInt(quantiteSaisie) * parseFloat(coutUnitaireSaisi)).toFixed(2);
        $(`#td3_l${index}`).text(`${valeurEntree}`);

        // Mise à jour de la quantité en stock.
        let newQuantityIn = parseInt(quantiteSaisie) + tabCump[index - 1].stkQ;
        // Le nouveau cout moyen pondéré est arrondi à deux chiffres après la virgule. 
        let newCoutUnitaire = +((valeurEntree + tabCump[index - 1].stkM) / newQuantityIn).toFixed(2);
        // Modification du montant en stock, suite à une nouvelle entrée. 
        let newMontantStockIn = +(newQuantityIn * newCoutUnitaire).toFixed(2);

        $(`#td4_l${index}`).text(`${newQuantityIn}`);
        $(`#td5_l${index}`).text(`${newCoutUnitaire}`);
        $(`#td6_l${index}`).text(`${newMontantStockIn}`);

        // Remplacement du bouton "validation" par un bouton "modification". 
        $(`#act_l${index}`).html(`
          <button id="s_${index}" class="btn btn-danger supprimer">🗑️</button>`);

        // Objet représentant la ligne créé, que l'on va pousser dans notre tableau.
        let newEntry = {
          type: saisie.ENTREE,
          eQ: parseInt(quantiteSaisie),
          eCu: parseFloat(coutUnitaireSaisi),
          eM: valeurEntree,
          sQ: 0,
          sCu: 0,
          sM: 0,
          stkQ: newQuantityIn,
          stkCu: newCoutUnitaire,
          stkM: newMontantStockIn
        }
        tabCump.push(newEntry);

        // En appuyant sur "valider", edit passe à false car le travail sur la ligne est terminé.
        editOn = false;

        // Pour indiquer que l'on va travailler sur une nouvelle ligne, on augmente index de 1. 
        index++;
        break;

      case saisie.SORTIE:
        if (parseInt(quantiteSaisie) > tabCump[index - 1].stkQ) {
          alert("Vous ne pouvez sortir plus de produits qu'il n'y en a en stock.");
          break;
        }

        // Remplacement de l'input quantité par le texte contenant les valeurs.
        $(`#td1_l${index}`).text(`${quantiteSaisie}`);

        // Le montant en entrée est arrondi à deux chiffres après la virgule.
        let valeurSortie = +(parseInt(quantiteSaisie) * parseFloat(coutUnitaireSaisi)).toFixed(2);
        $(`#td3_l${index}`).text(`${valeurSortie}`);

        // Mise à jour de la quantité en stock.
        let newQuantityOut = tabCump[index - 1].stkQ - parseInt(quantiteSaisie);

        let newMontantStockOut = +(newQuantityOut * parseFloat(coutUnitaireSaisi)).toFixed(2);

        /* En cas de sortie, le coût unitaire reste le même qu'à la ligne précédente et sera
        affiché dès la création de la ligne dans la colonne correspondante au sortie et au stock. */
        $(`#td4_l${index}`).text(`${newQuantityOut}`);
        $(`#td6_l${index}`).text(`${newMontantStockOut}`);

        // Remplacement du bouton "validation" par un bouton "modification". 
        $(`#act_l${index}`).html(`
          <button id="s_${index}" class="btn btn-danger supprimer">🗑️</button>`);

        // Objet représentant la ligne créé, que l'on va pousser dans notre tableau.
        let newSortie = {
          type: saisie.SORTIE,
          eQ: 0,
          eCu: 0,
          eM: 0,
          sQ: parseInt(quantiteSaisie),
          sCu: parseFloat(coutUnitaireSaisi),
          sM: valeurSortie,
          stkQ: newQuantityOut,
          stkCu: parseFloat(coutUnitaireSaisi),
          stkM: newMontantStockOut
        }
        tabCump.push(newSortie);

        // En appuyant sur "valider", edit passe à false car le travail sur la ligne est terminé.
        editOn = false;

        // Pour indiquer que l'on va travailler sur une nouvelle ligne, on augmente index de 1. 
        index++;
        break;

      default:
        alert("Vous n'êtes pas censé voir ce message.");
    }
  } else {
    alert("Veuillez remplir le(s) champ(s) avant de valider.");
  }
});

/* En utilisant le bouton pour ajouter une nouvelle entrée, 
on crée une nouvelle ligne avec des champs de saisies dans les colonnes dédiées. */
$('#new-entree').on('click', function () {
  if (!editOn) {
    // Retrait du bouton "suppression" de la ligne précédente.
    $(`#s_${index - 1}`).remove();

    editOn = true;
    saisieEnCours = saisie.ENTREE;
    $('.ajout').before(`
    <tr id="l${index}">
      <td class="text-left align-middle">Entrée</td>
      <td class="align-middle" id="td1_l${index}"><input id="i1_l${index}" type="number" min="0" name="quantite" placeholder="ex : 100" value="100"></td>
      <td class="align-middle" id="td2_l${index}"><input id="i2_l${index}" type="number" min="0" name="coutunitaire" placeholder="ex : 45" value="45"></td>
      <td class="align-middle" id="td3_l${index}"></td>
      <td colspan="3"></td>
      <td class="align-middle" id="td4_l${index}"></td>
      <td class="align-middle" id="td5_l${index}"></td>
      <td class="align-middle" id="td6_l${index}"></td>
      <td class="align-middle act" id="act_l${index}">
        <button class="btn btn-success valider">✔️</button>
        <button id="s_${index}" class="btn btn-danger supprimer">🗑️</button>
      </td>
    </tr>
  `);
  } else {
    alert("Veuillez compléter les champs de saisie avant de créer une nouvelle entrée.");
  }
});

/* En utilisant le bouton pour ajouter une nouvelle entrée, 
on crée une nouvelle ligne avec des champs de saisies dans les colonnes dédiées. */
$('#new-sortie').on('click', function () {
  if (!editOn) {
    // Retrait du bouton "suppression" de la ligne précédente.
    $(`#s_${index - 1}`).remove();

    editOn = true;
    saisieEnCours = saisie.SORTIE;
    $('.ajout').before(`
    <tr id="l${index}">
      <td class="text-left align-middle">Sortie</td>
      <td colspan="3"></td>
      <td class="align-middle" id="td1_l${index}"><input id="i1_l${index}" type="number" min="0" max="${tabCump[index - 1].stkQ}" name="quantite" placeholder="max: ${tabCump[index - 1].stkQ}"></td>
      <td class="align-middle" id="td2_l${index}"><span id="i2_l${index}">${tabCump[index - 1].stkCu}</span></td>
      <td class="align-middle" id="td3_l${index}"></td>
      <td class="align-middle" id="td4_l${index}"></td>
      <td class="align-middle" id="td5_l${index}">${tabCump[index - 1].stkCu}</td>
      <td class="align-middle" id="td6_l${index}"></td>
      <td class="align-middle act" id="act_l${index}">
        <button class="btn btn-success valider">✔️</button>
        <button id="s_${index}" class="btn btn-danger supprimer">🗑️</button>
      </td>
    </tr>
  `);
  } else {
    alert("Veuillez compléter les champs de saisie avant de créer une nouvelle sortie.");
  }
});

/* Pour des éléments, tels que les boutons "confirmation" et "validation", générés
par le biais de JQuery, on ne peut agir sur eux qu'à partir d'un parent déjà existant dans le DOM.
Plutôt que de sélectionner directement l'élément généré. On utilise .on avec ce parent. */
$('table').on('click', '.modifier', function () {
  console.log('modification....');
  // TODO: Implémenter plus tard la modification.
});

// Seule la dernière ligne est supprimée si le bouton "suppression" est sélectionné.  
$('table').on('click', '.supprimer', function () {
  // Récupèration de id du bouton "suppression", pour avoir le numéro de ligne / l'index.  
  let idRowToDelete = $(this).attr('id');
  let splitString = idRowToDelete.split('_');
  let id = splitString[1];

  // Prévoir la suppression selon deux cas : si la ligne est en cours d'édition ou non.
  // Si la ligne n'est pas en cours d'édtion, elle est validée et on place l'index à +1.
  // La ligne à supprimer est donc à l'index actuel -1 et on doit retirer l'élément correspondant dans notre tableau d'objets.
  // En plus de cela, on vérifie que que l'index est cohérent avec la ligne que l'on va supprimer.
  if (!editOn && id == (index - 1)) {
    $(`#l${index - 1}`).remove();
    tabCump.splice(id, 1);
    // Remettre le bouton "suppression" à la ligne précédente. 
    $(`#m_${index - 2}`).after(`<button id="s_${index - 2}" class="btn btn-danger supprimer" style="margin-left: 5px;">🗑️</button>`)
    // Réduction de l'index "suppression". 
    index--;
  } else if (editOn && id == index) {
    // Sinon, si la ligne est en cours d'édition, on la retire à l'index actuel et on repasse édit à false. 
    $(`#l${index}`).remove();
    editOn = false;
    // Remettre le bouton de "suppression" à la ligne précédente. 
    $(`#m_${index - 1}`).after(`<button id="s_${index - 1}" class="btn btn-danger supprimer" style="margin-left: 5px;">🗑️</button>`)

  } else {
        // Cas où l'utilisateur manipule l'id des boutons de suppression, en modifiant l'HTML via l'inspecteur.
    alert("Vous avez manipulé manipulé quelque chose que vous n'auriez pas dû... Arrêtez de faire n'importe quoi !")
  }
});
