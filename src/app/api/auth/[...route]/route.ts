import { NextResponse } from 'next/server';

export async function POST(request: Request, { params }: { params: { route: string[] } }) {
    const [route] = params.route;
    const body = await request.json();

    try {
        if (route === 'login') {
            const { email, password } = body;
            const res = await fetch('http://localhost:8000/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
                credentials: 'include',
            });

            const data = await res.json();
            if (!res.ok) {
                return NextResponse.json({ message: data.message || 'Login failed' }, { status: res.status });
            }

            // Extract token from backend response or Set-Cookie header
            const setCookie = res.headers.get('set-cookie');
            const response = NextResponse.json({ message: 'Login successful' });

            if (setCookie) {
                response.headers.set('Set-Cookie', setCookie);
            }

            return response;
        }

        if (route === 'signup') {
            const { name, email, password, confirmPassword } = body;
            const res = await fetch('http://localhost:8000/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, password, confirmPassword }),
                credentials: 'include',
            });

            const data = await res.json();
            if (!res.ok) {
                return NextResponse.json({ message: data.message || 'Signup failed' }, { status: res.status });
            }

            const setCookie = res.headers.get('set-cookie');
            const response = NextResponse.json({ message: 'Signup successful' });

            if (setCookie) {
                response.headers.set('Set-Cookie', setCookie);
            }

            return response;
        }

        return NextResponse.json({ message: 'Invalid route' }, { status: 404 });
    } catch (error) {
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }
}