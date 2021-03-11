import "../styles/globals.css";
import { AnimateSharedLayout } from "framer-motion";
import { serverUrl, siteUrl } from "../config";
import { useEffect, useState } from "react";

import WebSocket from "isomorphic-ws";
function MyApp({ Component, pageProps }) {
	const [wsInstance, setWsInstance] = useState(null);

	let timeout = 250;

	const connect = () => {
		let ws = new WebSocket("ws://localhost:3001");
		let connectInterval = 0;

		// websocket onopen event listener
		ws.onopen = () => {
			console.log("Connection to websocket is successful");
			timeout = 250;
			setWsInstance(ws);
			// that.timeout = 250; // reset timer to 250 on open of websocket connection
			// clearTimeout(connectInterval); // clear Interval on on open of websocket connection
		};

		// websocket onclose event listener
		ws.onclose = (e) => {
			console.log(
				`Socket is closed. Reconnect will be attempted in ${Math.min(
					10000 / 1000,
					(timeout + timeout) / 1000
				)} second.`,
				e.reason
			);

			timeout = timeout + timeout;
			connectInterval = setTimeout(check, Math.min(10000, timeout));
		};

		// websocket onerror event listener
		ws.onerror = (err) => {
			console.error(
				"Socket encountered error: ",
				err.message,
				"Closing socket"
			);
			ws.close();
			setWsInstance(null);
		};
	};

	const check = () => {
		//check if websocket instance is closed, if so call `connect` function.
		console.log("Checking");
		if (!wsInstance || wsInstance.readyState == WebSocket.CLOSED) connect();
	};

	useEffect(() => {
		// console.log(connect());
		connect();
		// console.log(wsInstance);
	}, []);

	return (
		// wrapping components in AnimateSharedLayout to enable animation between components
		<>
			<AnimateSharedLayout>
				<Component {...pageProps} websocket={wsInstance} />
			</AnimateSharedLayout>
		</>
	);
}

export default MyApp;
