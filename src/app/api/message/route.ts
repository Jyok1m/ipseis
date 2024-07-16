export async function POST(request: Request) {
	try {
		// Parse the request body
		const body = await request.json();
		const { firstName, lastName, budget, website, message } = body;

		// Return a success response
		return new Response(JSON.stringify({ message: "Message envoyé !" }), {
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
