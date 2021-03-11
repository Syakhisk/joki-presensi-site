import { useEffect } from "react";
import auth from "../auth";

const WebSocket = require("isomorphic-ws");
let ws = new WebSocket("ws://localhost:3001");
ws.onerror = (error) => console.log(error);
ws.onclose = (e) => console.log("closed");

export default function WS() {
	return (
		<div>
			<button>Send</button>
		</div>
	);
}

/*
 useEffect(() => {
		try {
			ws.onopen = function open() {};
			ws.send("something");

			ws.onmessage = function incoming(data) {
				console.log(data.data);
			};

			ws.onerror = (err) => {
				console.log(err);
			};
		} catch (error) {
			console.log(error);
		}
	}, []);

	const sendToServer = () => {
		ws.send(JSON.stringify(auth));
		ws.onerror = (err) => {
			console.log(err);
		};
	};
 */
