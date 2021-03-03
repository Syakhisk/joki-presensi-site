import { useEffect, useState } from "react";
import Button from "../components/Button";
import Layout from "../components/Layout";
import spaceX from "../services/spaceX";
import axios from "axios";
import fetch from "isomorphic-unfetch";

const Rockets = (props) => {
	console.log(props.data);

	return (
		<Layout>
			<div className='max-w-6xl mx-auto my-5 p-5'>
				<h5 className='text-red-500'>SpaceX</h5>
				<h1 className='text-3xl'>Rockets 🚀</h1>
			</div>
		</Layout>
	);
};

// Rockets.getInitalProps = async (ctx) => {
// 	const res = await spaceX.getAllRockets();
// 	console.log("res", res);
// 	return { res: res };
// };
Rockets.getInitalProps = async () => {
	// try {
	// 	Rockets.getInitalProps = async (ctx) => {
	// 		// const res = await spaceX.getAllRockets();
	// 		return { rockets: "mamank" };
	// 	};
	// } catch (error) {
	// 	return { error };
	// }

	return {
		data: "mamank",
	};
};

export default Rockets;
