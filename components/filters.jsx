export function Duotone() {
	return (
		<svg className='absolute'>
			<filter
				id='duotone'
				x='-10%'
				y='-10%'
				width='120%'
				height='120%'
				filterUnits='objectBoundingBox'
				primitiveUnits='userSpaceOnUse'
				color-interpolation-filters='sRGB'>
				<feColorMatrix
					type='matrix'
					values='.33 .33 .33 0 0
            .33 .33 .33 0 0
            .33 .33 .33 0 0
            0 0 0 1 0'
					in='SourceGraphic'
					result='colormatrix'
				/>
				<feComponentTransfer in='colormatrix' result='componentTransfer'>
					<feFuncR type='table' tableValues='0 0.94' />
					<feFuncG type='table' tableValues='0.24 0.29' />
					<feFuncB type='table' tableValues='0.34 0.42' />
					<feFuncA type='table' tableValues='0 1' />
				</feComponentTransfer>
				<feBlend
					mode='normal'
					in='componentTransfer'
					in2='SourceGraphic'
					result='blend'
				/>
			</filter>
		</svg>
	);
}
