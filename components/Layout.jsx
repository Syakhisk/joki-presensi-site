import Head from "next/head";
import Link from "next/link";
import { motion } from "framer-motion";
import { useState } from "react";

export default function Layout(props) {
	const { pageTitle = "joki-presensi", children } = props;
	const [alert, setAlert] = useState(true);

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
				{alert && (
					<div className='flex w-full px-5 items-center py-2 my-3 text-xs bg-gray-700 rounded-full'>
						<p className='flex-grow'>
							Jika loading lama, silahkan klik link{" "}
							<a href='https://jokipresensi-server.herokuapp.com' className='underline'>
								server ini
							</a>{" "}
							untuk mentrigger server.
						</p>
						<button onClick={() => setAlert(false)} className='h-full'>
							<svg
								xmlns='http://www.w3.org/2000/svg'
								fill='none'
								viewBox='0 0 24 24'
								className='h-5'
								stroke='currentColor'>
								<path
									strokeLinecap='round'
									strokeLinejoin='round'
									strokeWidth={2}
									d='M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z'
								/>
							</svg>
						</button>
					</div>
				)}
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					layoutId='container'
					layout
					className='relative z-10 max-w-xs p-5 my-10 bg-gray-700 bg-opacity-30 md:max-w-xl lg:max-w-none rounded-xl'>
					{children}
				</motion.div>
			</main>
		</>
	);
}
