import { useState, useContext , useEffect } from 'react';
import UserContext from '../contexts/UserContext'
import { Link , useNavigate } from "react-router-dom";
import styled from 'styled-components';
import axios from 'axios';
import { ThreeDots } from  'react-loader-spinner'



function WalletPage () {


    const {userName , token} = useContext(UserContext);

    const [registers, setRegisters] = useState([]);
    const [netResult, setNetResult] = useState("");
    const [typeNetResult, setTypeNetResult] = useState("");

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {

        const config = {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        }

		const promisse = axios.get("https://driven-projeto-mywallet-back.herokuapp.com/mywallet", config);

		promisse.then(success);

        function success (res) {
            setRegisters(res.data.registers);
            setNetResult(res.data.netResult);
            setTypeNetResult(res.data.typeNetResult);
            setIsLoading(false);
        }
        
        promisse.catch((erro) => {alert(erro.response.data.message)});

	}, []);

   

    function verifyRegistersList () {

        if (registers.length === 0) {

            return  <EmptyContainer>
                        <div>Não há registros de entrada ou saída</div>
                    </EmptyContainer>

        } else {

            return  <NotEmptyContainer>
                        
                        {registers.map( register => <LineRegister>
                                                        <DayRegister>{register.date}</DayRegister>
                                                        <DescriprionRegister>{register.description}</DescriprionRegister>
                                                        <ValueRegister type={register.type}>{register.value}</ValueRegister>
                                                    </LineRegister>)}

                        <ResultLine>
                            <span>SALDO</span>
                            <ResultValue type={typeNetResult}>{netResult}</ResultValue>
                        </ResultLine>

                    </NotEmptyContainer>
            
        }
    }



    return (

        <PageBackground>

            <Container>

                <TitleLine>
                    <Title>{`Olá, ${userName}`}</Title>

                    <Link to="/" style={{textDecoration: 'none'}}>
                        <ion-icon name="exit-outline"></ion-icon>
                    </Link>

                </TitleLine>

                <RegistersContainer>

                    {isLoading ? (

                        <LoadingContainer>
                            
                            <ThreeDots color="#9259BE" height={100} width={100} />
                             
                        </LoadingContainer>
                        ) 

                        : 
                        
                        (verifyRegistersList())
                    }

                </RegistersContainer>


                <ButtonsContainer>

                    <Link to="/newincome" style={{textDecoration: 'none'}}>
                        <NewRegisterButton>
                            <ion-icon name="add-circle-outline"></ion-icon>
                            <span>Nova <br></br> entrada</span>
                        </NewRegisterButton>
                    </Link>

                    <Link to="/newexpense" style={{textDecoration: 'none'}}>
                        <NewRegisterButton>
                            <ion-icon name="remove-circle-outline"></ion-icon>
                            <span>Nova <br></br> saída</span>
                        </NewRegisterButton>
                    </Link>

                </ButtonsContainer>

            </Container>

        </PageBackground>



    );


};


export default WalletPage;


const PageBackground = styled.div`
    background-color: #9259BE;
    display: flex;
    flex-direction: column;
    align-items:center;
    width: 100%;
    height: 100%;
    position: absolute;
`;

const Container = styled.div`
    background-color: #9259BE;
	display: flex;
    flex-direction: column; 
`;

const TitleLine = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin: 25px 5px 20px 5px;

    ion-icon{
        font-size: 25px;
        color: #FFFFFF;
        :hover{
        cursor: pointer;
        }
    }
`;

const Title = styled.div`
    font-family: 'Raleway';
    font-style: normal;
    font-weight: 700;
    font-size: 26px;
    color: #FFFFFF;
`;

const RegistersContainer = styled.div`
    width: 326px;
    height: 446px;
    background: #FFFFFF;
    border-radius: 5px;
    margin-bottom: 13px;
    position: relative;
`;

const EmptyContainer = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    div {
        width: 180px;
        font-family: 'Raleway';
        font-style: normal;
        font-weight: 400;
        font-size: 20px;
        line-height: 23px;
        text-align: center;
        color: #868686;
        margin: auto;
        padding: auto;
    }
`;

const LoadingContainer = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
`;

const NotEmptyContainer = styled.div`
    max-height: calc(100% - 40px);
    display: flex;
    flex-direction: column;
    padding: 22px 10px 10px 10px;
    overflow-y: scroll;
    scrollbar-width: thin;
    scrollbar-color: #E0E0E0;
    ::-webkit-scrollbar {
        width: 8px;
    }

    ::-webkit-scrollbar-thumb {
        background-color: #E0E0E0;
        border-radius: 20px;
        border: 1px solid #FFFFFF;
    }
`;

const LineRegister = styled.div`
    display: flex;
    flex-direction: row;
    margin-bottom: 15px;
`;

const DayRegister = styled.div`
    font-family: 'Raleway';
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    color: #C6C6C6;
    margin-right: 10px;
`;

const DescriprionRegister = styled.div`
    font-family: 'Raleway';
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    color: #000000;
    max-width: 180px;
    word-wrap: break-word;
`;

const ValueRegister = styled.div`
    font-family: 'Raleway';
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    color: ${props => props.type === "income" ? "#03AC00" : "#C70000"};
    // #03AC00;
    // #C70000
    margin-left: auto;
`;

const ResultLine = styled.div`
    display: flex;
    flex-direction: row;
    width: calc(100% - 20px);
    position: absolute;
    bottom: 10px;
    left: 10px;
    background-color: #FFFFFF;

    span {
        font-family: 'Raleway';
        font-style: normal;
        font-weight: 700;
        font-size: 17px;
        color: #000000;
    }

`;

const ResultValue = styled.div`
    font-family: 'Raleway';
    font-style: normal;
    font-weight: 400;
    font-size: 17px;
    color: ${props => props.type === "positive" ? "#03AC00" : "#C70000"};
    margin-left: auto;
`;

const ButtonsContainer = styled.div`
    display: flex;
    justify-content: space-between;
`;

const NewRegisterButton = styled.div`
    width: 155px;
    height: 114px;
    background: #A328D6;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 10px;

    :hover{
        cursor: pointer;
    }

    ion-icon{
        font-size: 30px;
        color: #FFFFFF;
    }

    span {
        font-family: 'Raleway';
        font-style: normal;
        font-weight: 700;
        font-size: 17px;
        color: #FFFFFF;
        line-height: 20px;
    }
`;
