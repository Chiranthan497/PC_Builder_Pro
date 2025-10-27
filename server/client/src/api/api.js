import axios from 'axios';

const API_BASE_URL = 'http://localhost:5500/api/v1';

console.log('🔌 API Base URL:', API_BASE_URL);

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json'
    },
    timeout: 10000
});

// Add response interceptor for debugging
api.interceptors.response.use(
    response => {
        console.log('✅ API Response:', response.config.url, response.data);
        return response;
    },
    error => {
        console.error('❌ API Error:', {
            url: error.config?.url,
            method: error.config?.method,
            status: error.response?.status,
            message: error.message,
            data: error.response?.data
        });
        return Promise.reject(error);
    }
);

export const componentAPI = {
    getAll: (params) => {
        console.log('📡 Fetching all components with params:', params);
        return api.get('/components', { params });
    },

    getByType: (type) => {
        console.log(`📡 Fetching ${type} components`);
        return api.get(`/components/${type}`);
    },

    getById: (id) => {
        console.log(`📡 Fetching component ${id}`);
        return api.get(`/components/detail/${id}`);
    },

    create: (data) => {
        console.log('📡 Creating component:', data);
        return api.post('/components', data);
    }
};

export default api;
