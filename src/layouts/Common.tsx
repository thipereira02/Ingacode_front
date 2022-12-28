import styled from "styled-components";

export const Input = styled.input`
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
`;

export const Label = styled.label`
    position: relative;
    left: 0;
    top: -60px;
    padding: 10px 0;
    font-size: 16px;
    color: #fff;
    pointer-events: none;
    transition: .5s;
`;

export const ButtonForm = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 20px;

    div{
        font-size: 14px;
        text-decoration: none;
        color: #CBBDDB;
        text-align: center;
        display: flex;
        flex-direction: column;
        margin: 15px 0;

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

export const Submit = styled.button`
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


export const Projects = styled.div`
	display: flex;
	flex-wrap: wrap;
	margin-bottom: 20px;

	p{
		color: #BFBFBF;
		font-size: 16px;
		font-weight: 500;
		line-height: 19px;

		@media (min-width: 768px) {
			font-size: 19px;
			line-height: 22px;
		}
	}
`;

export const Project = styled.div`
	width: 170px;
	height: 80px;
	font-size: 16px;
	font-weight: 500;
	margin-right: 20px;
	margin-bottom: 20px;
	word-break: break-all;
	overflow-y: hidden;
	cursor: pointer;
	padding: 10px;
	background: #1E1782;
	box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);

	@media (min-width: 768px) {
		width: 242px;
		height: 112px;
		font-size: 20px;
		margin-right: 25px;
		margin-bottom: 25px;
		padding: 15px;
	}

	@media (min-width: 1024px) {
		outline: calc(115px/2) solid #0009;
		outline-offset: calc(113px/-2);
		transition: 0.3s;

		&:hover{
			outline: 4px solid #1E1782;
			outline-offset: 12px;
			background: #1E1782;
		}
	}
`;