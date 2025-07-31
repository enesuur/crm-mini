import config from "@/config/index";

const BASE_URL = `/api/${config.API_PREFIX}`;

const ENDPOINTS = {
  auth: {
    register: `${BASE_URL}/register`,
    login: `${BASE_URL}/login`,
    logout: `${BASE_URL}/logout`,
  },
  customer: {
    getCustomers: `${BASE_URL}/customers`,
    postAddCustomer: `${BASE_URL}/customers`,
    deleteCustomerById: (id: string) => `${BASE_URL}/customers/${id}`,
    getCustomerNote: (id: string) => `${BASE_URL}/customers/${id}/note`,
    postCustomerNote: (id: string) => `${BASE_URL}/customers/${id}/note`,
    deleteCustomerNote: (id: string) => `${BASE_URL}/customers/${id}/note}`,
  },
};

Object.freeze(ENDPOINTS);

export default ENDPOINTS;
