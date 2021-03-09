import axios from "axios";
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
			const apires = await http.post("/presensi", req.body);
			res.status(200).json(apires.data);
		} catch (error) {
			console.log(error.response.data);
			res.status(error.response.status).json(error.response.data);
		}
	} else {
		res.status(400).json({ msg: "BAD REQUEST" });
	}
}

// export default async function (req, res) {
// 	if (req.method === "POST") {
// 		const { body } = req;
// 		const { username, password, selectedClass } = body;
// 		try {
// 			// response from the server
// 			// const response = await http.post("/presensi", body);

// 			res.status(200).json(body);
// 			// console.log(response);
// 		} catch (err) {
// 			console.log(err);
// 			// console.log("nrp:", username, err);
// 			res.status(400).send("BAD REQUEST!!");
// 		}
// 	} else {
// 		res.status(400).send("BAD REQUEST");
// 	}
// }
