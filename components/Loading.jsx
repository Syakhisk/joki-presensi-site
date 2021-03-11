import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import PacmanLoader from "react-spinners/PacmanLoader";
import loadingMessages from "../lib/loading-messages";

const Loading = ({ loading, websocket }) => {
	// generate random index
	const randIdx = () => Math.floor(Math.random() * loadingMessages.length);
	const [loadMsg, setLoadMsg] = useState("Loading...");

	const [wsMessage, setWsMessage] = useState("");

	// generate new message every 5 seconds
	// useEffect(() => {
	// 	const random = setInterval(() => {
	// 		let idx = randIdx();
	// 		setLoadMsg(loadingMessages[idx]);
	// 	}, 5000);
	// 	return () => {
	// 		clearInterval(random);
	// 	};
	// }, []);

	// console.log(websocket);
	if (websocket) {
		websocket.onmessage = (msg) => {
			console.log(msg.data);
			setWsMessage(msg.data);
		};
	}

	return (
		<AnimatePresence>
			{loading && (
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					className='absolute z-20 grid w-full h-full -m-5 bg-gray-900 bg-opacity-90 place-items-center rounded-xl'>
					<div layout className='overflow-hidden'>
						<div className='flex justify-center -ml-10 h-14'>
							<PacmanLoader size={20} loading={loading} color='#FFFFFF' />
						</div>
						<h6 className='w-full px-5 text-xs text-center animate-pulse'>
							{JSON.stringify(wsMessage)}
						</h6>
						<h6 className='w-full px-5 text-xs text-center animate-pulse'>
							{loadMsg}
						</h6>
						<h6 className='text-xs text-gray-600 p-3'>
							This loading can take from 15s-30s depending on your internet
						</h6>
					</div>
				</motion.div>
			)}
		</AnimatePresence>
	);
};

export default Loading;
