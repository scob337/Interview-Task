import { useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { MdOutlineClose } from "react-icons/md";
import Li from "./Li";
import Input from "./Input";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function Profile() {
	const [isEditing, setIsEditing] = useState(false);
	const [userInfo, setUserInfo] = useState({
		firstName: "John",
		lastName: "Doe",
		email: "john.doe@example.com",
		avatar: "",
	});

	const handleEdit = () => {
		setIsEditing(true);
	};

	const handleSave = () => {
		setIsEditing(false);
	};

	const handleInputChange = (event) => {
		const { name, value } = event.target;
		setUserInfo((prev) => ({ ...prev, [name]: value }));
	};

	const { id } = useParams();

	useEffect(() => {
		const fetchUserData = async () => {
			try {
				const response = await axios.get(`https://reqres.in/api/users/3`);
				setUserInfo({
					firstName: response.data.data.first_name,
					lastName: response.data.data.last_name,
					email: response.data.data.email,
					avatar: response.data.data.avatar,
				});
			} catch (error) {
				console.error("Error fetching user data:", error);
			}
		};
		fetchUserData();
	}, [id]);

	return (
		<div className="flex flex-col items-center justify-center gap-4 ring w-[50%] h-[50vh] mt-5 m-auto p-5">
			<div className="flex flex-col items-center gap-10 w-full h-[200px] ">
				<img
					src={userInfo.avatar || "https://reqres.in/img/faces/8-image.jpg"}
					alt=""
					className="w-24 h-24 rounded-full"
				/>
				<div className="text-xl font-bold flex gap-2 items-center justify-between w-[50%]">
					<span>{`${userInfo.firstName} ${userInfo.lastName}`}</span>
					<span
						className="text-xl cursor-pointer"
						onClick={isEditing ? handleSave : handleEdit}
					>
						{isEditing ? <MdOutlineClose size={36} /> : <FaEdit size={24} />}
					</span>
				</div>
			</div>
			<ul className="flex flex-col gap-5 items-center w-[100%] ">
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
