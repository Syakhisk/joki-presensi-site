import { motion } from "framer-motion";
import Layout from "../components/Layout";

function About() {
	const Section = ({ header, children }) => {
		return (
			<section className='text-gray-300'>
				<h2 className='text-gray-500'>{header}</h2>
				{children}
			</section>
		);
	};

	const LinkEl = ({ href, children }) => {
		return (
			<a
				href={href}
				target='_blank'
				rel='noopener noreferrer'
				className='underline'>
				{children}
			</a>
		);
	};

	return (
		<Layout pageTitle='About'>
			<div className='relative max-w-xl'>
				<motion.i
					layout
					layoutId='topBar'
					className='absolute w-4 h-4 bg-purple-500 rounded -top-7 -left-9'></motion.i>
				<h1 className='mb-5 text-2xl'>
					About <code>joki-presensi</code>
				</h1>

				<div className='flex flex-col space-y-10'>
					<Section header='Ini apaan'>
						<p>
							<code>joki-presensi</code> adalah sebuah bot automasi absen untuk{" "}
							<LinkEl href='http://presensi.its.ac.id'>
								presensi.its.ac.id
							</LinkEl>
							. Dibuat karena saya mager absen manual soalnya ribet terlalu
							banyak yang harus di klik.
						</p>
					</Section>
					<Section header='How it works'>
						<p>
							<code>joki-presensi</code> memiliki server yang digunakan untuk
							melakukan{" "}
							<LinkEl href='https://www.dewaweb.com/blog/web-scraping-panduan-dan-teknik-tekniknya/'>
								web-scrapping
							</LinkEl>
							. Teknik scrapping ini digunakan untuk menyimulasikan input yang
							dilakukan oleh user (mengisi form, meng-klik tombol, dsb)
						</p>
					</Section>

					<Section header='Aman gak?'>
						<blockquote
							id='aman'
							className='table p-3 my-2 text-gray-400 bg-gray-700 rounded-xl'>
							"Wah ini scam buat ngumpulin email sama password akun kita"
						</blockquote>
						<p>
							project ini open-source brow, source code nya bisa diliat di
							github eug untuk{" "}
							<LinkEl href='http://github.com/Syakhisk/joki-presensi-api'>
								server
							</LinkEl>{" "}
							dan{" "}
							<LinkEl href='http://github.com/Syakhisk/joki-presensi-site'>
								front-end
							</LinkEl>
							nya. Di project ini juga gak ada database yang dipake buat storing
							apapun kecuali untuk tracking berapa kali kalian pake service ini.
						</p>
					</Section>
					<Section header='Terus data yang kita input gimana?'>
						<p>
							Username dan password langsung digunakan untuk login ke form (gak
							disimpen server), dan kalo ke-save juga itu masuk ke cookies/cache
							browser masing-masing{" "}
							<LinkEl href='https://www.google.com/search?q=clear+cookies+and+cache+browser'>
								(bisa dihapus)
							</LinkEl>
							. Kalo data kelas, disimpen di browser juga pake{" "}
							<LinkEl href='https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage'>
								local storage
							</LinkEl>
						</p>
					</Section>
				</div>
				<motion.i
					layout
					layoutId='botBar'
					className='absolute w-4 h-4 bg-purple-500 rounded -bottom-7 -right-9'></motion.i>
			</div>
		</Layout>
	);
}

export default About;
