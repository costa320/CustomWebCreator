import { getAxios, postAxios } from '../axios.general'
import { get_preFix } from '../../assets/extra/extra';


export function get_All_StatiDomanda(urlExtension: string = '', urlPrefix = get_preFix()) {
    return new Promise((res, rej) => {
        let config = {
            method: 'get',
            url: `${process.env.API_HOSTNAME}${urlPrefix}${process.env.API_GET_ALL_STATI_DOMANDA}${urlExtension}`,
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

export function get_Single_StatoDomanda(urlExtension: string = '', urlPrefix = get_preFix()) {
    return new Promise((res, rej) => {
        let config = {
            method: 'get',
            url: `${process.env.API_HOSTNAME}${urlPrefix}${process.env.API_GET_SINGLE_STATO_DOMANDA}${urlExtension}`,
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

export function post_Update_StatoDomanda(data: any = {}, urlExtension: string = '', urlPrefix = get_preFix()) {
    return new Promise((res, rej) => {
        let config = {
            method: 'post',
            url: `${process.env.API_HOSTNAME}${urlPrefix}${process.env.API_POST_UPDATE_STATO_DOMANDA}${urlExtension}`,
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

export function post_ADD_StatoDomanda(data: any = {}, urlExtension: string = '', urlPrefix = get_preFix()) {
    return new Promise((res, rej) => {
        let config = {
            method: 'post',
            url: `${process.env.API_HOSTNAME}${urlPrefix}${process.env.API_POST_ADD_STATO_DOMANDA}${urlExtension}`,
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

export function post_DELETE_StatoDomanda(data: any = {}, urlExtension: string = '', urlPrefix = get_preFix()) {
    return new Promise((res, rej) => {
        let config = {
            method: 'post',
            url: `${process.env.API_HOSTNAME}${urlPrefix}${process.env.API_POST_DELETE_STATO_DOMANDA}${urlExtension}`,
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


