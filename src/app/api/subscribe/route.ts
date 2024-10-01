import {PrismaClient} from '@prisma/client'
import { NextRequest, NextResponse } from 'next/server';
import { authenticateToken } from '@/app/middleware/auth';
const prisma = new PrismaClient();
export async function POST(req: NextRequest) {
    const authResult = authenticateToken(req);
    if (authResult instanceof NextResponse) {
      return authResult;
    }
    try{
        const { member_id, course_id } = await req.json()

        const newSubcription = await prisma.subscribe.create({
            data: {
                member_id, 
                course_id 
            }
        })
       
        return NextResponse.json({message : 'Inscription crée', subscription:  JSON.stringify(newSubcription)} , {status: 200})
    }catch{
        return NextResponse.json({ error: 'Failed to create new member' }, { status: 500 });
    }
}
