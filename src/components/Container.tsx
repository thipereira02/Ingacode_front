/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import styled from "styled-components";

export default function Container({ children }: any) {
	return (
		<ContainerWrapper>
			{children}
		</ContainerWrapper>
	);
}

const ContainerWrapper = styled.div`
	padding: 80px 20px 0 90px;
	word-break: break-word;

	h1{
		color: #FFF;
		font-size: 19px;
		font-weight: 700;
		line-height: 22px;
	}

	h2{
		color: #BFBFBF;
		font-size: 19px;
		font-weight: 500;
		line-height: 22px;
	}

	h3{
		color: #FFF;
		font-size: 17px;
		font-weight: 700;
		line-height: 20px;
		margin: 40px 0 20px;
	}

	@media (min-width: 768px) {
		padding: 100px 40px 0 110px;

		h1{
			font-size: 30px;
			line-height: 35px;
		}

		h2{
			font-size: 30px;
			line-height: 35px;
		}

		h3{
			font-size: 20px;
			line-height: 23px;
			margin: 50px 0 20px;
		}
	}
`;