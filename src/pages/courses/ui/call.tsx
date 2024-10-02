import React, { useState, useEffect } from "react";
import { getCookie } from "cookies-next";
import { toast, Toaster } from "sonner";
import { Checkbox } from "@/components/ui/checkbox";
import type { User } from "@/types/userType";
import type { Course } from "@/types/courseType";
import { Button } from "@/components/ui/button";
export default function Call({ course }: { course: Course | null }) {
	const [subscribers, setSubscribers] = useState([]);
	const [presentStatusMembers, setPresentStatusMembers] = useState([]);
	const [presentStatus, setPresentStatus] = useState(false);
	console.log("course", course);
	const getSubscibers = async () => {
		const res = await fetch("/api/subscribe", {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				authorization: `Bearer ${getCookie("token")}`,
			},
		});
		if (res.status === 500) {
			toast.error("Une erreur s'est produite");
		} else {
			const response = await res.json();
			setSubscribers(response.subscribers);
		}
	};
	const handleCheck = (member: User | undefined) => {
		let cpyPresentStatusMembers = [...presentStatusMembers];

		if (member?.id === undefined) {
			return;
		}
		if (presentStatusMembers.includes(member.id)) {
			cpyPresentStatusMembers = presentStatusMembers.filter(
				(id) => id !== member.id,
			);
		} else {
			cpyPresentStatusMembers.push(member.id);
		}
		setPresentStatusMembers(cpyPresentStatusMembers);
	};

	const postPresent = async () => {
		const res = await fetch("/api/subscribe", {
			method: "PATCH",
			headers: {
				"Content-Type": "application/json",
				authorization: `Bearer ${getCookie("token")}`,
			},
			body: JSON.stringify({
				membersId: presentStatusMembers,
				course_id: Number(window.location.pathname.split("/")[2]),
				course_title: course?.title,
			}),
		});
		const response = await res.json();
		if (response.status === 500) {
			toast.error("Une erreur s'est produite");
			setPresentStatus(response.presentStatus);
		} else {
			toast.success("Appel effectué avec succès");
		}
	};
	const disabled = () => {
		if (presentStatus) {
			return { disabled: true };
		}
	};
	useEffect(() => {
		getSubscibers();
		setPresentStatus(course?.presentStatus);
	}, []);

	return (
		<div className="p-8 w-full flex flex-col">
			<div className="flex justify-between">
				{" "}
				<h1 className="text-2xl font-bold text-gray-800 mb-4">
					Feuille d'appel
				</h1>
				{presentStatus && <u>Appel déja fait</u>}
			</div>

			<table className="min-w-full divide-y divide-gray-200">
				<thead className="bg-gray-50">
					<tr>
						<th
							scope="col"
							className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
						>
							Prénom
						</th>
						<th
							scope="col"
							className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
						>
							Nom
						</th>
						<th
							scope="col"
							className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
						>
							Email
						</th>

						<th
							scope="col"
							className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
						>
							Action
						</th>
					</tr>
				</thead>
				<tbody className="bg-white divide-y divide-gray-200">
					{subscribers.map(({ member }) => (
						<tr key={member?.id}>
							<td className="px-6 py-4 whitespace-nowrap">
								<div className="text-sm font-medium text-gray-900">
									{member?.firstname}
								</div>
							</td>
							<td className="px-6 py-4 whitespace-nowrap">
								<div className="text-sm font-medium text-gray-900">
									{member?.lastname}
								</div>
							</td>
							<td className="px-6 py-4 whitespace-nowrap">
								<div className="text-sm text-gray-500">{member?.email}</div>
							</td>

							<td className="px-6 py-4 whitespace-nowrap">
								<Checkbox
									onClick={() => handleCheck(member)}
									className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
									{...disabled()}
								>
									Appeler
								</Checkbox>
							</td>
						</tr>
					))}
				</tbody>
			</table>
			<div className="flex justify-end w-full mt-5">
				<Button
					className={`${presentStatus && "hidden"}`}
					onClick={postPresent}
				>
					{" "}
					Valider
				</Button>
			</div>
			<Toaster />
		</div>
	);
}
