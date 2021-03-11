import Head from "next/head";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Layout(props) {
	const { pageTitle = "joki-presensi", websocket, children } = props;

	const send = () => {
		console.log(websocket);
		try {
			websocket.send("Mamank");
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<>
			<Head>
				<meta property='og:title' content='joki-presensi' />
				<meta property='og:description' content='Presensi ITS, simplified.' />
				<meta property='twitter:title' content='joki-presensi' />
				<meta
					property='twitter:description'
					content='Presensi ITS, simplified.'
				/>
				<title>{pageTitle}</title>
			</Head>

			{!websocket ? (
				<motion.div className='flex justify-center w-full h-12 space-x-3 text-xs bg-red-500 place-items-center'>
					<p>Connection failed to server</p>
					<button
						onClick={() => send()}
						className='px-2 py-1 bg-red-600 rounded hover:bg-red-400'>
						Reconnect
					</button>
				</motion.div>
			) : (
				<motion.div
					layout
					className='w-full py-1 text-xs text-center bg-green-400 overflow-hidden'>
					<span>Status: </span> <span>Connected</span>
				</motion.div>
			)}
			<main className='relative grid w-full p-5 place-items-center'>
				<nav className='flex w-full text-sm text-purple-400'>
					<Link href='/'>
						<span role='button'>
							<span className='mx-1 text-gray-500'>/</span>
							joki-presensi
						</span>
					</Link>
					<a
						href='https://github.com/Syakhisk'
						target='_blank'
						className='text-gray-600 transition-all select-none hover:text-gray-100'>
						by mamank
					</a>
					<div className='flex-grow'></div>
					<Link href='/about'>
						<span role='button'>ini apaan si?</span>
					</Link>
				</nav>
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					layoutId='container'
					layout
					className='relative z-10 max-w-xs p-5 my-10 bg-gray-700 bg-opacity-30 md:max-w-xl lg:max-w-none rounded-xl'>
					{/* <div className='flex justify-center w-full'>
						<div className='w-6 h-2 bg-green-400 rounded-full'></div>
					</div> */}
					{children}
				</motion.div>
			</main>
		</>
	);
}
