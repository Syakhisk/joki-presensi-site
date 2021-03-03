import { useRouter } from "next/router";
import Layout from "../../components/Layout";
import spaceX from "../../services/spaceX";
import { motion } from "framer-motion";

function SingleRocket(props) {
	const { rocket } = props;
	return (
		<Layout pageTitle={`${rocket.name} - Rocket`} title='Rockets 🚀' back="/rockets">
			<div>
				<motion.h1
					layoutId={`rocketName${rocket.id}`}
					className='text-5xl font-mono font-bold'>
					{rocket.name}
				</motion.h1>
			</div>
		</Layout>
	);
}

SingleRocket.getInitialProps = async ({ query }) => {
	try {
		const id = query.id;
		const res = await spaceX.getRocket(id);
		return { rocket: res.data };
	} catch (error) {
		return { error };
	}
};

export default SingleRocket;
