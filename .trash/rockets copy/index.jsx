import cntl from "cntl";
import { useState } from "react";
import Layout from "../../components/Layout";
import RocketContainer from "../../components/RocketContainer";
import spaceX from "../../services/spaceX";
import { motion } from "framer-motion";

const Rockets = ({ rockets }) => {
	const [activeImage, setActiveImage] = useState("");

	const hoverBg = cntl`
  fixed
  top-0 right-0 z-0
  w-screen h-screen
  gradient-to-b
  from-gray-900
  `;

	return (
		<Layout title='Rockets 🚀'>
			<div className={hoverBg}>
				{activeImage && (
					<img
						className='object-cover w-full h-full opacity-10 backdrop-blur'
						src={activeImage}
					/>
				)}
			</div>
			<motion.div
				layout
				transition={{ ease: "easeIn" }}
				className='relative flex flex-col h-full space-y-5'>
				<div className='grid flex-grow grid-cols-1 gap-12 rounded lg:grid-cols-2 place-content-center'>
					{rockets.map((item, idx) => (
						<RocketContainer
							setActiveImage={setActiveImage}
							item={item}
							idx={idx}
						/>
					))}
				</div>
			</motion.div>
		</Layout>
	);
};

Rockets.getInitialProps = async () => {
	try {
		const res = await spaceX.getAllRockets();
		return { rockets: res.data };
	} catch (error) {
		return { error };
	}
};

export default Rockets;
