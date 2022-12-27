import React, { useEffect } from "react";
import Header from "../components/Sidebar";

export default function Home() {
	const user = localStorage.getItem("user");

	useEffect(() => {
		if (!user) {
			window.location.href = "/login";
		}
	}, [user]);

	return (
		<Header />
	);
}