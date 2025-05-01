import { NextRequest, NextResponse } from "next/server";
import axios from 'axios';

export async function POST(req: NextRequest) {
    const { email, password } = await req.json();

    try {
        const response = await axios.post(process.env.NEXT_PUBLIC_API_URL + '/auth/login', {
            email,
            password,
        });

        const token = response.data.access_token;

        const nextResponse = NextResponse.json({ message: 'Login bem-sucedido' })

        nextResponse.cookies.set('token', token, {
            httpOnly: true,
            sameSite: 'strict',
            path: '/',
            maxAge: 60 * 60 * 24,
        });

        return nextResponse;
    } catch {
        return NextResponse.json({ error: 'Credenciais inválidas' }, { status: 401 });
    }
}