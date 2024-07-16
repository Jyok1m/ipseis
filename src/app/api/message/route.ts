const nodemailer = require("nodemailer");

export async function POST(request: Request) {
	try {
		// Parse the request body
		const body = await request.json();
		const { firstName, lastName, budget, email, message } = body;

		const transporter = nodemailer.createTransport({
			service: "Gmail",
			host: "smtp.gmail.com",
			port: 465,
			secure: true,
			auth: {
				user: process.env.NODEMAILER_EMAIL,
				pass: process.env.NODEMAILER_PASSWORD,
			},
		});

		const mailOptions = {
			from: process.env.NODEMAILER_EMAIL, // source email
			to: process.env.NODEMAILER_EMAIL_TO, // destination email
			subject: "Message Ipseis", // Subject line
			text: message, // plain text body
			html: `
						<html lang="fr">
								<head>
										<meta charset="UTF-8" />
										<meta http-equiv="X-UA-Compatible" content="IE=edge" />
										<meta name="viewport" content="width=device-width, initial-scale=1.0" />
										<style>
												body { font-family: Arial, sans-serif; margin: 40px; background-color: #f9f9f9; color: #333; } h1 { font-size: 24px; margin-bottom: 20px; color:
												#2c3e50; border-bottom: 2px solid black; } h2 { font-size: 20px; margin-top: 30px; margin-bottom: 10px; color: #34495e; } ul { list-style-type:
												none; padding-left: 0; } li { padding: 8px 0; } p { background-color: #fff; padding: 20px; border: 1px solid #ddd; border-radius: 5px; }
										</style>
								</head>
								<body>
										<h1>Demande de prise de contact - ${firstName} ${lastName.toUpperCase()}</h1>
										<h2>Informations</h2>
										<ul>
												<li><strong>Nom : </strong>${lastName.toUpperCase()}</li>
												<li><strong>Prénom : </strong>${firstName}</li>
												<li><strong>Email : </strong>${email}</li>
												<li><strong>Budget : </strong>${budget}</li>
										</ul>
										<h2>Message</h2>
										<p>${message}</p>
								</body>
						</html>
						`,
		};

		await transporter.sendMail(mailOptions);

		return new Response(JSON.stringify({ message: "Votre message a été envoyé avec succès. Nous vous répondrons dans les plus brefs délais." }), {
			status: 200,
			headers: {
				"Content-Type": "application/json",
			},
		});
	} catch (error) {
		// Handle any errors that occurred during the request processing
		console.error("Error handling POST request:", error);

		// Return an error response
		return new Response(JSON.stringify({ error: "Failed to process message" }), {
			status: 500,
			headers: {
				"Content-Type": "application/json",
			},
		});
	}
}
