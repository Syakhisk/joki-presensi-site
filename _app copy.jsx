import "../styles/globals.css";
import { AnimateSharedLayout } from "framer-motion";
import { serverUrl, siteUrl } from "./config";
import { useEffect, useState } from "react";
// import isReachable from "is-reachable";

import WebSocket from "isomorphic-ws";
// const ping = async (setter) => {
// 	try {
// 		const res = await fetch(`${serverUrl}`);
// 		if (res.status == 200) {
// 			setter(true);
// 		} else {
// 			throw Error;
// 		}
// 	} catch (error) {
// 		console.log(error);
// 		setter(false);
// 	}
// };

function MyApp({ Component, pageProps }) {
	const [isConnected, setIsConnected] = useState(false);
	useEffect(() => {
		let ws = new WebSocket(`ws://${serverUrl}`);

		ws.onerror = (err) => {
			console.log("Error");
			// console.log(err);
		};
		ws.onclose = (err) => {
			console.log("Close");
			// console.log(err);
		};
	}, []);

	const reconnect = () => {
		console.log("COnnecting");
		setIsConnected(true);
		ws = new WebSocket(`ws://${serverUrl}`);
		ws.onerror = () => {
			setIsConnected(false);
		};
	};

	return (
		// wrapping components in AnimateSharedLayout to enable animation between components
		<>
			<AnimateSharedLayout>
				<Component {...pageProps} isConnected={false} reconnect={reconnect} />
			</AnimateSharedLayout>
		</>
	);
}

export default MyApp;
