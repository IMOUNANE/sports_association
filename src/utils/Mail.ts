import emailjs from "@emailjs/browser";

export default async function sendMail(data: any) {
	console.log(
		"params",
		process.env.EMAIL_SERVICE_ID ?? "",
		process.env.EMAIL_SERVICE_TEMPLATE_ID ?? "",
		process.env.EMAIL_PUBLIC_KEY,
	);
	try {
		const email = await emailjs.send(
			process.env.EMAIL_SERVICE_ID ?? "",
			process.env.EMAIL_SERVICE_TEMPLATE_ID ?? "",
			data,
			process.env.EMAIL_PUBLIC_KEY,
		);
		if (email) {
			console.log("data", data);
			console.log("result", email);
		}
	} catch (error) {
		console.log("error", error);
	}
}
