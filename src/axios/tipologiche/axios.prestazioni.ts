import { getAxios, postAxios } from '../axios.general'
import { get_preFix } from '../../assets/extra/extra';


export function get_All_Prestazioni(urlExtension: string = '', urlPrefix = get_preFix()) {
    return new Promise((res, rej) => {
        let config = {
            method: 'get',
            url: `${process.env.API_HOSTNAME}${urlPrefix}${process.env.API_GET_ALL_PRESTAZIONI}${urlExtension}`,
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

export function post_ADD_Prestazione(data: any = {}, urlExtension: string = '', urlPrefix = get_preFix()) {
    return new Promise((res, rej) => {
        let config = {
            method: 'post',
            url: `${process.env.API_HOSTNAME}${urlPrefix}${process.env.API_POST_ADD_PRESTAZIONE}${urlExtension}`,
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

export function post_Update_Prestazione(data: any = {}, urlExtension: string = '', urlPrefix = get_preFix()) {
    return new Promise((res, rej) => {
        let config = {
            method: 'post',
            url: `${process.env.API_HOSTNAME}${urlPrefix}${process.env.API_POST_UPDATE_PRESTAZIONE}${urlExtension}`,
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

export function post_Delete_Prestazione(data: any = {}, urlExtension: string = '', urlPrefix = get_preFix()) {
    return new Promise((res, rej) => {
        let config = {
            method: 'post',
            url: `${process.env.API_HOSTNAME}${urlPrefix}${process.env.API_POST_DELETE_PRESTAZIONE}${urlExtension}`,
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
