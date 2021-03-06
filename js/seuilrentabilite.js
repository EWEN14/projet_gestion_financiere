//Projet MEJK/UNC MIAGE/Méthode agile/seuilrentabilite
// Objet contenant les données potentiellement sauvegardées.
let objectResult;

// Initialisation des éléments à -1 afin que ceux-ci ne soient pas considérés comme null.
let ca = -1;
let cf = -1;
let cv = -1;
let pvht = -1;

// Variable indiquant si la sauvegarde du calcul a été effectuée ou non. 
let alreadySaved = false;

// Récupération des calculs sauvegardés par l'utilisateur.
appelAjaxRecup();

// Cliquer sur le bouton calculer.
$('#calculer').on('click', function () {

  // Si au moins l'une des quatre valeurs d'entrée n'est pas modifié, le recalcule n'est pas effectué. 
  if (ca != $('#ca').val() || cf != $('#cf').val() || cv != $('#cv').val() || pvht != $('#pvht').val()) {
    ca = $('#ca').val();
    cf = $('#cf').val();
    cv = $('#cv').val();
    pvht = $('#pvht').val();

    // Pour procéder au calcul, tous les champs doivent être rempli.
    if (ca && cf && cv && pvht) {
      console.log(ca, cf, cv, pvht);

      // Calcul des différents éléments.
      let resultat = calculResultat(ca, cf, cv);
      let marge = calculMarge(ca, cv);
      let tauxMarge = calculTauxMarge(ca, cv);
      let seuilValeur = calculSeuilValeur(ca, cf, cv);
      let seuilVolume = calculSeuilVolume(ca, cf, cv, pvht);

      // Affichage du résultat dans l'élement correspondant.
      $('#resultat').html(`${resultat}`);
      $('#marge').html(`${marge}`);
      $('#tauxmarge').html(`${tauxMarge}`);
      $('#seuilvaleur').html(`${seuilValeur}`);
      $('#seuilvolume').html(`${seuilVolume} <span class='unite'>unité(s) à vendre</span>`);

      // Effet de fade-in lors du premier calcul.
      $('.result-number').css({
        "opacity": "1"
      });

      // Les données d'entrée et de sortie sont poussées dans un objet.
      objectResult = {
        ca: parseFloat(ca),
        cf: parseFloat(cf),
        cv: parseFloat(cv),
        pvht: parseFloat(pvht),
        resultat: resultat,
        taux_marge: tauxMarge,
        seuil_valeur: seuilValeur,
        seuil_volume: seuilVolume
      }
      console.log(objectResult);

      /* Désactivation du bouton "calcul".
      Lors de la modification de la valeur, le bouton sera réactivé. */
      $('#calculer').addClass("disabled");
      $('#bouton-calcul').addClass("disabled");
      $('#bouton-calcul').attr("title", "Veuillez changer une valeur pour pouvoir procéder à un nouveau calcul.");

      // Activation du bouton "sauvegarde".
      $('#sauvegarder').removeClass("disabled");
      $('#bouton-sauvegarde').removeClass("disabled");
      $('#bouton-sauvegarde').attr("title", "");
    } else {
      alert("Veuillez remplir tous les champs pour pouvoir procéder au calcul.");
    }
  } else {
    alert("Veuillez changer au moins champ pour pouvoir procéder à un nouveau calcul.");
  }
});


function calculResultat(ca, cf, cv) {
  return ca - cf - cv;
}

function calculMarge(ca, cv) {
  return ca - cv;
}

function calculTauxMarge(ca, cv) {
  let taux = (ca - cv) / ca;
  taux = +taux.toFixed(2);
  return taux;
}

function calculSeuilValeur(ca, cf, cv) {
  let seuilValeur = cf / calculTauxMarge(ca, cv);
  seuilValeur = +seuilValeur.toFixed(2);
  return seuilValeur;
}

function calculSeuilVolume(ca, cf, cv, pvht) {
  let seuilVolume = calculSeuilValeur(ca, cf, cv) / pvht;
  seuilVolume = Math.round(seuilVolume);
  return seuilVolume;
}

// Lorsque une valeur est saisie dans un des inputs, on vérifie qu'elle est bien différente à la précédente.
$(".entree").on('input', function () {
  if (ca != $('#ca').val() || cf != $('#cf').val() || cv != $('#cv').val() || pvht != $('#pvht').val()) {
    // Si différence il y a, les boutons de calculs sont activés.
    $('#calculer').removeClass("disabled");
    $('#bouton-calcul').removeClass("disabled");
    $('#bouton-calcul').attr("title", "Procéder au calcul.");
  } else {
    // sinon, les boutons de calculs sont désactivé.
    $('#calculer').addClass("disabled");
    $('#bouton-calcul').attr("title", "Veuillez changer une valeur pour pouvoir procéder à un nouveau calcul.");
    // Si le calcul est déjà sauvegardé, le bouton de sauvegarde n'est pas désactivé.
    if (alreadySaved) {
      $('bouton-sauvegarde').addClass("disabled");
      $('#sauvegarder').addClass("disabled");
    }
  }
});

$('#sauvegarder').on('click', function () {
  appelAjaxSave(objectResult);

  // Lors de la sauvegarde, le bouton "sauvegarde" est désactivé tant que de nouvelles valeurs ne sont pas saisies.
  alreadySaved = true;
  $('#sauvegarder').addClass("disabled");
  $('#bouton-sauvegarde').addClass("disabled");
  $('#bouton-sauvegarde').attr("title", "Veuillez effectuer un autre calcul pour pouvoir le sauvegarder.");
});

function appelAjaxSave(objectResult) {
  const objectResultJson = JSON.stringify(objectResult);
  console.log(objectResultJson);

  $.ajax({
    url: 'php/saveSeuil.php', // Script qui effectue la requête.
    data: {
      code: objectResultJson // JSON est passé au script PHP.
    },
    type: 'POST',
    dataType: 'text'
  })
    .done(function (text) {
      alert("Calcul sauvegardé ✔️");
      // Ajoute du nouveau calcul aux calculs sauvegardés.
      $("#table-body").prepend(
        `<tr>
            <th>${objectResult.pvht}</th>
            <th>${objectResult.ca}</th> 
            <th>${objectResult.cv}</th>
            <th>${objectResult.taux_marge * objectResult.resultat}</th> 
            <th>${objectResult.taux_marge}</th> 
            <th>${objectResult.cf}</th>
            <th>${objectResult.resultat}</th>
            <th>${objectResult.seuil_valeur}</th>seuil de rentabilité en valeur : ,  
            <th>${objectResult.seuil_volume}</th>
        </tr>`
      );
    })
    .fail(function (xhr, status, errorThrown) {
      alert("Sorry, there was a problem!");
      console.log("Error: " + errorThrown);
      console.log("Status: " + status);
      console.dir(xhr);
    })
    .always(function (xhr, status) {
      // A retirer à la fin.
      console.log("The request is complete!");
    });
}

function appelAjaxRecup() {
  $.ajax({
    url: 'php/getSavedSeuil.php', // Script qui effectue la requête.
    type: 'GET',
    dataType: 'json'
  })
    .done(function (json) {
      // alert("Calcul sauvegardé ✔️");
      if (json == "nothing") {
        $(".saved-calculs").prepend("<p class='no-save'>Aucun Calcul Sauvegardé</p>");
      } else {
        console.log(json);
        $(".no-save").remove();
        for (const element in json) {
          $("#table-body").prepend(
            `<tr class="font-weight-light">
                <td class="font-weight-light">${json[element].prix_vente_hors_taxe}</td>
                <td>${json[element].chiffre_affaire}</td> 
                <td>${json[element].cout_variable}</td>
                <td>${json[element].taux_marge * json[element].chiffre_affaire}</td> 
                <td>${json[element].taux_marge}</td> 
                <td>${json[element].cout_fixe}</td>
                <td>${json[element].seuil_resultat}</td>
                <td>${json[element].seuil_valeur}</td>seuil de rentabilité en valeur : ,  
                <td>${json[element].seuil_volume}</td>
            </tr>`
          );
        }
        $("#table-body").children('tr').addClass("saved-calcutext-secondary text-center align-middle");
        $("#table-body").children('th').attr("scope","row");
      }
    })
    .fail(function (xhr, status, errorThrown) {
      alert("Sorry, there was a problem!");
      console.log("Error: " + errorThrown);
      console.log("Status: " + status);
      console.dir(xhr);
    })
    .always(function (xhr, status) {
      // A retirer à la fin.
      console.log("The request is complete!");
    });
}
