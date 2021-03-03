import { useEffect, useState } from "react";
import Button from "../components/Button";
import Layout from "../components/Layout";
import spaceX from "../services/spaceX";

export default function Rockets() {
	const [rocketData, setRocketData] = useState("");

	// const handleFetch = async () => {
	// 	const rocket = await spaceX.getAllRockets();
	// 	setRocketData(rocket);
	// };

	const handleFetch = async () => {
		const res = await spaceX.getAllRockets();
		if (res.status === 200) {
			console.log(res.data);
			setRocketData(res.data);
		} else {
			setRocketData("");
		}
	};

	const getOneRocket = async (id) => {
		const res = await spaceX.getRocket(id);
    setRocketData(res.data);
	};

	return (
		<Layout>
			<div className='max-w-6xl mx-auto my-5 p-5'>
				<h5 className='text-red-500'>SpaceX</h5>
				<h1 className='text-3xl'>Rockets 🚀</h1>
			</div>
			<Button onClick={() => handleFetch()}>Fetch!</Button>
			<Button onClick={() => getOneRocket("5e9d0d95eda69955f709d1eb")}>
				One!
			</Button>

			<div>{rocketData && JSON.stringify(rocketData)}</div>
		</Layout>
	);
}
