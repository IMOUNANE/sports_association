import React from "react";
import { Button } from "@/components/ui/button";
import type { Course } from "@/types/courseType";
import { getCookie } from "cookies-next";
import { toast } from "sonner";
export default function DetailCourse({
	course,
	displayButton,
	setDisplayButton,
}: {
	course: Course | null;
	displayButton: boolean;
	setDisplayButton: (displayButton: boolean) => void;
}) {
	const user = getCookie("user") ? JSON.parse(getCookie("user")) : null;
	const postSubscription = async () => {
		const res = await fetch("/api/subscribe", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				authorization: `Bearer ${getCookie("token")}`,
			},
			body: JSON.stringify({
				member_id: user.id,
				course_id: Number(window.location.pathname.split("/")[2]),
			}),
		});

		if (res.status === 500) {
			toast.error("Une erreur s'est produite");
		}

		if (res.status === 200) {
			toast.success("Tu t'es inscrit avec succès");
			setDisplayButton(false);
		}
	};
	return (
		<div>
			<h1 className="text-4xl font-bold text-gray-800 mb-4">{course?.title}</h1>
			<p className="text-lg text-gray-700 mb-6">
				{course?.description || "Pas de description disponible pour ce cours."}
			</p>
			<div className="flex items-center justify-between text-gray-600">
				<p>
					<strong>Status :</strong> {course?.status ? "Terminée" : "En cour"}
				</p>
				<p>
					<strong>Date de création : </strong>{" "}
					{new Date(course?.createdAt).toLocaleDateString()}
				</p>
			</div>
			<div className="flex justify-end">
				{displayButton ? (
					<Button onClick={postSubscription}>S'inscrire au cours</Button>
				) : (
					<p> Déjà inscrit</p>
				)}
			</div>
		</div>
	);
}
