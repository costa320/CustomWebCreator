import { getAxios, postAxios } from './axios.general'
import { get_preFix } from '../assets/extra/extra';

/* API PADRI */

export function get_All_Autocertificazioni(urlExtension: string = '', urlPrefix = get_preFix()) {
    return new Promise((res, rej) => {
        let config = {
            method: 'get',
            url: `${process.env.API_HOSTNAME}${urlPrefix}${process.env.API_GET_ALL_AUTOCERTIFICAZIONI}${urlExtension}`,
            headers: {}
        }
        getAxios(config).then((result: any) => {
            /* console.log(result); */
            res(result)
        }).catch((error: any) => {
            /* console.log(error); */
            rej(error)
        });
    });
}

export function post_ADD_Autocertificazione(data: any = {}, urlExtension: string = '', urlPrefix = get_preFix()) {
    return new Promise((res, rej) => {
        let config = {
            method: 'post',
            url: `${process.env.API_HOSTNAME}${urlPrefix}${process.env.API_POST_ADD_AUTOCERTIFICAZIONE}${urlExtension}`,
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        }
        postAxios(config).then((result: any) => {
            /* console.log(result); */
            res(result)
        }).catch((error: any) => {
            /* console.log(error); */
            rej(error)
        });
    });
}

export function post_Update_Autocertificazione(data: any = {}, urlExtension: string = '', urlPrefix = get_preFix()) {
    return new Promise((res, rej) => {
        let config = {
            method: 'post',
            url: `${process.env.API_HOSTNAME}${urlPrefix}${process.env.API_POST_UPDATE_AUTOCERTIFICAZIONE}${urlExtension}`,
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        }
        postAxios(config).then((result: any) => {
            /* console.log(result); */
            res(result)
        }).catch((error: any) => {
            /* console.log(error); */
            rej(error)
        });
    });
}

export function post_Delete_Autocertificazione(urlExtension: string = '', urlPrefix = get_preFix()) {
    return new Promise((res, rej) => {
        let config = {
            method: 'post',
            url: `${process.env.API_HOSTNAME}${urlPrefix}${process.env.API_POST_DELETE_AUTOCERTIFICAZIONE}${urlExtension}`,
            headers: {
                'Content-Type': 'application/json'
            }
        }
        postAxios(config).then((result: any) => {
            /* console.log(result); */
            res(result)
        }).catch((error: any) => {
            /* console.log(error); */
            rej(error)
        });
    });
}





/* API FIGLI */


export function get_All_Autocertificazioni_Figli(urlExtension: string = '', urlPrefix = get_preFix()) {
    return new Promise((res, rej) => {
        let config = {
            method: 'get',
            url: `${process.env.API_HOSTNAME}${urlPrefix}${process.env.API_GET_ALL_AUTOCERTIFICAZIONI_FIGLI}${urlExtension}`,
            headers: {}
        }
        getAxios(config).then((result: any) => {
            /* console.log(result); */
            res(result)
        }).catch((error: any) => {
            /* console.log(error); */
            rej(error)
        });
    });
}

export function post_ADD_Autocertificazione_Figlio(data: any = {}, urlExtension: string = '', urlPrefix = get_preFix()) {
    return new Promise((res, rej) => {
        let config = {
            method: 'post',
            url: `${process.env.API_HOSTNAME}${urlPrefix}${process.env.API_POST_ADD_AUTOCERTIFICAZIONE_FIGLIO}${urlExtension}`,
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        }
        postAxios(config).then((result: any) => {
            /* console.log(result); */
            res(result)
        }).catch((error: any) => {
            /* console.log(error); */
            rej(error)
        });
    });
}

export function post_Update_Autocertificazione_Figlio(data: any = {}, urlExtension: string = '', urlPrefix = get_preFix()) {
    return new Promise((res, rej) => {
        let config = {
            method: 'post',
            url: `${process.env.API_HOSTNAME}${urlPrefix}${process.env.API_POST_UPDATE_AUTOCERTIFICAZIONE_FIGLIO}${urlExtension}`,
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        }
        postAxios(config).then((result: any) => {
            /* console.log(result); */
            res(result)
        }).catch((error: any) => {
            /* console.log(error); */
            rej(error)
        });
    });
}

export function post_Delete_Autocertificazione_Figlio(urlExtension: string = '', urlPrefix = get_preFix()) {
    return new Promise((res, rej) => {
        let config = {
            method: 'post',
            url: `${process.env.API_HOSTNAME}${urlPrefix}${process.env.API_POST_DELETE_AUTOCERTIFICAZIONE_FIGLIO}${urlExtension}`,
            headers: {
                'Content-Type': 'application/json'
            },
        }
        postAxios(config).then((result: any) => {
            /* console.log(result); */
            res(result)
        }).catch((error: any) => {
            /* console.log(error); */
            rej(error)
        });
    });
}