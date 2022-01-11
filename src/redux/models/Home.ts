import { Messaggio } from './Messages'
import {
    Prestazione, Causale, Pagamento, Lavoratore, Domanda, Fondo, StatoDomanda,
} from './Tipologiche'
import { Autocertificazione } from './Autocertificazioni'

export interface Section_Autocertificazioni {
    ElencoAutocertificazioni: Array<Autocertificazione>,
    loadingAutocertificazioni: boolean
}
export interface Section_Messaggi {
    ElencoMessaggi: Array<Messaggio>,
    loadingMessaggi: boolean
}
export interface Section_Prestazioni {
    ElencoPrestazioni: Array<Prestazione>,
    loadingPrestazioni: boolean
}
export interface Section_Causali {
    ElencoCausali: Array<Causale>,
    loadingCausali: boolean
}
export interface Section_Pagamenti {
    ElencoPagamenti: Array<Pagamento>,
    loadingPagamenti: boolean
}
export interface Section_Lavoratori {
    ElencoLavoratori: Array<Lavoratore>,
    loadingLavoratori: boolean
}export interface Section_Domande {
    ElencoDomande: Array<Domanda>,
    loadingDomande: boolean
}
export interface Section_Fondi {
    ElencoFondi: Array<Fondo>,
    loadingFondi: boolean
}

export interface Section_StatiDomanda {
    ElencoStatiDomanda: Array<StatoDomanda>,
    loadingStatiDomanda: boolean
}
