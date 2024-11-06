import { useState, useEffect } from "react";
import Pagination from "./Pagination";
import { thData } from "./thData";
import { Link } from "react-router-dom";
import axiosInstance from "../../Axios";
import { Helmet } from "react-helmet";
export default function Tables() {
	const [data, setData] = useState([]);
	const [filteredData, setFilteredData] = useState([]);
	const [page, setPage] = useState(1);
	const [totalPages, setTotalPages] = useState(1);
	const [searchQuery, setSearchQuery] = useState("");

	const fetchData = async (page) => {
		try {
			const response = await axiosInstance.get(`/users`, {
				params: { page },
			});
			setData(response.data.data);
			setFilteredData(response.data.data);
			setTotalPages(response.data.total_pages);
		} catch (error) {
			console.error("Error fetching data:", error);
		}
	};

	useEffect(() => {
		fetchData(page);
	}, [page]);

	const handleSearch = (event) => {
		const query = event.target.value.toLowerCase();
		setSearchQuery(query);

		const filtered = data.filter(
			(user) =>
				user.first_name.toLowerCase().includes(query) ||
				user.last_name.toLowerCase().includes(query)
		);
		setFilteredData(filtered);
	};

	return (
		<div className="relative overflow-x-scroll shadow-md sm:rounded-lg flex flex-col justify-center items-center gap-3 p-2 min-h-[100vh] ">
			<Helmet>
				<title>Home Page</title>
			</Helmet>
			<input
				type="text"
				placeholder="Search by First or Last Name"
				value={searchQuery}
				onChange={handleSearch}
				className="px-4 py-2 border border-gray-300 rounded mb-4 w-[100%] lg:w-1/2"
			/>

			<div className="h-[70%] w-[90%]">
				<table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
					<thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
						<tr>
							{thData.map((th, idx) => (
								<th key={idx} scope="col" className="px-6 py-3">
									{th}
								</th>
							))}
						</tr>
					</thead>
					<tbody className="h-[40vh]">
						{filteredData.length > 0 ? (
							filteredData.map((user) => (
								<tr
									key={user.id}
									className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700
									h-[50px]  "
								>
									<td className=" font-medium text-gray-900 whitespace-nowrap dark:text-white px-5 py-1">
										{user.id}
									</td>
									<td className="px-5 py-1 ">{user.first_name}</td>
									<td className="px-5 py-1 ">{user.last_name}</td>
									<td className="px-5 py-1 ">{user.email}</td>
									<td className="px-5 py-1 ">
										<img
											src={user.avatar}
											alt={user.first_name}
											className="w-10 h-10 rounded-full"
										/>
									</td>
									<td className="px-6 py-4 flex gap-2">
										<Link
											to={`/user/${user.id}/edit`}
											className="ring-1 ring-green-500 hover:bg-green-500 hover:text-white transition-all px-2"
										>
											Edit
										</Link>
										<Link
											to={`/user/${user.id}`}
											className="ring-1 ring-black hover:bg-black hover:text-white transition-all px-2"
										>
											View
										</Link>
									</td>
								</tr>
							))
						) : (
							<tr>
								<td colSpan={thData.length} className="text-center py-4">
									No Data Found
								</td>
							</tr>
						)}
					</tbody>
				</table>
			</div>

			<Pagination page={page} setPage={setPage} totalPages={totalPages} />
		</div>
	);
}
