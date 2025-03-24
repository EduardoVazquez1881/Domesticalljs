import { NextResponse } from 'next/server';
import prisma from '@/libs/prisma'; // Asegúrate de que la ruta es correcta
import bcrypt from 'bcrypt'

export async function POST(request) {
    try
    {
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

        // Encripta la contraseña y almacena el hash 
        const hashPassword = await bcrypt.hash(data.password, 10)

        // Se crea el usuario en la base de datos y se almacena en la variable newUser
        const newUser = await prisma.USER.create({
            data: {
                username: data.username,
                email: data.email,
                password: hashPassword
            }
        });

        // Almacena los datos en user y excluye la contraseña para no mostrarla en la consola de la web
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const {password:_, ...user} = newUser;

        // Envia los datos de user a la web
        return NextResponse.json(user);
    }
    catch(error)
    {
        return NextResponse.json({
            message: error.message
        }), {
            status: 500
        }
    }
}