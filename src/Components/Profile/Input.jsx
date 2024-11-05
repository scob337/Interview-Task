import PropTypes from "prop-types";

export default function Input({ value, handleInputChange, inputName }) {
	return (
		<input
			autoFocus
			type="text"
			name={inputName}
			value={value}
			onChange={handleInputChange}
			className="border border-gray-300 rounded p-1"
		/>
	);
}
Input.propTypes = {
	value: PropTypes.string.isRequired,
	handleInputChange: PropTypes.func.isRequired,
	inputName: PropTypes.string.isRequired,
};
