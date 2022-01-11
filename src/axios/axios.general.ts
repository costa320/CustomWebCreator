var axios = require('axios');

export function getAxios(config: get_config) {
    return new Promise((res, reg) => {
        axios(config)
            .then(function (response: any) {
                console.log(JSON.stringify(response.data));
                return res(response.data);
            })
            .catch(function (error: any) {
                console.log(error);
                reg(error)
            });
    });
}

export function getAxiosFull(config: get_config) {
    return new Promise((res, reg) => {
        axios(config)
            .then(function (response: any) {
                console.log(JSON.stringify(response));
                return res(response);
            })
            .catch(function (error: any) {
                console.log(error);
                reg(error)
            });
    });
}

export function postAxios(config: get_config) {
    return new Promise((res, reg) => {
        axios(config)
            .then(function (response: any) {
                console.log(JSON.stringify(response.data));
                return res(response.data);
            })
            .catch(function (error: any) {
                console.log(error);
                reg(error)
            });
    });
}

export function putAxios(config: get_config) {
    return new Promise((res, reg) => {
        axios(config)
            .then(function (response: any) {
                console.log(JSON.stringify(response.data));
                return res(response.data);
            })
            .catch(function (error: any) {
                console.log(error);
                reg(error)
            });
    });
}

interface get_config {
    method: string,     //  get, post, put...
    url: string,    //  url
    headers: Object     //  object headers
}
