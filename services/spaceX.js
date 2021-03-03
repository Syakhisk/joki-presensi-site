import axios from "axios";

const http = axios.create({
	baseURL: "https://api.spacexdata.com/v4",
	headers: {
		"Content-type": "application/json",
	},
});

/* -------------------------------- handling -------------------------------- */
// same as:
// const getAllRockets = async () => {
// 	try {
// 		const res = await http.get("/rocket");
// 		return res;
// 	} catch (error) {
// 		console.log(error);
// 		return "";
// 	}
// };

const withHandling = async (f) => {
	try {
		const fReturnVal = await f();
		return fReturnVal;
	} catch (error) {
		console.log(error);
		return "";
	}
};

/* --------------------------------- rocket --------------------------------- */

const getAllRockets = async () =>
	withHandling(async () => {
		const res = await http.get("/rockets");
		return res;
	});
const getRocket = async (id) =>
	withHandling(async () => {
		const res = await http.get(`/rockets/${id}`);
		return res;
	});

/* ---------------------------------- crew ---------------------------------- */
const getAllCrews = async () =>
	withHandling(async () => {
		const res = await http.get("/crew");
		return res;
	});

const getCrew = async (id) =>
	withHandling(async () => {
		const res = await http.get(`/crew/${id}`);
		return res;
	});

export default {
	getAllRockets,
	getRocket,
	getAllCrews,
	getCrew,
};
