import { motion } from "framer-motion";
import { useState } from "react";
import Layout from "../../components/Layout";
import RocketContainer from "../../components/RocketContainer";
import spaceX from "../../services/spaceX";

export default function Rockets({ rockets }) {
	const [activeImage, setActiveImage] = useState("");
	const [imageOpacity, setImageOpacity] = useState("opacity-10");

	const handleBgChange = (img) => {
		if (img) {
			setTimeout(() => {
				setImageOpacity("opacity-10");
				setActiveImage(img);
			}, 200);
		} else {
			setImageOpacity("opacity-0");
		}
	};

	return (
		<Layout title='Rockets 🚀' pageTitle='SpaceX - Rockets 🚀'>
			<div className='fixed top-0 right-0 z-0 w-screen h-screen'>
				{activeImage && (
					<img
						className={`object-cover w-full h-full backdrop-blur transition-opacity duration-300 ${imageOpacity}`}
						// className={`object-cover w-full h-full backdrop-blur transition-opacity ${
						// 	activeImage ? "opacity-10" : "opacity-0"
						// }`}
						src={activeImage}
					/>
				)}
			</div>

			<motion.div>
				<div className='grid grid-cols-1 gap-12 lg:grid-cols-2'>
					{rockets.map((item, idx) => (
						<RocketContainer
							handleBgChange={handleBgChange}
							item={item}
							idx={idx}
						/>
					))}
				</div>
			</motion.div>
		</Layout>
	);
}

Rockets.getInitialProps = async () => {
	try {
		const res = await spaceX.getAllRockets();
		return { rockets: res.data };
	} catch (error) {
		return { error };
	}
};
