export interface Utilisateur {
    _id: string,
    profil: number,
    nom: string,
    prenom: string,
    email: string,
    motDePasse: string,
    preferences: [{
        servicePrefere: string,
        employePrefere: string
    }],
    horairestravail: string[],
    services: string[]
}

export interface Service {
    _id: string,
    nom: string,
    image: string,
    prix: number,
    duree: number,
    commission: number,
    employe_id: string // Pour la séléction du client
}

export interface Horairetravail {
    _id: string,
    heureDebut: number,
    heureFin: number,
    jourSemaine: number
}

export interface Rendezvous {
    _id: string,
    date: Date,
    client: string,
    service: string,
    employe: string,
    etat: number
}

export interface Depense {
    _id: string,
    nom: string,
    montant: number
}