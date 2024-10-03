import React from "react";
import type { Course } from "@/types/courseType";
import { useRouter } from "next/router";

export default function CoursesList({
	className = "",
	courses,
}: { className?: string; courses: Course[] }) {
	const router = useRouter();
	return (
		<div
			className={`max-w-4xl p-6 bg-gray-50 rounded-lg shadow-md ${className}`}
		>
			<h1 className="text-3xl font-semibold text-center mb-6">Cour crée</h1>
			<ul className="space-y-4">
				{courses?.map((course) => (
					<li
						key={course.id}
						className="bg-white p-4 cursor-pointer rounded-lg shadow hover:shadow-lg transition-shadow duration-300"
						onClick={() => {
							router.push(`/courses/${course.id}`);
						}}
						onKeyDown={(e) => {
							if (e.key === "Enter" || e.key === " ") {
								router.push(`/courses/${course.id}`);
							}
						}}
					>
						<div className="flex flex-col sm:flex-row sm:items-center justify-between">
							<h2 className="text-xl font-medium">{course.title}</h2>
							<p className="text-gray-500">{course.description}</p>
						</div>
					</li>
				))}
			</ul>
		</div>
	);
}
