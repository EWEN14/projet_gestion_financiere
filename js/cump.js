// TODO: retirer plus tard les value dans les inputs créés

// tableau qui contiendra les objets représentant chaque ligne
let tabCump = [];
// insertion d'un élément inutile, pour manipuler le tableau à partir de l'index 1.
tabCump.push("CUMP");

// voici les propriétés de chaque objet :
/**
 * type: type de saisie
 * eQ: quantité en entrée
 * eCu: coût unitaire du produit en entrée
 * eM : montant total de ce qui est entré
 * sQ: quantité en sortie
 * sCu: coût unitaire en sortie
 * sM :  montant total de ce qui est sorti
 * stkQ: quantité en stock
 * stkCu: coût unitaire des produits en stock
 * stkM: montant total des produits en stock
 */

// représente les différents types de saisie
const saisie = {
  STOCKINITIAL: 'si',
  ENTREE: 'entree',
  SORTIE: 'sortie'
};

// représente la ligne sur laquelle on travaille
let index = 1;

// définit si une ligne est actuellement en train d'être éditée. Si c'est le cas, on ne pourra 
// pas ajouter une nouvelle entrée ou sortie avant que cette variable passe à false, lorsque la ligne aura été validée
let editOn = true;

// représente la quantité stockée du produit, TODO: variable peut-être inutile à terme
// let stockAtuel = 0;

// variable qui permet de définir quelle type d'entrée est saisie (stock initial, entrée ou sortie)
saisieEnCours = saisie.STOCKINITIAL;


// faire un sorte de système qui en fonction du type de saisie va recalculer ce qu'on a en stock
// et le CU si entrée.
// penser à un éventuel système de modification et de suppression (en fonction du temps)

$('table').on('click', '.valider', function () {
  let quantiteSaisie = $(`#i1_l${index}`).val();
  let coutUnitaireSaisi = "";

  if (saisieEnCours != saisie.SORTIE) { // si pas une sortie, on récupère la valeur de l'input
    coutUnitaireSaisi = $(`#i2_l${index}`).val();
  } else { // sinon, on récupère le texte dans la colonne
    coutUnitaireSaisi = $(`#i2_l${index}`).text();
  }
  
  if (quantiteSaisie && coutUnitaireSaisi) {
    switch (saisieEnCours) {
      case saisie.STOCKINITIAL:
        // stockAtuel = quantiteSaisie;

        // On remplace les inputs par le texte contenant les valeurs
        $(`#td1_l1`).text(`${quantiteSaisie}`);
        $(`#td2_l1`).text(`${coutUnitaireSaisi}`);
        $(`#td3_l1`).text(`${parseInt(quantiteSaisie) * parseFloat(coutUnitaireSaisi)}`);

        // On remplace le bouton de validation par un bouton de modification
        $('#act_l1').html(`<button id="m_${index}" class="btn btn-primary modifier">Modifer</button>`);

        // objet représentant la ligne de stock initial créé, que l'on va pousser dans notre tableau
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

        // On passe l'edit à false car on considère qu'on a fini de travailler sur la ligne en appuyant sur valider
        editOn = false;

        // on augmente l'index de 1, pour indiquer que l'on va ensuite travailler sur une nouvelle ligne
        index++;
        break;

      case saisie.ENTREE:
        // On remplace les inputs par le texte contenant les valeurs
        $(`#td1_l${index}`).text(`${quantiteSaisie}`);
        $(`#td2_l${index}`).text(`${coutUnitaireSaisi}`);
        // montant en entrée arrondi à deux unités après la virgule
        let valeurEntree = +(parseInt(quantiteSaisie) * parseFloat(coutUnitaireSaisi)).toFixed(2);
        $(`#td3_l${index}`).text(`${valeurEntree}`);

        // On met à jour la quantité en stock
        let newQuantityIn = parseInt(quantiteSaisie) + tabCump[index - 1].stkQ;
        // nouveau cout moyen pondéré, arrondi à deux unités après la virgule
        let newCoutUnitaire = +((valeurEntree + tabCump[index - 1].stkM) / newQuantityIn).toFixed(2);
        // nouveau montant en stock suite à l'entrée
        let newMontantStockIn = +(newQuantityIn * newCoutUnitaire).toFixed(2);

        $(`#td4_l${index}`).text(`${newQuantityIn}`);
        $(`#td5_l${index}`).text(`${newCoutUnitaire}`);
        $(`#td6_l${index}`).text(`${newMontantStockIn}`);

        // On remplace le bouton de validation par un bouton de modification
        $(`#act_l${index}`).html(`<button id="m_${index}" class="btn btn-primary modifier">Modifer</button>`);

        // objet représentant la ligne créé, que l'on va pousser dans notre tableau
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

        // on passe l'edit à false car on considère qu'on a fini de travailler sur la ligne en appuyant sur valider
        editOn = false;

        // on augmente l'index de 1, pour indiquer que l'on va ensuite travailler sur une nouvelle ligne
        index++;
        break;

      case saisie.SORTIE:
        // On remplace l'inuput de quantié par le texte contenant les valeur
        $(`#td1_l${index}`).text(`${quantiteSaisie}`);

        // montant en entrée arrondi à deux unités après la virgule
        let valeurSortie = +(parseInt(quantiteSaisie) * parseFloat(coutUnitaireSaisi)).toFixed(2);
        $(`#td3_l${index}`).text(`${valeurSortie}`);

        // On met à jour la quantité en stock
        let newQuantityOut = tabCump[index - 1].stkQ - parseInt(quantiteSaisie);

        let newMontantStockOut = +(newQuantityOut * parseFloat(coutUnitaireSaisi)).toFixed(2);

        // dans le cas d'une sortie, le cout unitaire reste le même qu'à la ligne précédente, 
        // donc on l'affiche dès la création de la ligne dans la colonne correspondante en sortie et en stock
        $(`#td4_l${index}`).text(`${newQuantityOut}`);
        $(`#td6_l${index}`).text(`${newMontantStockOut}`);

        // On remplace le bouton de validation par un bouton de modification
        $(`#act_l${index}`).html(`
          <button id="m_${index}" class="btn btn-primary modifier">✏️</button>
          <button id="s_${index}" class="btn btn-danger supprimer">🗑️</button>`
        );

        // objet représentant la ligne créé, que l'on va pousser dans notre tableau
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

        // on passe l'edit à false car on considère qu'on a fini de travailler sur la ligne en appuyant sur valider
        editOn = false;

        // on augmente l'index de 1, pour indiquer que l'on va ensuite travailler sur une nouvelle ligne
        index++;
        break;

      default:
        alert("Vous n'êtes pas censé voir ce message !");
    }
  } else {
    alert('Veuillez remplir les deux champs avant de valider.');
  }
});

// Lorsque l'on clique sur le bouton pour ajouter une nouvelle entrée, on va créer une nouvelle ligne avec
// des champs de saisies dans les colonnes dédiées.
$('#new-entree').on('click', function () {
  if (!editOn) {
    editOn = true;
    saisieEnCours = saisie.ENTREE;
    $('.ajout').before(`
    <tr id="l${index}">
      <td class="align-middle">Entrée</td>
      <td class="align-middle" id="td1_l${index}"><input id="i1_l${index}" type="number" min="0" name="quantite" placeholder="ex : 100" value="100"></td>
      <td class="align-middle" id="td2_l${index}"><input id="i2_l${index}" type="number" min="0" name="coutunitaire" placeholder="ex : 45" value="45"></td>
      <td class="align-middle" id="td3_l${index}"></td>
      <td colspan="3"></td>
      <td class="align-middle" id="td4_l${index}"></td>
      <td class="align-middle" id="td5_l${index}"></td>
      <td class="align-middle" id="td6_l${index}"></td>
      <td class="align-middle act" id="act_l${index}"><button class="btn btn-success valider">Valider</button></td>
    </tr>
  `);
  } else {
    alert('Veuillez finir de compléter la ligne avec des champs de saisie avant créer une nouvelle entrée.');
  }
});

// Lorsque l'on clique sur le bouton pour ajouter une nouvelle entrée, on va créer une nouvelle ligne avec
// des champs de saisies dans les colonnes dédiées.
$('#new-sortie').on('click', function () {
  if (!editOn) {
    editOn = true;
    saisieEnCours = saisie.SORTIE;
    $('.ajout').before(`
    <tr id="l${index}">
      <td class="align-middle">Entrée</td>
      <td colspan="3"></td>
      <td class="align-middle" id="td1_l${index}"><input id="i1_l${index}" type="number" min="0" max="${tabCump[index-1].stkQ}" name="quantite" placeholder="max: ${tabCump[index-1].stkQ}"></td>
      <td class="align-middle" id="td2_l${index}"><span id="i2_l${index}">${tabCump[index-1].stkCu}</span></td>
      <td class="align-middle" id="td3_l${index}"></td>
      <td class="align-middle" id="td4_l${index}"></td>
      <td class="align-middle" id="td5_l${index}">${tabCump[index-1].stkCu}</td>
      <td class="align-middle" id="td6_l${index}"></td>
      <td class="align-middle act" id="act_l${index}"><button class="btn btn-success valider">Valider</button></td>
    </tr>
  `);
  } else {
    alert('Veuillez finir de compléter la ligne avec des champs de saisie avant créer une nouvelle sortie.');
  }
});

// Pour un élément comme les boutons de confirmation et de validation qui sont générés 
// par le biais de JQuery, on ne peut agir sur eux qu'à partir d'un parent déjà existant dans le DOM.
$('table').on('click', '.modifier', function () {
  console.log('modification....');
  // TODO: implémenter plus tard la modification
});

$('table').on('click', '.supprimer', function () {
  console.log('suppression....');
  // TODO: implémenter plus tard la suppression
});