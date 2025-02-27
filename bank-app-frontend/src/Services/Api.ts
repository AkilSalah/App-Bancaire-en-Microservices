import axios from 'axios';
import { Customer } from '../Models/Customer';
import { Account } from '../Models/Account';

const api = axios.create({
    baseURL : 'http://localhost:8080',
    headers:{
        'Content-Type' : 'application/json'
    },
    timeout: 10000 
});
export const customerService = {
    getAllCustomers : async() : Promise<Customer[]> =>{
        const response = await api.get(`api/customers`);
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
export const accountService = {
    getAllAccounts : async() : Promise<Account[]> =>{
        const response = await api.get(`api/accounts`);
        return response.data;
    },
    createAccount : async(data: Omit<Account, 'id'>) :Promise<Account> => {
        const response = await api.post(`/api/accounts`, data);
        return response.data
    },
    updateAccount: async (id: number, data: Partial<Account>): Promise<Account> => {
        const response = await api.put(`/api/accounts/${id}`, data);
        return response.data;
    },
    deleteAccount : async (id:number) : Promise<void> =>{
        await api.delete(`/api/accounts/${id}`);
    }
};

export default api;
