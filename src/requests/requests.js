import axios from "axios";

const axiosInstance = axios.create({baseURL: 'https://cat-fact.herokuapp.com'})

export const requests = {
    getWord: () => axiosInstance.get("/facts")
}