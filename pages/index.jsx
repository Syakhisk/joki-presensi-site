import Button from "../components/Button";
import Layout from "../components/Layout";
import Link from "next/link";
import { motion, useAnimation } from "framer-motion";

const Home = (props) => {
	const pages = [
		{ href: "/rockets", icon: "🚀", text: "Rockets" },
		{ href: "/crews", icon: "👩‍🚀", text: "Crews" },
		{ href: "/launchpads", icon: "➖", text: "Launchpads" },
	];

	const landingItems = useAnimation();
	const parent = {
		anim: {
			transition: {
				staggerChildren: 0.3,
			},
		},
	};

	const parent2 = {
		anim: {
			transition: {
				staggerChildren: 0.1,
				delayChildren: 1.3,
			},
		},
	};

	const scaleUp = {
		init: {
			scale: 0.5,
			opacity: 0,
		},
		anim: {
			scale: 1,
			opacity: 1,
		},
	};

	const landingItemsInit = {
		scale: 0.5,
		opacity: 0,
		marginTop: -150,
	};
	const landingItemsAnim = {
		scale: 1,
		opacity: 1,
		marginTop: 20,
		transition: {
			delay: 0.5,
		},
	};

	return (
		<Layout noTitle>
			<motion.div
				variants={parent}
				initial='init'
				animate='anim'
				className='flex flex-col items-center justify-center w-full h-full space-y-5'>
				<div>
					<motion.h1
						layoutId='spaceX'
						variants={scaleUp}
						className='text-4xl text-center text-red-500'>
						SpaceX
					</motion.h1>
					<motion.h2
						variants={scaleUp}
						onAnimationComplete={() => landingItems.start(landingItemsAnim)}
						className='text-center '>
						Data showcase
					</motion.h2>
				</div>

				<motion.div initial={landingItemsInit} animate={landingItems}>
					<motion.div
						variants={parent2}
						initial='init'
						animate='anim'
						className='text-center grid grid-cols-2 gap-5'>
						{pages.map((item, idx) => (
							<Link href={item.href}>
								<motion.div
									key={idx}
									variants={scaleUp}
									className='flex flex-col border p-5 rounded-3xl space-y-3 font-mono text-gray-300 hover:bg-red-500 select-none hover:text-white'>
									<h1 className='text-4xl'>{item.icon}</h1>
									<h1 className='text-2xl text-center w-full'>{item.text}</h1>
								</motion.div>
							</Link>
						))}
					</motion.div>
				</motion.div>
			</motion.div>
		</Layout>
	);
};

Home.getInitialProps = () => {
	return { asd: "" };
};

export default Home;
