import { NextRequest, NextResponse } from "next/server";
import axios from 'axios';

export async function GET(req: NextRequest){
    const token = req.cookies.get('token')?.value;

    if (!token) {
        return NextResponse.json(
            { error: 'Não autorizado: token ausente '},
            { status: 401 }
        );
    }

    try {
        const response = await axios.get(
            `${process.env.NEXT_PUBLIC_API_URL}/users/me`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        return NextResponse.json(response.data);
    } catch {
        return NextResponse.json(
            { error: 'Não autorizado: token inválido ou expirado' },
            { status: 401 }
        );
    }
}