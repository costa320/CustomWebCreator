
/* TIPOLOGICHE A LIVELLO DATI PURI  */
/* START TIPOLOGICHE */
export interface Prestazione {
    Id: number,
    Name: string,
    TipoTicket: string,
    IsEnable: boolean,
    Codice: string,
    Titolario: string
}

export interface Causale {
    Id: number,
    Name: string,
    DataDal: string, /* "/Date(1594591200000)/" */
    DataAl: string, /* "/Date(1594591200000)/" */
    Anno: number,
    DataAssunzione: string, /* "/Date(1594591200000)/" */
    NumeroSettimane: number,
    TipoPrestazione: number,
    LimitePresentazioneInGiorni: number,
    ExternalRef: string
}

export interface Pagamento {
    Id: number,
    Name: string,
    Codifica: string,
    IsAnticipo: boolean
}

export interface Lavoratore {
    IdTipoLavoratore: string,
    Descrizione: string
}

export interface Domanda {
    Id: number,
    Name: string
}

export interface Fondo {
    Id: number,
    Name: string,
    Order: number,
    IdPrestazione: number,
    Prestazione: string,
    Codice: string,
    Sigla: string
}

/* END TIPOLOGICHE */

export interface StatoDomanda {
    Id: number,
    Codice: string,
    Descrizione: string
}