const FormGroup = (props) => {
	const {
		id,
		value,
		setter,
		label,
		required = true,
		wrapperClass,
		className = "px-1 py-1 bg-gray-800 rounded focus:ring-2 ring-purple-500 outline-none",
		type = "text",
		children,
		...rest
	} = props;

	return (
		<div className={`flex flex-col ${wrapperClass}`}>
			<label htmlFor={id} className='text-sm text-purple-200 mb-1'>
				{label}
			</label>

			{type === "select" ? (
				<select
					className={`appearance-none ${className}`}
					id={id}
					defaultValue={value}
					onChange={(e) => setter(e.target.value)}
					name={id}
					{...rest}>
					{children}
				</select>
			) : (
				<input
					value={value}
					onChange={(e) => setter(e.target.value)}
					required={required}
					className={className}
					type={type}
					name={id}
					id={id}
					{...rest}
				/>
			)}
		</div>
	);
};

export default FormGroup;
