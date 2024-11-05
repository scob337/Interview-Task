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
		<div className="flex justify-center items-center mt-4 gap-3">
			<button
				onClick={handlePreviousPage}
				disabled={page === 1}
				className="px-4 py-2 bg-green-500 text-white rounded disabled:bg-gray-300"
			>
				Previous
			</button>

			<div className="flex gap-2">
				{Array.from({ length: totalPages }, (_, index) => index + 1).map(
					(pageNumber) => (
						<button
							key={pageNumber}
							onClick={() => setPage(pageNumber)}
							className={`px-3 py-1 rounded ${
								pageNumber === page
									? "bg-green-500 text-white"
									: "bg-gray-200 text-gray-700"
							}`}
						>
							{pageNumber}
						</button>
					)
				)}
			</div>

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
