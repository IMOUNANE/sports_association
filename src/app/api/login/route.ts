import {PrismaClient} from '@prisma/client'
import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { generateToken } from '@/lib/jwt';


const prisma = new PrismaClient();

export async function POST(req: Request, ) {
    try{
        const { email, password } = await req.json()
        
        const user = await prisma.members.findUnique({
            where: { email: email },
        });
        if (!user) {
            return  NextResponse.json({ error: 'Utilisateur non trouvé' });
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return NextResponse.json({ error: 'Mot de passe incorrect' });
        }
        const token = generateToken(user)
          
        return NextResponse.json({ message: 'Connexion réussie', token, user: JSON.stringify({id: user.id, email: user.email, firstname: user.firstname, lastname: user.lastname, contribution: user.contribution}) });
    }catch{
        return NextResponse.json({ error: 'Connection error' }, { status: 500 });
    }
}