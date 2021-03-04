import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import PacmanLoader from "react-spinners/PacmanLoader";
import loadingMessages from "../lib/loading-messages";

const Loading = (props) => {
	const randIdx = () => Math.floor(Math.random() * loadingMessages.length);
	const { loading, className } = props;
	const [loadMsg, setLoadMsg] = useState("Loading...");

	useEffect(() => {
		const random = setInterval(() => {
			let idx = randIdx();
			setLoadMsg(loadingMessages[idx]);
		}, 5000);
		return () => {
			clearInterval(random);
		};
	}, []);

	return (
		<AnimatePresence>
			{loading && (
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					className='-m-5 absolute grid place-items-center z-20 w-full h-full bg-gray-900 bg-opacity-90 rounded-xl'>
					<div layout className='overflow-hidden'>
						<div className='flex justify-center -ml-10 h-14'>
							<PacmanLoader size={20} loading={loading} color='#FFFFFF' />
						</div>
						<h6 className='w-full text-xs text-center px-5 animate-pulse'>
							{loadMsg}
						</h6>
					</div>
				</motion.div>
			)}
		</AnimatePresence>
	);
};

export default Loading;
