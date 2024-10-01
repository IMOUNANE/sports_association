import { authenticateToken } from "@/app/middleware/auth";
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const authResult = authenticateToken(req);
    if (authResult instanceof NextResponse) {
      return authResult;
    }

    try{
        const user = authResult
       
        const availableCourses = await prisma.courses.findMany({
            where: {
                NOT: {
                    owner: user.id
                }
            }
        });
        return NextResponse.json({ message: 'Liste des cours auquel tu peux postulé',  availableCourses}, { status: 200 });
    }catch{
        return NextResponse.json({ error: 'Connection error' }, { status: 500 });
    }
}