import PropTypes from "prop-types";
export default function Li({ title, content }) {
	return (
		<li
			className="text-gray-600 dark:text-gray-400 flex justify-between gap-2 w-[80%] p-2
		
		"
		>
			<p>{title}:</p>
			<p className="font-semibold w-[60%] lg:w-[50%]"> {content} </p>
		</li>
	);
}

Li.propTypes = {
	title: PropTypes.string.isRequired,
	content: PropTypes.string.isRequired,
};
