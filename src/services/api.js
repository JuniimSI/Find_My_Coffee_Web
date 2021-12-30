import axios from 'axios';

const Api = axios.create({baseURL: 'https://find-my-coffee.herokuapp.com/api/v1'})

export default Api;