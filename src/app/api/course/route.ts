import { authenticateToken } from "@/app/middleware/auth";
import prisma from "@/lib/prisma";
import { type NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
	const authResult = authenticateToken(req);
	if (authResult instanceof NextResponse) {
		return authResult;
	}

	try {
		let course = null;
		const { searchParams } = new URL(req.url);
		const id = searchParams.get("id");

		if (!id) {
			return NextResponse.json(
				{ error: "ID manquant dans la requête" },
				{ status: 400 },
			);
		}
		course = await prisma.courses.findMany({
			where: { id: Number(id) },
		});
		const userSubscription = await prisma.subscribe.findMany({
			where: { course_id: course[0].id },
			select: { member: true },
		});
		return NextResponse.json(
			{ message: "Cour", course: course, userSubscription: userSubscription },
			{ status: 200 },
		);
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
		const { title, owner, description, location } = await req.json();
		const newCourse = await prisma.courses.create({
			data: {
				title,
				owner,
				description,
				location,
			},
		});
		return NextResponse.json(
			{ message: "Cour crée", course: newCourse },
			{ status: 201 },
		);
	} catch (e) {
		console.log("error", e);
		return NextResponse.json({ error: "Connection error" }, { status: 500 });
	}
}

export async function PATCH(req: NextRequest) {
	const authResult = authenticateToken(req);
	if (authResult instanceof NextResponse) {
		return authResult;
	}
	try {
		const { id, status } = await req.json();
		const course = await prisma.courses.findUnique({
			where: { id: id },
		});
		if (!course) {
			return NextResponse.json({ error: "Cours non trouvé" });
		}
		const updateCourse = await prisma.courses.update({
			where: { id: id },
			data: {
				status,
			},
		});
		return NextResponse.json({
			message: "Cour mise à jour",
			course: JSON.stringify(updateCourse),
		});
	} catch {
		return NextResponse.json({ error: "Connection error" }, { status: 500 });
	}
}
