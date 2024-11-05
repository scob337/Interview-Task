import axios from "axios";

const axiosInstance = axios.create({
	baseURL: "https://reqres.in/api",
	timeout: 10000,
	headers: {
		"Content-Type": "application/json", // تعيين الهيدر الافتراضي
	},
});

axiosInstance.interceptors.response.use(
	(response) => response,
	(error) => {
		console.error("Axios error:", error);
		return Promise.reject(error);
	}
);

export default axiosInstance;
