import { useState, useEffect } from 'react';
import { api } from '../../services/axios';

export interface Product {
  id?: string;
  nome: string;
  avatar: string;
  createdAt?: string;
  marca: string;
  preco: string;
  qt_estoque: number;
  qt_vendas: number;
}

export default function useGetProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.get<Product[]>('/produto');
        setProducts(response.data);
        setLoading(false);
      } catch (err) {
        setError('Erro ao carregar os produtos.');
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return { products, loading, error };
}
