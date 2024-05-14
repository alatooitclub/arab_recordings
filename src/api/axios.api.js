import axios from "axios";

export const apiService = axios.create({
    baseURL: 'https://arabrecordingsback-production.up.railway.app//',
    // baseURL: 'http://localhost:8111/',
})


apiService.interceptors.request.use(async config => {
    return config;
}, function (error) {
    return Promise.reject(error);
});

apiService.interceptors.response.use(function (response) {
    return response;
}, function (error) {
    return Promise.reject(error);
});