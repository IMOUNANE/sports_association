import {PrismaClient} from '@prisma/client'
import { NextResponse } from 'next/server';
const prisma = new PrismaClient();
export async function GET() {
  try{
    const members = await prisma.members.findMany();
    return NextResponse.json(members, { status: 200 });
  } catch {
    return NextResponse.json({ error: 'Failed to fetch employees' }, { status: 500 });
  }
}

export async function POST(req: Request) {
    try{
        const {firstname, lastname, email} = await req.json()
        
        if(!email || typeof email !== 'string'){
            return NextResponse.json({error: 'Invalid email, must be a string'}, {status: 400})
        }
        const newMember = await prisma.members.create({
            data: {
                firstname,
                lastname,
                email
            }
        })
        return NextResponse.json(newMember, {status: 201})
    }catch{
        return NextResponse.json({ error: 'Failed to create new member' }, { status: 500 });
    }
}
