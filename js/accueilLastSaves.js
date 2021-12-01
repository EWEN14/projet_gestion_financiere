appelAjaxRecup();

function appelAjaxRecup() {
  $.ajax({
    url: 'getSavedSeuilLimit.php', // Script qui effectue la requête.
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