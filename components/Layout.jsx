import Head from "next/head";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Layout(props) {
	const { pageTitle = "joki-presensi", children } = props;

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
				<nav className='text-purple-400 w-full flex text-sm'>
					<Link href='/'>
						<span role='button'>
							<span className='text-gray-500 mx-1'>/</span>
							joki-presensi
						</span>
					</Link>
					<a
						href='https://github.com/Syakhisk'
						target='_blank'
						className='text-gray-600 hover:text-gray-100 transition-all select-none'>
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
					className='relative z-10 max-w-xs my-10 p-5 bg-gray-700 bg-opacity-30 md:max-w-xl lg:max-w-none rounded-xl'>
					{children}
				</motion.div>
			</main>
		</>
	);
}
