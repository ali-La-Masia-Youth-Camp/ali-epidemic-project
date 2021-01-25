import axios, { AxiosRequestConfig } from 'axios';
import { catchException } from './error';

axios.interceptors.request.use(
);

const baseURL = '';

export default class AJAX {

    @catchException(true)
    public async get<T>(url: string, data?: any, config?: AxiosRequestConfig) {
        const mergedConfig = { ...config, params: data};
        return await axios.get<T>( baseURL + url, mergedConfig);
    }

    @catchException(true)
    public async post<T>(url: string, data: any, config?: AxiosRequestConfig) {
        const mergedConfig = { ...config, params: data};
        return await axios.post<T>( baseURL + url, data, mergedConfig);
    }
}
