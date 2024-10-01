import {PrismaClient} from '@prisma/client'
import { NextRequest, NextResponse } from 'next/server';
import { authenticateToken } from '@/app/middleware/auth';


const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
    const authResult = authenticateToken(req);
    if (authResult instanceof NextResponse) {
      return authResult;
    }

    try{
        const user = authResult
        const courses = await prisma.courses.findMany({
            where: { owner: user.id },
        })
  
        return NextResponse.json({ message: 'Liste des cours', courses: courses}, { status: 200 });
    }catch{
        return NextResponse.json({ error: 'Connection error' }, { status: 500 });
    }
}

