import axios from "axios";

export const apiService = axios.create({
    baseURL: 'https://localhost:8081/',
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