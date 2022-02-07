import axios from 'axios';

const URL = 'http://localhost:5000';

function postSignIn(body) {
    return axios.post(`${URL}/sign-in`, body);
}

export {
    postSignIn,
}