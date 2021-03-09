import Tooltip from "react-simple-tooltip";
import Link from "next/link";
import toast, { Toaster } from "react-hot-toast";
import { useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";

import FormGroup from "../components/FormGroup";
import Layout from "../components/Layout";
import today from "../lib/generate-date";
import jsonKelas from "../lib/classes.json";
import getErrorType from "../lib/get-error-status";
import Loading from "../components/Loading";

const Home = (props) => {
	// form values
	const [date, setDate] = useState(today);
	const [nrp, setNrp] = useState("");
	const [password, setPassword] = useState("");
	const [code, setCode] = useState("");
	const [classs, setClasss] = useState("");

	const [storedData, setStoredData] = useState("");
	const [loading, setLoading] = useState(false);

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);

		// console.log(date, nrp, password, classs, code);
		const body = {
			nrp,
			password,
			code,
			date,
			selectedClass: classs,
		};

		const res = await fetch("/api/presensi", {
			method: "POST",
			body: JSON.stringify(body),
			headers: { "Content-Type": "application/json" },
		});

		const data = await res.json();
		setLoading(false);

		const errType = getErrorType(res.status);
		if (errType == 2) {
			const toastId = toast.success(
				<div className='flex'>
					<span>{data.msg}</span>
					<DismissToast id={toastId} />
				</div>,
				{ duration: 999999 }
			);
		} else {
			const toastId = toast.error(
				<div className='flex'>
					<span>{data.msg}</span>
					<DismissToast id={toastId} />
				</div>,
				{ duration: 999999 }
			);
		}

		// if(data.)

		// console.log(data);

		// window.localStorage.setItem("stored-data", JSON.stringify(data));
		// setStoredData(data);
		// setLoading(false);
	};

	const deleteLocalStorage = () => {
		let promise = new Promise((resolve, reject) => {
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
		<option key={idx} value={item.link}>
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

	useEffect(() => {}, [loading]);

	return (
		<>
			<Toaster toastOptions={toastStyling} />
			<Layout>
				<Loading loading={loading} className='text-white' />
				<div className='relative max-w-xl'>
					<TopBar />
					<div>
						<h1 className='font-mono text-xl text-center'>joki-presensi</h1>
						<p className='px-5 text-xs text-center'>
							Presensi ITS, simplified.
						</p>

						<form
							className='p-5 space-y-5 rounded'
							onSubmit={(e) => handleSubmit(e)}>
							<FormGroup
								value={date}
								setter={setDate}
								id='date'
								type='text'
								label='Hari Ini'
								readOnly
								required
							/>
							<FormGroup
								value={nrp}
								setter={setNrp}
								id='nrp'
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
									value={classs}
									setter={setClasss}
									type='select'
									id='class'
									name='selectedClass'
									label={<KelasLabel />}
									required
									wrapperClass='w-full md:max-w-none md:w-1/2'>
									<option value='' key={999}>
										Pilih Kelas
									</option>
									{renderedKelasList}
								</FormGroup>
								<FormGroup
									value={code}
									setter={setCode}
									id='code'
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
	style: { background: "rgba(51, 65, 85)", color: "white" },
};
/* ----------------------------------- --- ---------------------------------- */

/* ---------------------------- local components ---------------------------- */
const TopBar = ({ loadingControl }) => (
	<motion.i
		// animate={loadingControl}
		layout
		layoutId='topBar'
		// className='w-1/4 h-4 bar -top-7 '
		className='w-1/4 h-4 bar -top-7 -right-9'
	/>
);

const BotBar = ({ loadingControl }) => (
	<motion.i
		// animate={loadingControl}
		layout
		layoutId='botBar'
		// className='w-3/5 h-4 bar -bottom-7 '
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

const DismissToast = ({ id }) => (
	<button
		className='ml-10 grid w-5 h-5 rounded-full font-bold text-xs text-gray-500 place-items-center'
		onClick={() => toast.dismiss(id)}>
		<svg
			xmlns='http://www.w3.org/2000/svg'
			fill='none'
			viewBox='0 0 24 24'
			stroke='currentColor'>
			<path
				strokeLinecap='round'
				strokeLinejoin='round'
				strokeWidth={2}
				d='M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z'
			/>
		</svg>
	</button>
);

/* ----------------------------------- --- ---------------------------------- */
