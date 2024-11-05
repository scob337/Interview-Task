import { useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { MdOutlineClose } from "react-icons/md";
import { GiReturnArrow } from "react-icons/gi";

import Li from "./Li";
import Input from "./Input";
import { Link, useParams, useLocation } from "react-router-dom";
import axiosInstance from "../../Axios";

export default function Profile() {
	const location = useLocation();
	const pathSegments = location.pathname.split("/");
	const isEditMode = pathSegments.includes("edit");

	const [isEditing, setIsEditing] = useState(false);
	const [Loading, setLoading] = useState(false);
	const [Success, setSuccess] = useState(null);
	const [error, setError] = useState(null);
	const [userInfo, setUserInfo] = useState({
		firstName: "",
		lastName: "",
		email: "",
		avatar: "",
	});

	const handleSave = async () => {
		setLoading(true);

		try {
			const response = await axiosInstance.put(`/users/3`, userInfo);
			console.log(response);
			setUserInfo({ ...userInfo, ...response.data.data });
			setLoading(false);
			setSuccess("User data updated successfully!");
			setTimeout(() => setSuccess(null), 2000);
		} catch (error) {
			setError(error.message);
			console.error("Error updating user data:", error);
			setLoading(false);
			setTimeout(() => setError(null), 2000);
		}
		setIsEditing(false);
	};

	const handleInputChange = (event) => {
		const { name, value } = event.target;
		setUserInfo((prev) => ({ ...prev, [name]: value }));
	};

	const { id } = useParams();
	useEffect(() => {
		if (isEditMode) {
			setIsEditing(true);
		}
	}, [isEditMode]);
	useEffect(() => {
		const fetchUserData = async () => {
			try {
				const response = await axiosInstance.get(`/users/${id}`);
				setUserInfo({
					firstName: response.data.data.first_name,
					lastName: response.data.data.last_name,
					email: response.data.data.email,
					avatar: response.data.data.avatar,
				});
				console.log(response.data.data);
			} catch (error) {
				console.error("Error fetching user data:", error);
			}
		};
		fetchUserData();
	}, [id]);

	return (
		<div className="flex flex-col items-center justify-center gap-4 ring w-[95%] md:w-[50%] min-h-[50vh] mt-5 m-auto p-2">
			<div className="text-3xl cursor-pointer w-full">
				<Link to="/" title="Back to Home" onClick={() => setIsEditing(false)}>
					<GiReturnArrow size={36} />
				</Link>
			</div>

			<div className="flex flex-col items-center gap-10 w-[70%] h-[200px] ">
				<img
					src={userInfo.avatar || "https://reqres.in/img/faces/8-image.jpg"}
					alt=""
					className="w-24 h-24 rounded-full"
				/>
				<div className="text-xl font-bold flex gap-2 items-center justify-between w-[100%]">
					<span>{`${userInfo.firstName} ${userInfo.lastName}`}</span>
					<span className="text-xl cursor-pointer">
						{isEditing ? (
							<MdOutlineClose size={36} onClick={() => setIsEditing(false)} />
						) : (
							<FaEdit size={24} onClick={() => setIsEditing(true)} />
						)}
					</span>
				</div>
			</div>
			<div className="flex flex-col gap-5 items-center justify-center w-[100vw] md:w-[70%]  ">
				{error && (
					<span className="bg-red-100 text-red-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-300">
						{error}
					</span>
				)}
				{Success && (
					<span className="bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300">
						{Success}
					</span>
				)}
				{Loading && (
					<span className="bg-blue-100 text-blue-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">
						Loading...
					</span>
				)}
			</div>
			<ul className="flex flex-col gap-5 items-center justify-center w-[100vw] md:w-[70%]  ">
				<Li
					title="First Name"
					content={
						isEditing ? (
							<Input
								value={userInfo.firstName}
								handleInputChange={handleInputChange}
								inputName="firstName"
							/>
						) : (
							userInfo.firstName
						)
					}
				/>
				<Li
					title="Last Name"
					content={
						isEditing ? (
							<Input
								value={userInfo.lastName}
								handleInputChange={handleInputChange}
								inputName="lastName"
							/>
						) : (
							userInfo.lastName
						)
					}
				/>
				<Li
					title="Email"
					content={
						isEditing ? (
							<Input
								value={userInfo.email}
								handleInputChange={handleInputChange}
								inputName="email"
							/>
						) : (
							userInfo.email
						)
					}
				/>
			</ul>
			{isEditing && (
				<div className="flex justify-center gap-5">
					<button
						className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
						onClick={handleSave}
					>
						Save
					</button>
				</div>
			)}
		</div>
	);
}
