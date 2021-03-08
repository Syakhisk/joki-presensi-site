const axios = require("axios");

const http = axios.create({
	baseURL: "http://localhost:3001/v1",
	headers: {
		"Content-type": "application/json",
	},
});

export default async function (req, res) {
	if (req.method === "POST") {
		const apires = await http.post("/kelas", req.body);

		res.status(200).json(apires.data);
	} else {
		res.status(500);
	}
}
