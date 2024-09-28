import {PrismaClient} from '@prisma/client'
import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
const prisma = new PrismaClient();
export async function POST(req: Request) {
    try{
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
                password: hashedPassword
            }
        })
        return NextResponse.json(newMember, {status: 201})
    }catch{
        return NextResponse.json({ error: 'Failed to create new member' }, { status: 500 });
    }
}
