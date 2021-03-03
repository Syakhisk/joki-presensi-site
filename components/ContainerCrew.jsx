import Link from "next/link";
import { Duotone } from "./filters";
import { useState } from "react";
import { motion } from "framer-motion";

export default function ContainerCrew(props) {
	const { crew, idx } = props;
	const [isImageHover, setIsImageHover] = useState(false);
	const imgStyle = { filter: isImageHover ? "none" : "url(#duotone)" };

	return (
		<Link href={`crews/${crew.id}`}>
			<motion.div
				{...props}
				key={idx}
				onMouseEnter={() => setIsImageHover(true)}
				onMouseLeave={() => setIsImageHover(false)}>
				<div className='relative flex overflow-hidden h-96 md:h-80 rounded-tl-3xl rounded-br-3xl ring-2 ring-red-500'>
					<Duotone />
					<img
						className='absolute z-0 object-cover object-center w-full h-full'
						style={imgStyle}
						src={crew.image}
						alt=''
					/>
					<div className='absolute w-full h-full bg-gradient-to-t from-gray-900'></div>
					<div className='self-end p-5 font-mono text-xl relative z-auto '>
						<h6 className='text-sm text-red-500'>{crew.agency}</h6>
						<h5 className='text-xl'>{crew.name}</h5>
					</div>
				</div>
			</motion.div>
		</Link>
	);
}
