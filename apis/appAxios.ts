import axios from 'axios';

const appAxios = axios.create({
  baseURL: 'http://52.78.115.75/', // 백엔드 서버 URL
  // withCredentials: true,
});

appAxios.defaults.withCredentials = true;

export default appAxios;
