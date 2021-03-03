import cntl from "cntl";

export default function Button(props) {
	const {
		children,
		color = "bg-purple-600",
		className = "",
		text = "text-white",
		full = false,
	} = props;

	const btnClass = cntl`
  px-10
  py-1
  rounded
	hover:bg-opacity-80
	transition-all
	${full ? "w-full" : ""}
  ${className}
  ${color}
  ${text}
  `;

	return (
		<button {...props} className={btnClass}>
			{children}
		</button>
	);
}
