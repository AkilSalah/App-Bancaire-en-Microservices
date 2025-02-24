import axios from 'axios';
import { Customer } from '../Models/Customer';

const api = axios.create({
    baseURL : 'http://localhost:8080',
    headers:{
        'Content-Type' : 'application/json'
    }
});
export const customerService = {
    getAllCustomers : async() : Promise<Customer[]> =>{
        const response = await api.get('api/customers');
        return response.data;
    },

    getCustomerById : async(id:number) : Promise<Customer> =>{
        const response = await api.get(`api/customers/${id}`);
        return response.data
    },
    createCustomer : async(data: Omit<Customer, 'id'>) :Promise<Customer> => {
        const response = await api.post(`/api/customers`, data);
        return response.data
    },
    updateCustomer: async (id: number, data: Partial<Customer>): Promise<Customer> => {
        const response = await api.put(`/api/customers/${id}`, data);
        return response.data;
    },
    deleteCustomer : async (id:number) : Promise<void> =>{
        await api.delete(`/api/customers/${id}`);
    }
};
