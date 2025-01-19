import axios from 'axios';

const API_URL = 'http://localhost:8000';

const api = axios.create({
  baseURL: API_URL,
  timeout: 5000,
});

export const fetchTrees = async () => {
  try {
    const response = await api.get('/trees');
    return response.data;
  } catch (error) {
    console.error('Error fetching trees:', error);
    throw error;
  }
};

export const saveTree = async (tree: any) => {
  try {
    const response = await api.post('/trees', tree);
    return response.data;
  } catch (error) {
    console.error('Error saving tree:', error);
    throw error;
  }
};

export const updateTree = async (id: number, tree: any) => {
  try {
    const response = await api.put(`/trees/${id}`, tree);
    return response.data;
  } catch (error) {
    console.error('Error updating tree:', error);
    throw error;
  }
};

