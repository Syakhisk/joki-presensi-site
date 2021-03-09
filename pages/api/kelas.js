const axios = require("axios");

import { serverUrl } from "../../config";

const http = axios.create({
	baseURL: `${serverUrl}/v1`,
	headers: {
		"Content-type": "application/json",
	},
});

export default async function (req, res) {
	if (req.method === "POST") {
		try {
			const apires = await http.post("/kelas", req.body);
			console.log(apires)
			res.status(200).json(apires.data);
		} catch (error) {
			console.log(error);
			res.status(400).json({ msg: error.response.data });
		}
	} else {
		res.status(400).json({ msg: "BAD REQUEST" });
	}
}
