import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

import logo from "../assets/tasky.png";

export default function Login() {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	return (
		<Content>
			<Box>
				<img src={logo} alt="Tasky" />
				<form>
					<div>
						<input 
							type="text"
							value={username}
							onChange={e => setUsername(e.target.value)}
							onInvalid={e => (e.target as HTMLInputElement).setCustomValidity("Please enter a username")}
							onInput={e => (e.target as HTMLInputElement).setCustomValidity("")}
							required
						/>
						<label>Username</label>
					</div>
					<div>
						<input
							type="password"
							value={password}
							onChange={e => setPassword(e.target.value)}
							onInvalid={e => (e.target as HTMLInputElement).setCustomValidity("Please enter a password")}
							onInput={e => (e.target as HTMLInputElement).setCustomValidity("")}
							required
						/>
						<label>Senha</label>                      
					</div>
					<ButtonForm >
						<Submit type="submit">
							<span></span>
							<span></span>
							<span></span>
							<span></span> 
                            Entrar
						</Submit>
						<div>
                            Não tem uma conta?
							<a href="/sign-up">
                                Cadastre-se
							</a>                           
						</div>     
					</ButtonForm>
				</form>
			</Box>
		</Content>
	);
}

const Content = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
`;

const Box = styled.div`
    width: 80%;
    height: 80%;
    box-shadow: 0 12px 15px 0 rgba(0, 0, 0, .24), 0 17px 50px 0 rgba(0, 0, 0, .19);
    background-color: #131315;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 60px 20px;

    img {
        width: 96px;
        margin-bottom: 40px;
    }

    input{
        position: relative;
        width: 100%;
        padding: 10px 0;
        font-size: 16px;
        color: #fff;
        margin-bottom: 30px;
        border: none;
        border-bottom: 1px solid #fff;
        outline: none;
        background: transparent;

        &:focus ~ label, &:valid ~ label{
            top: -85px;
            left: 0;
            font-size: 12px;
            width: 100%;
        }
    }

    label{
        position: relative;
        left: 0;
        top: -60px;
        padding: 10px 0;
        font-size: 16px;
        color: #fff;
        pointer-events: none;
        transition: .5s;
    }
`;

const ButtonForm = styled.div`
    display: flex;
    flex-direction: row;
    margin-top: 20px;

    div{
        font-size: 14px;
        text-decoration: none;
        color: #CBBDDB;
        margin: auto;
        width: 60%;
        text-align: center;
        display: flex;
        flex-direction: column;

        a{
            margin-top: 5px;
            color: #7fda56;
            text-decoration: none;
        }
    }

    @media (min-width: 361px) {
        div{
            margin-left: 10px;
        }
    }
`;

const Submit = styled.button`
    position: relative;
    padding: 12px;
    outline: none;
    border: 1px solid #303030;
    background: #212121;
    color: #7fda56;
    text-transform: uppercase;
    letter-spacing: 2px;
    font-size: 15px;
    overflow: hidden;
    transition: 0.2s;
    cursor: pointer;
    font-weight: 700;

    &:hover{
        box-shadow: 0 0 10px #7fda56, 0 0 25px #1E1782, 0 0 50px #7fda56;
        transition-delay: 0.6s;

        span:nth-child(1){
            left: 100%;
            transition: 0.7s;
        }

        span:nth-child(2) {
            top: 100%;
            transition: 0.7s;
            transition-delay: 0.17s;
        }

        span:nth-child(3){
            right: 100%;
            transition: 0.7s;
            transition-delay: 0.35s;
        }

        span:nth-child(4) {
            bottom: 100%;
            transition: 0.7s;
            transition-delay: 0.52s;
        }  
    }

    span{
        position: absolute;
    }

    span:nth-child(1){
        top: 0;
        left: -100%;
        width: 100%;
        height: 2px;
        background: linear-gradient(90deg, transparent, #7fda56);
    }

    span:nth-child(2){
        top: -100%;
        right: 0;
        width: 2px;
        height: 100%;
        background: linear-gradient(180deg, transparent, #7fda56);
    }

    span:nth-child(3) {
        bottom: 0;
        right: -100%;
        width: 100%;
        height: 2px;
        background: linear-gradient(90deg, transparent, #1E1782);
    }

    span:nth-child(4) {
        bottom: -100%;
        left: 0;
        width: 2px;
        height: 100%;
        background: linear-gradient(360deg, transparent, #1E1782);
    }

    &:active{
        background: #7fda56;
        background: linear-gradient(to top right, #7fda56, #1E1782);
        color: #FFF;
        box-shadow: 0 0 8px #7fda56, 0 0 8px #1E1782, 0 0 8px #7fda56;
        transition: 0.1s;

        span:nth-child(1), span:nth-child(2), span:nth-child(3), span:nth-child(4){
            transition: none;
            transition-delay: none;
        }
    }
`;