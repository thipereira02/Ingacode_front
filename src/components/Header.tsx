import React, { useContext } from "react";
import styled from "styled-components";

import UserContext from "../contexts/UserContext";

export default function Header({ sidebar, activePage }: { sidebar: boolean, activePage: string }) {
	const user = useContext(UserContext);
	if (activePage === "/") activePage = "Home";

	return (
		<Container left={sidebar}>
			<h1>{activePage}</h1>
			<div>
				{user.userData.userName.substring(0, 1).toUpperCase()}
			</div>
		</Container>
	);
}

const Container = styled.div<{ left: boolean }>`
    position: fixed;
    top: 0;
    right: 0;
    left: ${props => props.left ? "50px" : "150px"};
    max-width: 100vw;
    height: 60px;
    background: #131315;
    transition: left .2s;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 40px;
    box-shadow: 0 0 10px rgba(0, 0, 0, .2);
    font-size: 16px;
    font-weight: 500;
    color: #BFBFBF;

    div{
        width: 40px;
        height: 40px;
        border-radius: 50%;
        background: #1E1782;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 16px;
        font-weight: 700;
        margin-left: 10px;
        color: #BFBFBF;
    }

    @media (min-width: 768px) {
        left: ${props => props.left ? "70px" : "250px"};
        font-size: 18px;
    }
`;