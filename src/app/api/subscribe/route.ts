import { PrismaClient } from "@prisma/client";
import { type NextRequest, NextResponse } from "next/server";
import { authenticateToken } from "@/app/middleware/auth";
import sendMail from "@/utils/Mail";
const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
	const authResult = authenticateToken(req);
	if (authResult instanceof NextResponse) {
		return authResult;
	}
	try {
		const subscribers = await prisma.subscribe.findMany({
			where: { member_id: authResult.id },
			skip: 0,
			select: {
				member: {
					select: {
						id: true,
						firstname: true,
						lastname: true,
						email: true,
					},
				},
			},
		});

		return NextResponse.json(
			{
				message: "Voici la liste des inscriptions à ce cours",
				subscribers: subscribers,
			},
			{ status: 200 },
		);
	} catch {
		return NextResponse.json(
			{ error: "Failed to get new subscriber" },
			{ status: 500 },
		);
	}
}
export async function POST(req: NextRequest) {
	const authResult = authenticateToken(req);
	if (authResult instanceof NextResponse) {
		return authResult;
	}
	try {
		const { member_id, course_id } = await req.json();

		const newSubcription = await prisma.subscribe.create({
			data: {
				member_id,
				course_id,
			},
		});

		return NextResponse.json(
			{
				message: "Inscription crée",
				subscription: JSON.stringify(newSubcription),
			},
			{ status: 200 },
		);
	} catch {
		return NextResponse.json(
			{ error: "Failed to create new link" },
			{ status: 500 },
		);
	}
}

export async function PATCH(req: NextRequest) {
	const authResult = authenticateToken(req);
	if (authResult instanceof NextResponse) {
		return authResult;
	}
	try {
		let updatePresentStatus = null;
		const request = await req.json();
		const result = await prisma.subscribe.updateMany({
			where: {
				member_id: {
					in: request.membersId,
				},
			},
			data: {
				present: true,
			},
		});

		if (result.count > 0) {
			updatePresentStatus = await prisma.courses.update({
				where: { id: request.course_id },
				data: {
					presentStatus: true,
				},
			});
			const users = await prisma.members.findMany({
				where: {
					id: {
						in: request.membersId,
					},
				},
				select: {
					firstname: true,
					lastname: true,
					email: true,
				},
			});
			users.map((user) => {
				console.log("request.course_id", request);
				const dataToSend = { ...user, course: request.course_title };
				sendMail(dataToSend);
			});
		}

		return NextResponse.json(
			{
				message: "Présence mise à jour",
				subscription: result,
				presentStatus: updatePresentStatus,
			},
			{ status: 200 },
		);
	} catch {
		return NextResponse.json(
			{ error: "Failed to update link" },
			{ status: 500 },
		);
	}
}
