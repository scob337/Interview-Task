import PropTypes from "prop-types";

export default function Pagination({ page, setPage, totalPages }) {
	const handleNextPage = () => {
		if (page < totalPages) {
			setPage(page + 1);
		}
	};

	const handlePreviousPage = () => {
		if (page > 1) {
			setPage(page - 1);
		}
	};

	return (
		<div className="flex justify-between items-center mt-4 gap-3">
			<button
				onClick={handlePreviousPage}
				disabled={page === 1}
				className="px-4 py-2 bg-green-500 text-white rounded disabled:bg-gray-300"
			>
				Previous
			</button>

			<span className="text-sm text-gray-500 dark:text-gray-400">
				Page {page} of {totalPages}
			</span>

			<button
				onClick={handleNextPage}
				disabled={page === totalPages}
				className="px-4 py-2 bg-green-500 text-white rounded disabled:bg-gray-300"
			>
				Next
			</button>
		</div>
	);
}

Pagination.propTypes = {
	page: PropTypes.number.isRequired,
	setPage: PropTypes.func.isRequired,
	totalPages: PropTypes.number.isRequired,
};
