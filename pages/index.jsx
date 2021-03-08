import Tooltip from "react-simple-tooltip";
import Link from "next/link";
import toast, { Toaster } from "react-hot-toast";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import FormGroup from "../components/FormGroup";
import Layout from "../components/Layout";
import today from "../lib/generate-data";
import jsonKelas from "../lib/classes.json";

const Home = (props) => {
	// form values
	const [hari, setHari] = useState(today);
	const [nrp, setNrp] = useState("");
	const [password, setPassword] = useState("");
	const [absen, setAbsen] = useState("");
	const [kelas, setKelas] = useState("");

	const [storedData, setStoredData] = useState("");

	const handleSubmit = async (e) => {
		e.preventDefault();

		console.log(hari, nrp, password, kelas, absen);
	};

	const deleteLocalStorage = () => {
		let promise = new Promise((resolve, reject) => {
			console.log("hapus");
			window.localStorage.removeItem("stored-data");
			setTimeout(() => {
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

	const renderedKelasList = storedData.classes?.map((item, idx) => (
		<option key={idx} value={item.link} className='w-10'>
			{item.title}
		</option>
	));

	useEffect(() => {
		let storedData = window.localStorage.getItem("stored-data");
		if (storedData) {
			console.log("Got the data");
			setStoredData(JSON.parse(storedData));
		}
	}, []);

	return (
		<>
			<Toaster toastOptions={toastStyling} />
			<Layout>
				<div className='relative max-w-xl'>
					<TopBar />
					<div>
						<h1 className='font-mono text-xl text-center'>joki-presensi</h1>
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
								id='password'
								type='password'
								label={<PasswordLabel />}
								required
							/>

							<div className='flex flex-col space-y-5 md:flex-row md:space-y-0 md:space-x-5'>
								<FormGroup
									value={kelas}
									setter={setKelas}
									type='select'
									id='kelas'
									label={<KelasLabel />}
									required
									wrapperClass='w-full md:max-w-none md:w-1/2'>
									{renderedKelasList}
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
								<button type='submit' className='btn-gradient'>
									Absenken!
								</button>
								{storedData ? (
									<HapusDataButton delFn={deleteLocalStorage} />
								) : (
									<AmbilDataButton />
								)}
							</div>
						</form>
					</div>
					<BotBar />
				</div>
			</Layout>
		</>
	);
};

export default Home;

/* ------------------------------ local config ------------------------------ */
const toastStyling = {
	style: { background: "#243042", color: "white" },
};
/* ----------------------------------- --- ---------------------------------- */

/* ---------------------------- local components ---------------------------- */
const TopBar = () => (
	<motion.i
		layout
		layoutId='topBar'
		className='bar w-1/4 h-4 -top-7 -right-9'
	/>
);

const BotBar = () => (
	<motion.i
		layout
		layoutId='botBar'
		className='w-3/5 h-4 bar -bottom-7 -left-9'
	/>
);

const PasswordLabel = () => (
	<div className='flex'>
		<span className='flex-grow'>Password myITS</span>
		<Tooltip
			fadeDuration={500}
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
			<PingingMark />
		</Tooltip>
	</div>
);

const KelasLabel = () => (
	<div className='flex'>
		<span className='flex-grow'>Kelas</span>
		<Tooltip
			fadeDuration={500}
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
			<PingingMark />
		</Tooltip>
	</div>
);

const PingingMark = () => (
	<div className='relative'>
		<span className='circle-sm animate-ping'></span>
		<span className='circle-sm'>?</span>
	</div>
);

const HapusDataButton = ({ delFn }) => (
	<button
		onClick={delFn}
		type='button'
		className='text-sm text-red-500 underline'>
		Hapus data
	</button>
);

const AmbilDataButton = () => (
	<Link href='/kelas'>
		<button type='button' className='text-sm text-yellow-500 underline'>
			Ambil Data Kelas
		</button>
	</Link>
);

/* ----------------------------------- --- ---------------------------------- */
