import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

export default function Home() {
	const user = localStorage.getItem("user");
	const [sidebar, setSidebar] = useState(true);
	const [activePage, setActivePage] = useState("/");

	useEffect(() => {
		if (!user) {
			window.location.href = "/login";
		}
	}, [user]);

	return (
		<>
			<Sidebar sidebar={sidebar} setSidebar={setSidebar} setActivePage={setActivePage} />
			<Header sidebar={sidebar} activePage={activePage} />
		</>
	);
}