import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import FormGroup from "../components/FormGroup";
import Loading from "../components/Loading";
import Layout from "../components/Layout";
import getErrorType from "../lib/get-error-status";
import jsonKelas from "../lib/classes.json";
import today from "../lib/generate-date";
import { Toaster, toast } from "react-hot-toast";

const toastStyling = {
	style: { background: "rgba(51, 65, 85)", color: "white" },
};

const Kelas = (props) => {
	const [nrp, setNrp] = useState("");
	const [password, setPassword] = useState("");
	const [storedData, setStoredData] = useState("");
	const [loading, setLoading] = useState(false);

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);

		const body = {
			nrp,
			password,
		};

		const res = await fetch("/api/kelas", {
			method: "POST",
			body: JSON.stringify(body),
			headers: { "Content-Type": "application/json" },
		});

		const data = await res.json();

		const errType = getErrorType(res.status);
		if (errType == 2) {
			const toastId = toast.success(
				<div className='flex'>
					<span>Data berhasil diambil 🆖🆎</span>
					<DismissToast id={toastId} />
				</div>,
				{ duration: 999999 }
			);
		} else {
			const toastId = toast.error(
				<div className='flex'>
					<div className='flex flex-col'>
						<span>Data gagal diambil 😢</span>
						<div class='text-xs'>Error: {data.msg}</div>
					</div>
					<DismissToast id={toastId} />
				</div>,
				{ duration: 999999 }
			);
		}

		window.localStorage.setItem("stored-data", JSON.stringify(data));
		setStoredData(data);
		setLoading(false);
	};

	const deleteLocalStorage = () => {
		window.localStorage.removeItem("stored-data");
		// setStoredData("");
		// console.log("Done");
	};

	useEffect(() => {
		let storedData = window.localStorage.getItem("stored-data");
		if (storedData) {
			setStoredData(JSON.parse(storedData));
		}
		// console.log(storedData);
		// console.log(JSON.stringify(jsonKelas));
	}, []);

	return (
		<>
			<Toaster toastOptions={toastStyling} />

			<Layout pageTitle='joki-presensi / ambil data kelas'>
				{/* <button onClick={() => setLoading(!loading)}>Toggle Loading</button> */}
				<Loading loading={loading} className='text-white' />
				<div className='relative'>
					<TopBar />
					<>
						<h1 className='text-xl text-center'>joki-presensi</h1>
						<p className='px-5 text-xs text-center'>
							Presensi ITS, versi simple.
						</p>
						<form
							className='p-5 space-y-5 rounded'
							onSubmit={(e) => handleSubmit(e)}>
							<div className='flex flex-col space-y-3 md:flex-row md:space-y-0 md:space-x-3'>
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
								<span className='block mb-3 text-sm text-purple-200'>
									Data dari local storage:
								</span>
								<div className='w-full p-3 overflow-x-auto text-sm bg-gray-800 rounded max-h-96 whitespace-nowrap'>
									{!storedData.classes ? (
										<h3>Belum ada kelas</h3>
									) : (
										<KelasList storedData={storedData} />
									)}
								</div>
							</div>
							<div className='flex flex-col space-y-3'>
								<button type='submit' className='btn-gradient'>
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
					</>
					<BotBar />
				</div>
			</Layout>
		</>
	);
};

export default Kelas;

/* ---------------------------- local components ---------------------------- */

const TopBar = () => (
	<motion.i
		// layout
		layoutId='topBar'
		className='bar w-1/4 h-4 -top-7 -left-9'
	/>
);

const BotBar = () => (
	<motion.i
		// layout
		layoutId='botBar'
		className='bar w-3/5 h-4 -bottom-7 -right-9'
	/>
);

const KelasList = ({ storedData }) => (
	<>
		<ul className='list-decimal list-inside'>
			{storedData.classes.map((item, idx) => (
				<li key={idx}>{item.title}</li>
			))}
		</ul>
		<br />
		<p>
			Data ini milik <span>{storedData.name}</span>
		</p>
	</>
);

const DismissToast = ({ id }) => (
	<button
		className='ml-10 grid h-full rounded-full font-bold text-xs text-gray-500 place-items-center'
		onClick={() => toast.dismiss(id)}>
		<svg
			xmlns='http://www.w3.org/2000/svg'
			fill='none'
			viewBox='0 0 24 24'
			className='h-5'
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
