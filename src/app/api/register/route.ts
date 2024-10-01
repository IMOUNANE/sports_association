import {PrismaClient} from '@prisma/client'
import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { generateToken } from '@/lib/jwt';
const prisma = new PrismaClient();
export async function POST(req: NextRequest) {
    try{
        let token = null;
        const {firstname, lastname, email, password} = await req.json()

        const hashedPassword = await bcrypt.hash(password, 10);
        if(!email || typeof email !== 'string'){
            return NextResponse.json({error: 'Invalid email, must be a string'}, {status: 400})
        }
       
        const newMember = await prisma.members.create({
            data: {
                firstname,
                lastname,
                email,
                password: hashedPassword,
            }
        })
        const user = await prisma.members.findUnique({
            where: { email: email },
        });
        if(user){
            token = generateToken(user)
        }
       
        return NextResponse.json( {user:  JSON.stringify(newMember), token} , {status: 201})
    }catch{
        return NextResponse.json({ error: 'Failed to create new member' }, { status: 500 });
    }
}
