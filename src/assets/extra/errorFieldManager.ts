/* CONFIGURATION */
import { getConfigControlFields } from './uniformazioneDati.config';
/* MODELS */
import { Action } from './../../redux/models/NuovaRichiesta.errors';

/* controlFieldFunction will pair obj.parameter name with getConfigControlFields obj
    doing this he will know wich controls he should perform on a certain field */
export function controlFields({ payload, type }: Action): any {

    let ErrorsObj: any = {};

    Object.keys(payload).forEach(key => {
        let value = payload[key];
        let config: any = getConfigControlFields(type);
        config = config.find(({ fieldName }: any) => fieldName === key);

        config && config.fieldControls.every(({ errorLabel, regex, correctAnswer }: any) => {
            /* if the key parameter correspond a field that is inside the configuration do the thing, 
                return false will break out of the loop*/
            if (config) {
                /* the key was found inside the configuration, so i will process the error */
                let test = regex.test(value);
                if (test === correctAnswer) {
                    /* if true then its valid */
                    ErrorsObj[key] = null;
                    return true;
                } else {
                    /* if false there is an error */
                    ErrorsObj[key] = errorLabel;
                    return false;
                }
            } else {
                /* the key was not found inside the configuration, so i dont process the error */
                ErrorsObj[key] = null;
                return true;
            }

        });
    });

    return ErrorsObj;
}



/* ERROR REDUCER
if null there is no error for that field,
if is string then there is an error in that label

{
    DatiAzienda:{
        matricolaINPS_error: null,
        codiceFiscale_error: null,
        nomeAzienda_error: null,
        CAP_error: null,
        comune_error: null,
        provincia_error: null,
        dataInizioAttivita_error: null, //    gg/mm/aaaa
        PEC_error: null,
        telefono_error: null,
        recapito_error: null,
        email_error: null
    }
}


*/