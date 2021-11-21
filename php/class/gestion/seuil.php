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

    public function setChiffreAffaire($nouveauCA)
    {
        $this->chiffreAffaire = $nouveauCA;
    }

    public function getCoutFixe()
    {
        return $this->coutFixe;
    }

    public function setCoutFixe($nouveauCoutFixe)
    {
        $this->coutFixe = $nouveauCoutFixe;
    }

    public function getCoutVariable()
    {
        return $this->coutvariable;
    }

    public function setCoutVariable($nouveauCoutVariable)
    {
        $this->coutvariable = $nouveauCoutVariable;
    }

    public function getPrixVenteHorsTaxe()
    {
        return $this->prixVenteHorsTaxe;
    }

    public function setPrixVenteHorsTaxe($nouveauPrixVenteHorsTaxe)
    {
        $this->prixVenteHorsTaxe = $nouveauPrixVenteHorsTaxe;
    }

    public function getResultat()
    {
        return $this->resultat;
    }

    public function setResultat($nouveauResultat)
    {
        $this->resultat = $nouveauResultat;
    }

    public function getTauxMarge()
    {
        return $this->tauxMarge;
    }

    public function setTauxMarge($nouveauTauxMarge)
    {
        $this->tauxMarge = $nouveauTauxMarge;
    }

    public function getSeuilValeur()
    {
        return $this->seuilValeur;
    }

    public function setSeuilValeur($nouveauSeuilValeur)
    {
        $this->seuilValeur = $nouveauSeuilValeur;
    }

    public function getSeuilVolume()
    {
        return $this->seuilVolume;
    }

    public function setSeuilVolume($nouveauSeuilVolume)
    {
        $this->seuilVolume = $nouveauSeuilVolume;
    }
}
