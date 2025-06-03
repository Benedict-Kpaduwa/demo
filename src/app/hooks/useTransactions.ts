import { useState, useCallback } from 'react';
import axios from 'axios';
import { Transaction } from '@/types/transaction';

interface Summary {
    totalBalance: number;
    totalUsers: number;
}

const apiClient = axios.create({
    baseURL: '/api',
    withCredentials: true,
});

export const useTransactions = () => {
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [summary, setSummary] = useState<Summary | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchTransactions = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await apiClient.get('/transactions');
            setTransactions(response.data.transactions || []);
        } catch (err: any) {
            console.error('Fetch transactions error:', err);
            setError(err.response?.data?.message || 'Failed to fetch transactions');
        } finally {
            setIsLoading(false);
        }
    }, []);

    const fetchSummary = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await apiClient.get('/summary');
            setSummary(response.data);
        } catch (err: any) {
            console.error('Fetch summary error:', err);
            setError(err.response?.data?.message || 'Failed to fetch summary');
        } finally {
            setIsLoading(false);
        }
    }, []);

    const addTransaction = useCallback((newTransaction: Transaction) => {
        setTransactions((prev) => [newTransaction, ...prev].slice(0, 100));
    }, []);

    return {
        transactions,
        summary,
        fetchTransactions,
        fetchSummary,
        addTransaction,
        isLoading,
        error,
    };
};
