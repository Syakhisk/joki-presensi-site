import Layout from "../components/Layout";
import Tooltip from "react-simple-tooltip";
import Link from "next/link";
import FormGroup from "../components/FormGroup";
import toast, { Toaster } from "react-hot-toast";

import { useEffect, useState } from "react";
import today from "../lib/generate-data";
import jsonKelas from "../lib/classes.json";

import { motion } from "framer-motion";

const Home = (props) => {
	const [hari, setHari] = useState(today);
	const [nrp, setNrp] = useState("");
	const [password, setPassword] = useState("");
	const [absen, setAbsen] = useState("");
	const [kelas, setKelas] = useState("");
	const [storedData, setStoredData] = useState("");

	const handleSubmit = (e) => {
		e.preventDefault();

		// console.log(hari, nrp, password, kelas, absen);
	};

	const deleteLocalStorage = () => {
		let promise = new Promise((resolve, reject) => {
			setTimeout(() => {
				window.localStorage.removeItem("stored-data");
				setStoredData("");
				resolve("Data kelas terhapuss");
			}, 500);
		});

		toast.promise(promise, {
			loading: "Waitttt",
			success: (data) => data,
			error: (err) => `This just happened: ${err.toString()}`,
		});
	};

	const setMockData = () => {
		window.localStorage.setItem("stored-data", JSON.stringify(jsonKelas));
	};

	useEffect(() => {
		let storedData = window.localStorage.getItem("stored-data");
		if (storedData) {
			setStoredData(JSON.parse(storedData));
		}
	}, []);

	return (
		<Layout>
			<div className='relative max-w-xl'>
				<motion.i
					layout
					layoutId='topBar'
					className='absolute w-1/4 h-4 bg-purple-500 rounded-full -top-7 -right-9'></motion.i>
				<div>
					<Toaster
						toastOptions={{
							style: { background: "#243042", color: "white" },
						}}
					/>
					<h1 className='text-xl text-center font-mono'>joki-presensi</h1>
					<p className='px-5 text-xs text-center'>
						Presensi ITS, versi simple.
					</p>
					<form
						className='p-5 space-y-5 rounded'
						onSubmit={(e) => handleSubmit(e)}>
						<FormGroup
							value={hari}
							setter={setHari}
							id='tanggal'
							type='text'
							label='Hari Ini'
							readOnly
							required
						/>
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
							label={
								<div className='flex'>
									<span className='flex-grow'>Password myITS</span>
									<Tooltip
										fadeDuration={500}
										className='bg-red-500'
										content={
											<div className='text-xs whitespace-nowrap'>
												<>
													<span>Password is not stored, </span>
													<Link href='/about#data' className='underline'>
														<span role='button' className='underline'>
															learn more
														</span>
													</Link>
												</>
											</div>
										}>
										<div className='relative'>
											<span className='absolute right-0 w-5 h-5 border border-purple-400 rounded-full animate-ping'></span>
											<span className='absolute right-0 w-5 h-5 text-xs text-center border-2 border-purple-400 rounded-full'>
												?
											</span>
										</div>
									</Tooltip>
								</div>
							}
						/>
						<div className='flex flex-col space-y-5 md:flex-row md:space-y-0 md:space-x-5'>
							<FormGroup
								value={kelas}
								setter={setKelas}
								type='select'
								label={
									<div className='flex'>
										<span className='flex-grow'>Kelas</span>
										<Tooltip
											fadeDuration={500}
											className='bg-red-500'
											content={
												<div className='text-xs whitespace-nowrap'>
													<>
														<Link href='/kelas' className='underline'>
															<span role='button' className='underline'>
																Ambil data kelas
															</span>
														</Link>
														<span> dulu gan kalo kosong</span>
													</>
												</div>
											}>
											<div className='relative'>
												<span className='absolute right-0 w-5 h-5 border border-purple-400 rounded-full animate-ping'></span>
												<span className='absolute right-0 w-5 h-5 text-xs text-center border-2 border-purple-400 rounded-full'>
													?
												</span>
											</div>
										</Tooltip>
									</div>
								}
								required
								id='kelas'
								value=''
								wrapperClass='w-full md:max-w-none md:w-1/2'>
								{storedData
									? storedData.kelas.map((item, idx) => (
											<option key={idx} value={item.link} className='w-10'>
												{item.title}
											</option>
									  ))
									: ""}
							</FormGroup>
							<FormGroup
								value={absen}
								setter={setAbsen}
								id='absen'
								required
								minLength='6'
								label='Kode Absen'
								wrapperClass='w-full md:w-1/2'
							/>
						</div>

						<div className='flex flex-col space-y-3'>
							<button
								type='submit'
								className='px-3 py-3 text-white transition-all bg-purple-500 rounded bg-gradient-to-tl from-red-500 hover:from-purple-500 hover:bg-red-500'>
								Absenken!
							</button>
							{storedData ? (
								<button
									onClick={() => deleteLocalStorage()}
									type='button'
									className='text-sm text-red-500 underline'>
									Hapus data
								</button>
							) : (
								<Link href='/kelas'>
									<button
										type='button'
										className='text-sm text-yellow-500 underline'>
										Ambil Data Kelas
									</button>
								</Link>
							)}
						</div>
					</form>
				</div>
				<motion.i
					layout
					layoutId='botBar'
					className='absolute w-3/5 h-4 bg-purple-500 rounded-full -bottom-7 -left-9'></motion.i>
			</div>
		</Layout>
	);
};

Home.getInitialProps = () => {
	return { asd: "" };
};

export default Home;
