$('#calculer').on('click', function () {

  // implémenter plus tard quelque chose qui fait qu'on peut pas recalculer tant qu'on n'a pas changé
  // au moins une autre valeur
  let ca = $('#ca').val();
  let cf = $('#cf').val();
  let cv = $('#cv').val();
  let pvht = $('#pvht').val();

  if (ca && cf && cv && pvht) {
    console.log(ca, cf, cv, pvht);
    calculResultat(ca, cf, cv);
    calculTauxMarge(ca, cv);
    calculSeuilValeur(ca, cf, cv);
    calculSeuilVolume(ca, cf, cv, pvht);
  } else {
    alert('Veuillez remplir tous les champs pour procéder au calcul.');
  }
});


function calculResultat(ca, cf, cv) {
  let resultat = ca - cf - cv;
  $('#resultat').html(`${resultat}`);
}

function calculTauxMarge(ca, cv) {
  let taux = (ca - cv) / ca;
  taux = +taux.toFixed(2);
  $('#tauxmarge').html(`${taux}`);
  return taux;
}

function calculSeuilValeur(ca, cf, cv) {
  let seuilValeur =  cf / calculTauxMarge(ca, cv);
  seuilValeur = +seuilValeur.toFixed(2);
  $('#seuilvaleur').html(`${seuilValeur}`);
  return seuilValeur;
}

function calculSeuilVolume(ca, cf, cv, pvht) {
  let seuilVolume =  calculSeuilValeur(ca, cf, cv) / pvht;
  seuilVolume = Math.round(seuilVolume);
  $('#seuilvolume').html(`${seuilVolume} unité(s) à vendre`);
}

