import React from "react";
import type { User } from "@/types/userType";

export default function MembersList({
	className,
	members,
}: { className: string; members: User[] }) {
	return (
		<div
			className={`max-w-4xl p-6 bg-gray-50 rounded-lg shadow-md ${className}`}
		>
			<h1 className="text-3xl font-semibold text-center mb-6">
				Liste des membres
			</h1>
			<ul className="space-y-4">
				{members?.map((member) => (
					<li
						key={member.email}
						className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition-shadow duration-300"
					>
						<div className="flex flex-col sm:flex-row sm:items-center justify-between">
							<h2 className="text-xl font-medium">
								{member.firstname} {member.lastname}
							</h2>
							<p className="text-gray-500">{member.email}</p>
						</div>
					</li>
				))}
			</ul>
		</div>
	);
}
