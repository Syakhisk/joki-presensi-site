import Layout from "../components/Layout";
import Link from "next/link";
import FormGroup from "../components/FormGroup";
import { useEffect, useState } from "react";
import today from "../lib/generate-data";
import jsonKelas from "../lib/classes.json";
import Loading from "../components/Loading";
import { motion } from "framer-motion";

const Kelas = (props) => {
	const [nrp, setNrp] = useState("");
	const [password, setPassword] = useState("");
	const [storedData, setStoredData] = useState("");
	const [loading, setLoading] = useState(false);

	const handleSubmit = (e) => {
		e.preventDefault();
		setLoading(true);
		setInterval(() => {
			window.localStorage.setItem("stored-data", JSON.stringify(jsonKelas));
			setStoredData(jsonKelas);
			setLoading(false);
		}, 2000);
	};

	const deleteLocalStorage = () => {
		window.localStorage.removeItem("stored-kelas");
		// setStoredData("");
		// console.log("Done");
	};

	useEffect(() => {
		setLoading(false);
		// let storedData = window.localStorage.getItem("stored-data");
		// if (storedData) {
		// 	setStoredData(JSON.parse(storedData));
		// }
		// console.log(storedData);
		// console.log(JSON.stringify(jsonKelas));
	}, []);

	return (
		<Layout pageTitle='joki-presensi / ambil data kelas'>
			{/* <button onClick={() => setLoading(!loading)}>Toggle Loading</button> */}
			<Loading loading={loading} className='text-white' />
			<div className='relative'>
				<motion.i
					layout
					layoutId='topBar'
					className='absolute w-1/4 h-4 bg-purple-500 rounded-full -top-7 -left-9'></motion.i>
				<div>
					{/* <Link href='/'>
						<button className='text-sm text-purple-400 hover:text-purple-100'>
							{"<"} go bacc
						</button>
					</Link> */}
					<h1 className='text-xl text-center'>joki-presensi</h1>
					<p className='text-xs px-5 text-center'>
						Presensi ITS, versi simple.
					</p>
					<form
						className='p-5 space-y-5 rounded'
						onSubmit={(e) => handleSubmit(e)}>
						<div className='flex flex-col md:flex-row space-y-3 md:space-y-0 md:space-x-3'>
							<FormGroup
								value={nrp}
								setter={setNrp}
								id='username'
								type='text'
								label='NRP'
								required
							/>
							<FormGroup
								value={password}
								setter={setPassword}
								required
								id='password'
								type='password'
								label='Password myITS'
							/>
						</div>

						<div>
							<span className='block text-sm text-purple-200 mb-3'>
								Data dari local storage:
							</span>
							<div className='bg-gray-800 w-full max-h-96 whitespace-nowrap rounded text-sm p-3 overflow-x-auto'>
								{!storedData.kelas ? (
									<h3>Belum ada kelas</h3>
								) : (
									<>
										<ul className='list-decimal list-inside'>
											{storedData.kelas.map((item, idx) => (
												<li key={idx}>{item.title}</li>
											))}
										</ul>
										<br />
										<p>
											Data ini milik <span>{storedData.nrp}</span>
										</p>
									</>
								)}
							</div>
						</div>

						<div className='flex flex-col space-y-3'>
							<button
								type='submit'
								className='px-3 py-3 text-white transition-all bg-purple-500 rounded bg-gradient-to-tl from-red-500 hover:from-purple-500 hover:bg-red-500'>
								Ambil Data
							</button>
							<Link href='/'>
								<button
									type='button'
									className='text-sm text-purple-500 underline'>
									Skuy absen
								</button>
							</Link>
						</div>
					</form>
				</div>
				<motion.i
					layout
					layoutId='botBar'
					className='absolute w-3/5 h-4 bg-purple-500 rounded-full -bottom-7 -right-9'></motion.i>
			</div>
		</Layout>
	);
};

export default Kelas;
