import React, { useEffect, useState } from "react";
import type { Course } from "@/types/courseType";
import { getCookie } from "cookies-next";
import { toast } from "sonner";
import DetailCourse from "../ui/detailCourse";
import Call from "../ui/Call";
export default function CourseDetail() {
	const user = getCookie("user") ? JSON.parse(getCookie("user")) : null;

	const [course, setCourse] = useState<Course | null>(null);
	const [displayButton, setDisplayButton] = useState(false);
	const getCourse = async () => {
		const res = await fetch(
			`/api/course?id=${window.location.pathname.split("/")[2]}`,
			{
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					authorization: `Bearer ${getCookie("token")}`,
				},
			},
		);
		if (res.status === 500) {
			toast.error("Une erreur s'est produite");
		} else {
			const response = await res.json();
			console.log("response", response);
			setDisplayButton(
				response.userSubscription?.length === 0 &&
					response.course?.[0]?.owner !== user?.id,
			);
			setCourse(response.course?.[0]);
		}
	};

	useEffect(() => {
		getCourse();
		setDisplayButton(course?.owner !== user?.id);
	}, []);
	return (
		<main className="flex flex-col gap-5">
			<div className="w-full mx-auto bg-white p-6 rounded-lg shadow-md mt-10 gap-5 flex flex-col">
				<DetailCourse
					course={course}
					displayButton={displayButton}
					setDisplayButton={setDisplayButton}
				/>
			</div>
			{course?.owner === user?.id && (
				<div className="w-full mx-auto bg-white p-6 rounded-lg shadow-md">
					<Call course={course} />
				</div>
			)}
		</main>
	);
}
