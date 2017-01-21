import axios from 'axios';

export function getAllTours() {
    return axios.get('http://34.197.42.24:5000/search');
}
