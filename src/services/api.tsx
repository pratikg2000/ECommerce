import axios from 'axios';

export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating?: {
    rate: number;
    count: number;
  };
}

const API = axios.create({
  baseURL: 'https://fakestoreapi.com',
});

export const fetchProducts = async (): Promise<Product[]> => {
  try {
    const res = await API.get<Product[]>('/products');
    return res.data;
  } catch (error) {
    throw error;
  }
};
