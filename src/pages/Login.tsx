import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { toast } from "react-toastify";

import logo from "../assets/tasky.png";
import { Input, Label, ButtonForm, Submit } from "../layouts/Common";
import { login, signUp } from "../services/requests";
import UserContext from "../contexts/UserContext";

export default function Login() {
	const { setUserData } = useContext(UserContext);
	const user = localStorage.getItem("user");
	const navigate = useNavigate();
	const [userName, setUserName] = useState("");
	const [password, setPassword] = useState("");

	useEffect(() => {
		if (window.location.pathname !== "/sign-up") {
			user ? navigate("/home") : setUserData({ token: "", userName: "" });
		}
	}, []);

	function sendForm(e: React.FormEvent) {
		e.preventDefault();

		const body = {
			userName,
			password,
		};

		if (window.location.pathname === "/") {
			const req = login(body);
			req.then(res => {
				setUserData({
					token: res.data.token,
					userName: res.data.userName
				});
				toast.success("Login realizado com sucesso!");
				localStorage.setItem("user", JSON.stringify(res.data));
				navigate("/home");
			}).catch(err => {
				console.log(err.request.status);
				toast.error(err.response.data.message);
			});
		} else {
			const req = signUp(body);
			req.then(() => {
				toast.success("Cadastro realizado com sucesso!");
				setUserName("");
				setPassword("");
				navigate("/");
			}).catch(err => {
				console.log(err);
				toast.error(err.response.data.message);
			});
		}
	}

	return (
		<Content>
			<Box>
				<img src={logo} alt="Tasky" />
				<form onSubmit={sendForm}>
					<div>
						<Input 
							type="text"
							value={userName}
							onChange={e => setUserName(e.target.value)}
							onInvalid={e => (e.target as HTMLInputElement).setCustomValidity("Please enter a username")}
							onInput={e => (e.target as HTMLInputElement).setCustomValidity("")}
							required
						/>
						<Label>Username</Label>
					</div>
					<div>
						<Input
							type="password"
							value={password}
							onChange={e => setPassword(e.target.value)}
							onInvalid={e => (e.target as HTMLInputElement).setCustomValidity("Please enter a password")}
							onInput={e => (e.target as HTMLInputElement).setCustomValidity("")}
							required
						/>
						<Label>Senha</Label>                      
					</div>
					<ButtonForm >
						{window.location.pathname === "/" ? (
							<>
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
							</>
						) : (
							<>
								<Submit type="submit">
									<span></span>
									<span></span>
									<span></span>
									<span></span>
                                    Cadastrar
								</Submit>
								<div>
                                    Já tem uma conta?
									<a href="/">
                                        Faça o login
									</a>
								</div>
							</>
						)}
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
    height: 85%;
    box-shadow: 0 12px 15px 0 rgba(0, 0, 0, .24), 0 17px 50px 0 rgba(0, 0, 0, .19);
    background-color: #131315;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 60px 20px;

    img {
        width: 96px;
        margin: 20px 0 40px 0;
    }

    @media (min-width: 768px) {
        width: 50%;
        height: 85%;
        padding: 60px;
    }

    @media (min-width: 1024px) {
        width: 30%;
        padding: 20px;
    }

    @media (min-width: 1369px) {
        width: 20%;
        height: 40%;
        padding: 60px 10px;
    }
`;