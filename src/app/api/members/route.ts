import {PrismaClient} from '@prisma/client'
import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { authenticateToken } from '@/app/middleware/auth';
const prisma = new PrismaClient();
export async function GET(req: NextRequest) {
  const authResult = authenticateToken(req);
  if (authResult instanceof NextResponse) {
    return authResult;
  }
  try{
    const members = await prisma.members.findMany();
    return NextResponse.json({data:members}, { status: 200 });
  } catch {
    return NextResponse.json({ error: 'Failed to fetch employees' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
    const authResult = authenticateToken(req);
    if (authResult instanceof NextResponse) {
      return authResult;
    }
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
