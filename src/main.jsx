import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Profile from "./Components/Profile/Profile.jsx";
const router = createBrowserRouter([
	{ path: "/", element: <App /> },
	{ path: "/user/:id", element: <Profile /> },
	{ path: "/user/:id/edit", element: <Profile /> },
]);
createRoot(document.getElementById("root")).render(
	<StrictMode>
		<RouterProvider router={router} />
	</StrictMode>
);
