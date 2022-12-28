/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";

import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Container from "../components/Container";

export default function App({ children }: any) {
	const [sidebar, setSidebar] = useState(true);

	return (
		<>
			<Sidebar sidebar={sidebar} setSidebar={setSidebar} />
			<Header sidebar={sidebar} />
			<Container>
				{children}
			</Container>
		</>
	);
}
