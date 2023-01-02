/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import styled from "styled-components";

import App from "../layouts/App";
import UserContext from "../contexts/UserContext";
import { getTaskTimeTrackers } from "../services/requests";

export default function TaskTimeTrackers(){
	const { taskId } = useParams<{ taskId: string }>();
	const { userData } = useContext(UserContext);
	const [timeTrackers, setTimeTrackers] = useState<any[]>([]);

	useEffect(() => {
		const token = userData.token;
        
		if (taskId !== undefined) {
			const req  = getTaskTimeTrackers(token, taskId);
			req.then(res => {
				setTimeTrackers(res.data);
			}).catch(err => {
				console.log(err);
				toast.error(err.response.data.message);
			});
		}
	}, []);

	return (
		<App>
			<h1>Task Time Trackers</h1>
			{timeTrackers.length === 0 && <p style={{marginTop: 30, fontSize: 20}}>Não há registros de tempo para esta tarefa.</p>}
			{timeTrackers.length !== 0 && timeTrackers.map((timeTracker: any) => {
				return (
					<TimeTracker key={timeTracker.id}>
						<h1>Início:</h1>
						<p>{timeTracker.startDate.split("T")[0]} {timeTracker.startDate.split("T")[1].split(".")[0].slice(0, -3)}hrs</p>
						<h1>Final:</h1>
						<p>{timeTracker.endDate.split("T")[0]} {timeTracker.endDate.split("T")[1].split(".")[0].slice(0, -3)}hrs</p>
						{timeTracker.collaborator?.name && (
							<>
								<h1>Colaborador:</h1>
								<p>{timeTracker.collaborator?.name}</p>
							</>
						)}
					</TimeTracker>
				);
			})}
			
		</App>
	);
}

const TimeTracker = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    background-color: #1E1782;
    margin: 30px 0;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.5);
    padding: 10px 20px;

    h1{
        font-size: 17px;
        font-weight: 700;
    }

    p{  
        font-size: 16px;
        line-height: 1.5;
        margin-bottom: 10px;
        margin-left: 10px;
    }

    @media (min-width: 768px){
        h1{
            font-size: 20px;
        }
    }
`;