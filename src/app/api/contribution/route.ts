import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { authenticateToken } from "@/app/middleware/auth";

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
	const authResult = authenticateToken(req);
	if (authResult instanceof NextResponse) {
		return authResult;
	}
	try {
		const user = await prisma.members.findUnique({
			where: { id: authResult.id },
		});
		if (!user) {
			return NextResponse.json({ error: "Utilisateur non trouvé" });
		}

		return NextResponse.json({
			message: "Contribution de l'utilisateur",
			contribution: user?.contribution
				? JSON.stringify(user?.contribution)
				: null,
		});
	} catch {
		return NextResponse.json({ error: "Connection error" }, { status: 500 });
	}
}

export async function POST(req: NextRequest) {
	const authResult = authenticateToken(req);
	if (authResult instanceof NextResponse) {
		return authResult;
	}
	try {
		const { id, contribution } = await req.json();

		const user = await prisma.members.findUnique({
			where: { id: id },
		});
		if (!user) {
			return NextResponse.json({ error: "Utilisateur non trouvé" });
		}
		const updatedUser = await prisma.members.update({
			where: { id: id },
			data: { contribution },
		});
		return NextResponse.json({
			message: "Contribution crée",
			user: JSON.stringify(updatedUser),
		});
	} catch {
		return NextResponse.json({ error: "Connection error" }, { status: 500 });
	}
}
