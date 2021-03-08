import axios from "axios";
import prisma from "../../lib/prisma";

const http = axios.create({
	baseURL: "http://localhost:3001/v1",
	headers: {
		"Content-type": "application/json",
	},
});

export default async function (req, res) {
	if (req.method === "POST") {
		const { body } = req;
		const { username, name } = body;
		try {
			// database untuk storing user usage
			const prismaResponse = await prisma.users.upsert({
				where: { nrp: username },
				update: { usage: { increment: 1 } },
				create: {
					nrp: username,
					usage: 1,
					name: name,
				},
			});

			// response from the server
			const response = await http.post("/presensi", body);

			res.status(200).send("OK");
			// console.log(response);
		} catch (err) {
			console.log(err);
			// console.log("nrp:", username, err);
			res.status(400).send("BAD REQUEST!!");
		}
	} else {
		res.status(400).send("BAD REQUEST");
	}
}
