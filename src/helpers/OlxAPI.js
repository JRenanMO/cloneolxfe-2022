import Cookies from "js-cookie";
import qs from 'qs';
import { json } from "react-router-dom";

const BASEAPI = '';

const apiFetchFile = async(endpoint, body) => {
    if (!body.token) {
        let token = Cookies.get('token');
        if (token) {
            body.append('token', token);
        }
    }
    const res = await fetch(BASEAPI + endpoint, {
        method: 'POST',
        body
    });
    const json = await res.json();
    if (json.notallowed) {
        window.location.href = '/signin'
        return;
    }
    return json;
    //http//meudominio.com/signin isto aqui que vai sair da minha maquina

}

const apiFetchPost = async(endpoint, body) => {
    if (!body.token) {
        let token = Cookies.get('token');
        if (token) {
            body.token = token;
        }
    }
    const res = await fetch(BASEAPI + endpoint, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    });
    const json = await res.json();
    if (json.notallowed) {
        window.location.href = '/signin'
        return;
    }
    return json;
    //http//meudominio.com/signin isto aqui que vai sair da minha maquina

}
// cada coisa que colocar e um significado para somar no back - end
// exemplo https://dashboad.heroku.com -> BASEAPI
// /aut/heroku/callback -> endpoint      &
// code=... ... ... ... ...              ?
//state=.. .. .. ... ... isto e fundamento de rede em protocolo de si.
const apiFetchGet = async(endpoint, body = []) => {
    if (!body.token) {
        let token = Cookies.get('token');
        if (token) {
            body.token = token;
        }
    }
    const res = await fetch(`${BASEAPI + endpoint}?${qs.stringify(body)}`);
    const json = await res.json();
    if (json.notallowed) {
        window.location.href = '/signin'
        return;
    }
    return json;
    //http//meudominio.com/signin isto aqui que vai sair da minha maquina

}

const OlxAPI = {
    login: async (email, password) => {
        const json = await apiFetchPost(
            '/user/signin',
            {
                email,
                password
            }
        );
        return json;
    },

    register: async (name, stateloc, email, password) => {
        const json = await apiFetchPost(
            'user/signup',
            {
                name,
                state: stateloc,
                email,
                password
            }
        );
        return json;
    },

    getStates: async () => {
        const json = await apiFetchGet(
            '/states'
        );
        return json.state;
    },

    getCategories: async () => {
        const json = await apiFetchGet(
            '/categories'
        );
        return json.categories
    },

    getAds: async (options) => {
        const json = await apiFetchGet(
            'ad/list',
            options
        );
        return json;
    },

    getAd: async (id, otherAds = false) => {
        const json = await apiFetchGet(
            '/ad/item',
            { id, otherAds }
        );
        return json;
    },

    addAd: async(fData) => {
        const resp = await apiFetchFile(
            'ad/add',
            fData
        );
        return resp;
    }
    
};

export default () => OlxAPI;