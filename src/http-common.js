import axios from 'axios';

const token = localStorage.getItem('token');

export default axios.create({
    baseURL: "https://otorongo.herokuapp.com/",
    headers: {
        "Content-type": "application/json",
    }
})

axios.defaults.headers.common['Authorization'] = token;
