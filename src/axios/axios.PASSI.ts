var { getAxios, postAxios, putAxios } = require('./axios.general.ts');
import { get_preFix } from '../assets/extra/extra';

/* POST */

/* ADD DOMANDA */
export function post_PassiHearthbeat(data: any, urlExtension: string = '', urlPrefix = get_preFix()) {
    return new Promise((res, rej) => {
        let config = {
            method: 'post',
            url: `${process.env.API_HOSTNAME}${urlPrefix}${process.env.API_AUTORIZE}${urlExtension}`,
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
