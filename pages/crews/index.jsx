import Layout from "../../components/Layout";
import ContainerCrew from "../../components/ContainerCrew";
import spaceX from "../../services/spaceX";
import { motion } from "framer-motion";

function Crews(props) {
	const { crews } = props;

	const parentVariant = {
		anim: {
			transition: {
				staggerChildren: 0.1,
			},
		},
	};

	const containerVariant = {
		init: {
			y: 100,
			opacity: 0,
		},
		anim: {
			y: 0,
			scale: 1,
			opacity: 1,
		},
	};

	return (
		<Layout title='Crews 👩‍🚀'>
			<motion.div
				layout
				variants={parentVariant}
				initial='init'
				animate='anim'
				className='grid flex-grow grid-cols-1 gap-12 rounded md:grid-cols-3 xl:grid-cols-5 place-content-center mb-10'>
				{crews.map((crew, idx) => (
					<ContainerCrew crew={crew} idx={idx} variants={containerVariant} />
				))}
			</motion.div>
		</Layout>
	);
}

Crews.getInitialProps = async (ctx) => {
	try {
		const res = await spaceX.getAllCrews();
		return { crews: res.data };
	} catch (error) {
		console.log(error);
		return { error };
	}
};

export default Crews;
