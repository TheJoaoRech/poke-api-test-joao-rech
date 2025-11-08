const API_BASE_URL = 'http://localhost:3001/api';

const api = {
    getList: async (limit = 20, offset = 0) => {
        try {
            const url = `${API_BASE_URL}/pokemon?limit=${limit}&offset=${offset}`;
            const response = await fetch(url, {
                headers: {
                    'Cache-Control': 'no-cache',
                    'Pragma': 'no-cache'
                }
            });
            if (!response.ok && response.status !== 304) throw new Error(`HTTP ${response.status}`);

            if (response.status === 304) {
                return [];
            }

            const data = await response.json();
            return data;
        } catch (error) {
            throw error;
        }
    },

    getByName: async (name) => {
        try {
            const response = await fetch(`${API_BASE_URL}/pokemon/name/${name}`);
            if (!response.ok) throw new Error('Pokemon not found');
            return await response.json();
        } catch (error) {
            throw error;
        }
    },

    getById: async (id) => {
        try {
            const response = await fetch(`${API_BASE_URL}/pokemon/id/${id}`);
            if (!response.ok) throw new Error('Pokemon not found');
            return await response.json();
        } catch (error) {
            throw error;
        }
    },
};
