let tabResult = [];
let ca = -1;
let cf = -1;
let cv = -1;
let pvht = -1;

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
      let tauxMarge = calculTauxMarge(ca, cv);
      let seuilValeur = calculSeuilValeur(ca, cf, cv);
      let seuilVolume = calculSeuilVolume(ca, cf, cv, pvht);

      // on affiche le résultat dans l'élement correspondant
      $('#resultat').html(`${resultat}`);
      $('#tauxmarge').html(`${tauxMarge}`);
      $('#seuilvaleur').html(`${seuilValeur}`);
      $('#seuilvolume').html(`${seuilVolume} <span class='unite'>unité(s) à vendre</span>`);

      // petit effet de fade-in lors du premier calcul
      $('.result-number').css({
        "opacity": "1"
      });

      // on pousse les données d'entrée et de sortie dans un tableau
      let objectResult = {
        ca: parseFloat(ca),
        cf: parseFloat(cf),
        cv: parseFloat(cf),
        pvht: parseFloat(pvht),
        resultat: resultat,
        taux_marge: tauxMarge,
        seuil_valeur: seuilValeur,
        seuil_volume: seuilVolume
      }
      console.log(objectResult);

      $('#calculer').addClass("disabled");
    } else {
      alert('Veuillez remplir tous les champs pour pouvoir procéder au calcul.');
    }
  } else {
    alert('Veuillez changer au moins champ pour pouvoir procéder à un nouveau calcul.');
  }
});


function calculResultat(ca, cf, cv) {
  let resultat = ca - cf - cv;
  return resultat;
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


$(".entree").on('input', function () {
  if (ca != $('#ca').val() || cf != $('#cf').val() || cv != $('#cv').val() || pvht != $('#pvht').val()) {
    $('#sauvegarder').removeClass("disabled");
    $('#calculer').removeClass("disabled");
  } else {
    $('#sauvegarder').addClass("disabled");
    $('#calculer').addClass("disabled");
  }
});

$('#sauvegarder').on('click', function () {
  appelAjax(objectResult);
});

function appelAjax(objectResult) {
  const objectResultJson = JSON.stringify(objectResult);
  console.log(objectResultJson);

  /*$.ajax({
      url: 'php/seuilrentabilite.php', // script qui va faire la requête
      data: {
        code: objectResultJson // JSON que l'on passe au script PHP
      },
      type: 'POST',
      dataType: 'text'
    })
    .done(function (text) {
		  alert("Calcul sauvegardé ✔️");
      console.log(text); //pour voir les erreurs
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
    });*/

  $('#sauvegarder').addClass("disabled");
}