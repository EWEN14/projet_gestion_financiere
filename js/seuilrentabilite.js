// objet qui contiendra les données qui seront potentiellement sauvegardée
let objectResult;

// j'initialise les éléments à -1 pour qu'il ne soient pas considérés comme null
let ca = -1;
let cf = -1;
let cv = -1;
let pvht = -1;

// variable qui indique si le calcul a été sauvegardé ou non
let alreadySaved = false;

// récupération des calculs sauvegardés de l'utilisateur.
appelAjaxRecup();

// Au clic sur le bouton calculer
$('#calculer').on('click', function () {

  // on ne peut pas recalculer tant qu'on n'a pas changé au moins une des quatre valeurs d'entrée
  if (ca != $('#ca').val() || cf != $('#cf').val() || cv != $('#cv').val() || pvht != $('#pvht').val()) {
    ca = $('#ca').val();
    cf = $('#cf').val();
    cv = $('#cv').val();
    pvht = $('#pvht').val();

    // tous les champs doivent être remplis pour pouvoir procéder au calcul
    if (ca && cf && cv && pvht) {
      console.log(ca, cf, cv, pvht);

      // calcul des différents éléments
      let resultat = calculResultat(ca, cf, cv);
      let marge = calculMarge(ca, cv);
      let tauxMarge = calculTauxMarge(ca, cv);
      let seuilValeur = calculSeuilValeur(ca, cf, cv);
      let seuilVolume = calculSeuilVolume(ca, cf, cv, pvht);

      // on affiche le résultat dans l'élement correspondant
      $('#resultat').html(`${resultat}`);
      $('#marge').html(`${marge}`);
      $('#tauxmarge').html(`${tauxMarge}`);
      $('#seuilvaleur').html(`${seuilValeur}`);
      $('#seuilvolume').html(`${seuilVolume} <span class='unite'>unité(s) à vendre</span>`);

      // petit effet de fade-in lors du premier calcul
      $('.result-number').css({
        "opacity": "1"
      });

      // on pousse les données d'entrée et de sortie dans un objet
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

      // On désactive le bouton de calcul, qui se réactivera quand une valeur aura été changée
      $('#calculer').addClass("disabled");
      $('#bouton-calcul').addClass("disabled");
      $('#bouton-calcul').attr("title", "Veuillez changer une valeur pour pouvoir procéder à un nouveau calcul.");

      // On active le bouton de sauvarde
      $('#sauvegarder').removeClass("disabled");
      $('#bouton-sauvegarde').removeClass("disabled");
      $('#bouton-sauvegarde').attr("title", "");
    } else {
      alert('Veuillez remplir tous les champs pour pouvoir procéder au calcul.');
    }
  } else {
    alert('Veuillez changer au moins champ pour pouvoir procéder à un nouveau calcul.');
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

// lorsque l'on tape une nouvelle données dans un des inputs, on vérifie qu'elle est bien différente à la précédente
$(".entree").on('input', function () {
  if (ca != $('#ca').val() || cf != $('#cf').val() || cv != $('#cv').val() || pvht != $('#pvht').val()) {
    // si bien différent, on active de nouveau les boutons de calculs
    $('#calculer').removeClass("disabled");
    $('#bouton-calcul').removeClass("disabled");
    $('#bouton-calcul').attr("title", "Procéder au calcul.");
  } else {
    // sinon on les désactive de nouveau
    $('#calculer').addClass("disabled");
    $('#bouton-calcul').attr("title", "Veuillez changer une valeur pour pouvoir procéder à un nouveau calcul.");
    // on ne désactive le bouton de sauvegarde que si on a déjà sauvegardé le calcul
    if (alreadySaved) {
      $('bouton-sauvegarde').addClass("disabled");
      $('#sauvegarder').addClass("disabled");
    }
  }
});

$('#sauvegarder').on('click', function () {
  appelAjaxSave(objectResult);

  // lorsqu'on sauvegarde, on désactive le bouton de sauvegarde tant que l'on ne tape pas de nouvelles valeurs
  alreadySaved = true;
  $('#sauvegarder').addClass("disabled");
  $('#bouton-sauvegarde').addClass("disabled");
  $('#bouton-sauvegarde').attr("title", "Veuillez effectuer un autre calcul pour pouvoir le sauvegarder.");
});

function appelAjaxSave(objectResult) {
  const objectResultJson = JSON.stringify(objectResult);
  console.log(objectResultJson);

  $.ajax({
    url: 'php/saveSeuil.php', // script qui va faire la requête
    data: {
      code: objectResultJson // JSON que l'on passe au script PHP
    },
    type: 'POST',
    dataType: 'text'
  })
    .done(function (text) {
      alert("Calcul sauvegardé ✔️");
      // on ajoute le calcul aux calculs sauvegardés
      $(".saved-calculs").prepend(
        `<div>
            chiffre d'affaires : ${objectResult.ca},  
            coût fixes : ${objectResult.cf},  
            coût variables : ${objectResult.cv},  
            prix de vente hors taxe : ${objectResult.pvht},  
            résultat : ${objectResult.resultat},  
            taux marge : ${objectResult.taux_marge},  
            seuil de rentabilité en valeur : ${objectResult.seuil_valeur},  
            seuil de rentabilité en volume : ${objectResult.seuil_volume}</div>`
      );
      $(".saved-calculs").children('div').addClass("saved-calcul");
    })
    .fail(function (xhr, status, errorThrown) {
      alert("Sorry, there was a problem!");
      console.log("Error: " + errorThrown);
      console.log("Status: " + status);
      console.dir(xhr);
    })
    .always(function (xhr, status) {
      // à retirer à la fin
      console.log("The request is complete!");
    });
}

function appelAjaxRecup() {
  $.ajax({
    url: 'php/getSavedSeuil.php', // script qui va faire la requête
    type: 'GET',
    dataType: 'json'
  })
    .done(function (json) {
      // alert("Calcul sauvegardé ✔️");
      if (json === "nothing") {
        $(".saved-calculs").prepend("<p class='no-save'>Aucun Calcul Sauvegardé</p>");
      } else {
        console.log(json);
        $(".no-save").remove();
        for (const element in json) {
          $("#table-body").prepend(
            `<tr>
                <th>${json[element].prix_vente_hors_taxe}</th>
                <th>${json[element].chiffre_affaire}</th> 
                <th>${json[element].cout_variable}</th>
                <th>${json[element].taux_marge * json[element].chiffre_affaire}</th> 
                <th>${json[element].taux_marge}</th> 
                <th>${json[element].cout_fixe}</th>
                <th>${json[element].seuil_resultat}</th>
                <th>${json[element].seuil_valeur}</th>seuil de rentabilité en valeur : ,  
                <th>${json[element].seuil_volume}</th>
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
      // à retirer à la fin
      console.log("The request is complete!");
    });
}
