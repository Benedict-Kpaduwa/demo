import { useEffect, useState } from 'react';
import { Transaction } from '@/types/transaction';

export const useWebSocket = (onNewTransaction: (transaction: Transaction) => void) => {
    const [socket, setSocket] = useState<WebSocket | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        // Extract ws-token from cookies
        // In your WebSocket hook, try using the same token as your API calls
        const token = document.cookie
            .split('; ')
            .find(row => row.startsWith('token=')) // Not ws-token
            ?.split('=')[1];
        const wsUrl = token
            ? `ws://localhost:8000/transactions?token=${encodeURIComponent(token)}`
            : 'ws://localhost:8000/transactions'; // Fallback for testing

        const ws = new WebSocket(wsUrl);

        ws.onopen = () => {
            console.log('WebSocket connected');
            setError(null);
        };

        ws.onmessage = (event) => {
            try {
                const newTransaction: Transaction = JSON.parse(event.data);
                onNewTransaction(newTransaction);
            } catch (err) {
                console.error('WebSocket message parse error:', err);
                setError('Invalid transaction data');
            }
        };

        ws.onerror = () => {
            console.error('WebSocket error');
            setError('WebSocket connection failed');
        };

        ws.onclose = (event) => {
            console.log(`WebSocket disconnected: code ${event.code}, reason ${event.reason}`);
            setSocket(null);
            setError(event.code === 1008 ? 'Unauthorized: Invalid or missing token' : null);
        };

        setSocket(ws);

        return () => {
            ws.close();
        };
    }, [onNewTransaction]);

    return { socket, error };
};