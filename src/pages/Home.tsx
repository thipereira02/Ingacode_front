import React, { useEffect } from "react";

export default function Home() {
	const user = localStorage.getItem("user");

	useEffect(() => {
		if (!user) {
			window.location.href = "/login";
		}
	}, [user]);

	return (
		<div>
			<h1>Home</h1>
		</div>
	);
}