import axios from 'axios';

const instens = axios.create({
    baseURL: "http://localhost:8000/api/v1/",
    withCredentials: true
})

const useAxiosPublic = () => {
    return instens;
};

export default useAxiosPublic;