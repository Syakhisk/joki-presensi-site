import Head from "next/head";
import "@fontsource/montserrat/100.css";
import "@fontsource/montserrat/400.css";
import "@fontsource/montserrat/500.css";
import "@fontsource/montserrat/700.css";
import "@fontsource/montserrat/900.css";
import "@fontsource/nunito-sans";

import { motion } from "framer-motion";
import Link from "next/link";

export default function Layout(props) {
	const {
		pageTitle = "SpaceX Data Showcase",
		title,
		children,
		className = "",
		back = "/",
		noTitle = false,
	} = props;

	return (
		<>
			<Head>
				<title>{pageTitle}</title>
			</Head>

			<main
				{...props}
				className={
					"max-w-6xl mx-auto h-full w-full p-5 py-10" + className
				}>
				{!noTitle && (
					<div className='relative z-10 flex mb-5'>
						<div role='button' className='px-5'>
							<Link href={back}>
								<div className='overflow-hidden'>
									<motion.h1
										initial={{ x: 50 }}
										animate={{ x: 0 }}
										role='button'
										className='w-full h-full font-mono text-5xl'>
										{"<"}
									</motion.h1>
								</div>
							</Link>
						</div>
						<div className='overflow-hidden'>
							<motion.div initial={{ x: -50 }} animate={{ x: 0 }}>
								<h5 className='text-red-500'>SpaceX</h5>
								{title && <h1 className='text-3xl'>{title}</h1>}
							</motion.div>
						</div>
					</div>
				)}
				{children}
			</main>
		</>
	);
}
