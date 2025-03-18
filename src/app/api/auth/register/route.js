import { NextResponse } from 'next/server';
import prisma from '@/libs/prisma'; // Asegúrate de que la ruta es correcta

export async function POST(request) {
    const data = await request.json();

    console.log(data);

    console.log(prisma); // Verifica si prisma está definido
    console.log(prisma.user); // Verifica si prisma.user está definido

    const emailFound = await prisma.USER.findUnique({
        where: {
            email: data.email
        }
    });

    if (emailFound) {
        return NextResponse.json({
            message: 'Email already exists'
        }, {
            status: 400
        });
    }

    const userFound = await prisma.USER.findUnique({
        where: {
            username: data.username
        }
    });

    if (userFound) {
        return NextResponse.json({
            message: 'User already exists'
        }, {
            status: 400
        });
    }

    const newUser = await prisma.USER.create({
        data
    });

    return NextResponse.json(newUser);
}