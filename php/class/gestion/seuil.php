<?php

class SeuilDeRentatibilite
{
    private $chiffreAffaire;
    private $coutFixe;
    private $coutvariable;
    private $prixVenteHorsTaxe;
    private $resultat;
    private $tauxMarge;
    private $seuilValeur;
    private $seuilVolume;

    public function getChiffreAffaire()
    {
        return $this->chiffreAffaire;
    }

    public function setChiffreAffaire(double $nouveauCA = 0.0)
    {
        $this->chiffreAffaire = $nouveauCA;
    }

    public function getCoutFixe()
    {
        return $this->coutFixe;
    }

    public function setCoutFixe(Double $nouveauCoutFixe = 0.0)
    {
        $this->coutFixe = $nouveauCoutFixe;
    }

    public function getCoutVariable()
    {
        return $this->coutvariable;
    }

    public function setCoutVariable(Double $nouveauCoutVariable = 0.0)
    {
        $this->coutvariable = $nouveauCoutVariable;
    }

    public function getPrixVenteHorsTaxe()
    {
        return $this->prixVenteHorsTaxe;
    }

    public function setPrixVenteHorsTaxe(Double $nouveauPrixVenteHorsTaxe = 0.0)
    {
        $this->prixVenteHorsTaxe = $nouveauPrixVenteHorsTaxe;
    }

    public function getResultat()
    {
        return $this->resultat;
    }

    public function setResultat(Double $nouveauResultat = 0.0)
    {
        $this->resultat = $nouveauResultat;
    }

    public function getTauxMarge()
    {
        return $this->tauxMarge;
    }

    public function setTauxMarge(Double $nouveauTauxMarge = 0.0)
    {
        $this->tauxMarge = $nouveauTauxMarge;
    }

    public function getSeuilValeur()
    {
        return $this->seuilValeur;
    }

    public function setSeuilValeur(Double $nouveauSeuilValeur = 0.0)
    {
        $this->seuilValeur = $nouveauSeuilValeur;
    }

    public function getSeuilVolume()
    {
        return $this->seuilVolume;
    }

    public function setSeuilVolume(Double $nouveauSeuilVolume = 0.0)
    {
        $this->seuilVolume = $nouveauSeuilVolume;
    }
}
