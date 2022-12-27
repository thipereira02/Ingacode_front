import React, { useState } from "react";
import styled from "styled-components";
import { FaProjectDiagram, FaHome, FaPowerOff, FaChevronLeft, FaChevronRight } from "react-icons/fa";

import symbol from "../assets/logo.png";
import logo from "../assets/tasky.png";

export default function Sidebar() {
	const [sidebar, setSidebar] = useState(true);

	return (
		<>
			<Container onMouseOver={() => setSidebar(false)} onMouseLeave={() => setSidebar(true)} sidebarWidth={sidebar}>
				<Icons sidebarWidth={sidebar}>
					<img src={sidebar ? symbol : logo} alt="Logo Tasky" />
					<Icon sidebarWidth={sidebar} disabled={sidebar}>
						<HomeIcon  sidebarWidth={sidebar}/>
						<p>Home</p>
					</Icon>
					<Icon sidebarWidth={sidebar} disabled={sidebar}>
						<ProjectsIcon sidebarWidth={sidebar} />
						<p>Projetos</p>
					</Icon>
				</Icons>
				<Icon sidebarWidth={sidebar} disabled={sidebar}>
					<LogoutIcon sidebarWidth={sidebar} />
					<p>Logout</p>
				</Icon>
			</Container>
			<Button position={sidebar} onClick={() => setSidebar(!sidebar)}>
				{sidebar ? <FaChevronRight /> : <FaChevronLeft />}
			</Button>
		</>
	);
}

const Container = styled.aside<{ sidebarWidth: boolean }>`
    position: fixed;
    top: 0;
    left: 0;
    width: ${props => props.sidebarWidth ? "50px" : "150px"};
    height: 100vh;
    background: #131315;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    transition: width .2s;

    @media (min-width: 768px) {
        width: ${props => props.sidebarWidth ? "70px" : "250px"};
    }
`;

const Icons = styled.div<{ sidebarWidth: boolean }>`
    display: flex;
    flex-direction: column;
    align-items: center;

    img {
        width: ${props => props.sidebarWidth ? "25px" : "85px"};
        margin: 20px 0 40px 0;
    }

    @media (min-width: 768px) {
        img {
            width: ${props => props.sidebarWidth ? "40px" : "125px"};
        }
    }
`;

const Icon = styled.div<{ sidebarWidth: boolean, disabled: boolean }>`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 30px;
    padding: 15px;
    cursor: ${props => props.sidebarWidth ? "default" : "pointer"};

    p{
        display: ${props => props.sidebarWidth ? "none" : "block"};
        font-size: 16px;
        font-weight: 500;
        margin-left: 10px;
        transition: .2s;
    }

    &:hover{
        background-color: #1F1F1F;
        border-radius: 30px;
    }

    &:disabled{
        cursor: default;
    }

    @media(min-width: 768px) {
        p{
            font-size: 18px;
        }
    }
`;

const HomeIcon = styled(FaHome)<{ sidebarWidth: boolean }>`
    font-size: 25px;
    color: #FFF;

    @media(min-width: 768px){
        font-size: 30px;
    }
`;

const ProjectsIcon = styled(FaProjectDiagram)<{ sidebarWidth: boolean }>`
    font-size: 25px;
    color: #FFF;

    @media(min-width: 768px){
        font-size: 30px;
    }
`;

const LogoutIcon = styled(FaPowerOff)<{ sidebarWidth: boolean }>`
    font-size: 25px;
    color: #FFF;

    @media(min-width: 768px){
        font-size: 30px;
    }
`;

const Button = styled.div<{ position: boolean }>`
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    left: ${props => props.position ? "50px" : "150px"};
    bottom: calc(50vh - 60px);
    width: 20px;
    height: 120px;
    background-color: #131315;
    transition: left .2s;
    cursor: pointer;

    @media(min-width: 768px) {
        left: ${props => props.position ? "70px" : "250px"};
    }

    @media(min-width: 1024px) {
        display: none;
    }
`;