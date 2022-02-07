import axios from 'axios';

const URL = 'http://localhost:5000';

function postSignIn (body) {
  return axios.post(`${URL}/sign-in`, body);
}

function postSignUp (body) {
  return axios.post(`${URL}/sign-up`, body);
}

function getFinancialEvents(config) {
  return axios.get(`${URL}/transactions`, config);
}

function postTransaction (body, config) {
  return axios.post(`${URL}/transactions`, body, config);
}
export {
    postSignIn,
    postSignUp,
    getFinancialEvents,
    postTransaction,
}