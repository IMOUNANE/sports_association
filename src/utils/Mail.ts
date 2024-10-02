import emailjs from "@emailjs/browser";

export default async function sendMail(data: any) {
	try {
		const email = await emailjs.send(
			process.env.NEXT_PUBLIC_EMAIL_SERVICE_ID ?? "",
			process.env.NEXT_PUBLIC_EMAIL_SERVICE_TEMPLATE_ID ?? "",
			data,
			process.env.NEXT_PUBLIC_EMAIL_PUBLIC_KEY,
		);
		if (email) {
			console.log("email", email);
		}
	} catch (error) {
		console.log("error", error);
	}
}
