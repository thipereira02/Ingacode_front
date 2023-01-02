/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { toast } from "react-toastify";
import { AiOutlineCloseCircle, AiOutlineDown } from "react-icons/ai";

import App from "../layouts/App";
import UserContext from "../contexts/UserContext";
import { addNewTimeTracker, getCollaborators } from "../services/requests";
import { ButtonForm, Submit } from "../layouts/Common";
import ProjectContext from "../contexts/ProjectContext";

export default function AddTimeTracker() {
	const { taskId } = useParams<{ taskId: string }>();
	const { projectData } = useContext(ProjectContext);
	const [collaborators, setCollaborators] = useState<any[]>([]);
	const [isOpen, setIsOpen] = useState(false);
	const [selectedCollaborator, setSelectedCollaborator] = useState<string>("");
	const [collabName, setCollabName] = useState<string>("");
	const [initTime, setInitTime] = useState<string>("");
	const [initDate, setInitDate] = useState<string>("");
	const [finalTime, setFinalTime] = useState<string>("");
	const [finalDate, setFinalDate] = useState<string>("");
	const { userData } = useContext(UserContext);
	const token = userData.token;
	const navigate = useNavigate();

	useEffect(() => {
		const req = getCollaborators(token);
		req.then(res => {
			setCollaborators(res.data);
		}).catch(err => {
			console.log(err);
			toast.error(err.response.data.message);
		});
	}, []);

	function selectCollaborator(collaborator: any){
		setSelectedCollaborator(collaborator.id);
		setCollabName(collaborator.name);
		setIsOpen(false);
	}

	function abortCollaborator(){
		setSelectedCollaborator("");
		setCollabName("");
		setIsOpen(false);
	}

	function createTimeTracker() {
		const startDate = new Date(`${initDate} ${initTime}`).toISOString();
		const endDate = new Date(`${finalDate} ${finalTime}`).toISOString();
		const timeZoneId = Intl.DateTimeFormat().resolvedOptions().timeZone;
		const collaboratorId = selectedCollaborator;

		const today = new Date().toISOString();
		if (startDate < today) {
			toast.error("A data de início não pode ser menor que a data atual");
			return;
		}

		if (endDate < startDate) {
			toast.error("A data de término não pode ser menor que a data de início");
			return;
		}

		const body = {
			startDate,
			endDate,
			timeZoneId,
			collaboratorId: collaboratorId || null
		};

		if (taskId !== undefined) {
			const req = addNewTimeTracker(token, body, taskId);
			req.then(() => {
				toast.success("Time tracker adicionado com sucesso");
				navigate(`/projeto/${projectData.id}`);
			}).catch(err => {
				console.log(err);
				toast.error(err.response.data.message);
			});
		} else {
			toast.error("Não foi possível adicionar o time tracker");
		}
	}	

	return (
		<App>
			<h1>Adicione um time tracker à sua tarefa</h1>
			<Body>
				<DateForm>
					<label htmlFor="init">Início: </label>
					<input 
						type="time" 
						name="init"
						value={initTime}
						onChange={e => setInitTime(e.target.value)}
					/>
					<label htmlFor="initDate">Data de início: </label>
					<input 
						type="date" 
						name="initDate" 
						value={initDate}
						onChange={e => setInitDate(e.target.value)}
					/>

					<label htmlFor="end">Fim: </label>
					<input 
						type="time" 
						name="end"
						value={finalTime}
						onChange={e => setFinalTime(e.target.value)}
					/>
					<label htmlFor="endDate">Data do término: </label>
					<input 
						type="date" 
						name="endDate"
						value={finalDate}
						onChange={e => setFinalDate(e.target.value)}
					/>
				</DateForm>
				<DropDownContainer>
					<DropDownHeader>
						<p>{collabName || "Colaborador"}</p>
						<div>
							{collabName.length !== 0 ? 
								<AiOutlineCloseCircle  style={{cursor: "pointer"}} color="red" onClick={abortCollaborator} /> :
								""    
							}
							<ArrowIcon style={{cursor: "pointer"}} onClick={() => setIsOpen(!isOpen)} show={isOpen} />
						</div>
					</DropDownHeader>
					{isOpen && (
						<DropDownListContainer>
							<DropDownList>
								{collaborators.map(collaborator => (
									<ListItem key={collaborator.id} value={collaborator.id} onClick={() => selectCollaborator(collaborator)}>{collaborator.name}</ListItem>
								))}
							</DropDownList>
						</DropDownListContainer>
					)}
				</DropDownContainer>
				<ButtonForm>
					<Submit onClick={createTimeTracker}>
						<span></span>
						<span></span>
						<span></span>
						<span></span>
                            Criar
					</Submit>
				</ButtonForm>
			</Body>
		</App>
	);
}

const Body = styled.div`
    display: flex;
    flex-direction: column;
    margin: 40px auto;
    width: 100%;

    @media (min-width: 768px){
        width: 30%;
    }
`;

const DateForm = styled.form`
    display: flex;
    flex-direction: column;
    width: 100%;

    input{
        position: relative;
        width: 100%;
        border: none;
        border-bottom: 1px solid #FFF;
        background: transparent;
        outline: none;
        color: #FFF;
        font-size: 16px;
        margin-bottom: 30px;

        &:focus ~ label, &:valid ~ label{
            top: -85px;
            left: 0;
            font-size: 15px;
            width: 100%;
        }
    }

    label{
        margin-bottom: 10px;
        font-size: 16px;
    }
`;

const DropDownContainer = styled.div`
    width: 100%;
    margin: 20px auto;
    border: none;
    border-bottom: 1px solid #FFF;
    padding-right: 2px;
`;

const DropDownHeader = styled.div`
    margin-bottom: 5px;
    color: #FFF;
    background: transparent;
    display: flex;
    justify-content: space-between;

    p{
        font-size: 16px;
    }
`;

const DropDownListContainer = styled.div``;

const DropDownList = styled.ul`
    padding: 0;
    margin: 0;
    padding-left: 16px;
    background: #FFF;
    border: 2px solid #e5e5e5;
    box-sizing: border-box;
    color: #1E1782;
    font-size: 16px;

    &:first-child {
        padding-top: 0.8em;
    }
`;

const ListItem = styled.li`
    list-style: none;
    margin-bottom: 12px;
    cursor: pointer;
`;

const ArrowIcon = styled(AiOutlineDown)<{ show: boolean }>`
    margin-left: 8px;
    color: #FFF;
    font-size: 15px;
    transform: ${props => (props.show ? "rotate(180deg)" : "rotate(0deg)")};
    transition: transform 0.3s ease-in-out;
`;