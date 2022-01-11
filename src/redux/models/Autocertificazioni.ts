/* Messaggi */

export interface Autocertificazione {
    "Id": string,
    "Description": string,
    "Required": boolean,
    "IsEnabled": boolean,
    "Type": "CheckBox" | "RadioButton",
    "Order": number,
    "Group": number,
    "TipoCausale": string,
    "Children": Array<Autocertificazione_Figlio>
}

export interface Autocertificazione_Figlio {
    "Id": string,
    "Testo": string,
    "Order": number,
    "IsEnabled": true,
    "Group": number,
    "FK_Autocertificazione": string,
    "IdTipoCausale": number,
    "TipoCausale": string,
    "InizioValidita": string,/* "/Date(-62135596800000)/" */
    "FineValidita": string /* "/Date(-62135596800000)/" */
}