import { NextResponse } from 'next/server';
import axios from 'axios';

export async function GET(request: Request) {
    try {
        // Extract the 'cookie' header from the incoming request
        const cookieHeader = request.headers.get('cookie');

        const response = await axios.get('http://localhost:8000/api/transactions', {
            headers: {
                'Content-Type': 'application/json',
                Cookie: cookieHeader || '',
            },
            withCredentials: true,
        });

        return NextResponse.json(response.data);
    } catch (error: any) {
        console.error('Transaction proxy error:', error);
        return NextResponse.json(
            { message: error.response?.data?.message || 'Failed to fetch transactions' },
            { status: error.response?.status || 500 }
        );
    }
}
