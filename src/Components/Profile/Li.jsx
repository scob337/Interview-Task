import PropTypes from "prop-types";
export default function Li({ title, content }) {
	return (
		<li className="text-gray-600 dark:text-gray-400 flex justify-between gap-2 w-[50%]">
			<span>{title}:</span>
			<span className="font-semibold"> {content} </span>
		</li>
	);
}

Li.propTypes = {
	title: PropTypes.string.isRequired,
	content: PropTypes.string.isRequired,
};
