import { useState, useContext } from 'react';
import UserContext from '../contexts/UserContext'
import { Link , useNavigate } from "react-router-dom";
import styled from 'styled-components';
import axios from 'axios';

import { ThreeDots } from  'react-loader-spinner';





function NewExpensePage () {

    const [isFormDisabled, setIsFormDisabled] = useState(false);


    const [expenseValue, setExpenseValue] = useState("");
    const [expenseDescription, setExpenseDescription] = useState("");


    const navigate = useNavigate();

    const {token} = useContext(UserContext);
    
    
    function registerExpense(event) {
        event.preventDefault();
        setIsFormDisabled(true);

        const newExpenseObj = {
            value: expenseValue,
            description: expenseDescription
        }

        const request = axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/login", newExpenseObj);
        
        request.then(registerSuccess);         
        
        request.catch((erro) => {alert(erro.response.data.message); setIsFormDisabled(false)});

    }
    
    function registerSuccess (res) {
        navigate("/mywallet");
    }



    return (
        <PageBackground>

            <Container>

                <TitleLine>Nova saída</TitleLine>

                {/* Inserir onSubmit={registerExpense} */}
                <Form>
                    <FormInput 
                        id="expenseValue" 
                        placeholder="Valor" 
                        onChange={e => setExpenseValue(e.target.value)} 
                        value={expenseValue}
                        type="number"
                        required
                        disabled={isFormDisabled}
                    />
                    <FormInput 
                        id="incomeDescription" 
                        placeholder="Descrição" 
                        onChange={e => setExpenseDescription(e.target.value)} 
                        value={expenseDescription}
                        type="text"
                        required
                        disabled={isFormDisabled}
                    />

                    {isFormDisabled ? 
                        (<FormButton type="submit" disabled={isFormDisabled}>
                            <ThreeDots color="#FFFFFF" height={50} width={50} />
                        </FormButton>) 
                        : (<FormButton type="submit" disabled={isFormDisabled}>Salvar saída</FormButton>)
                    }
                </Form>
                
                <Link to="/mywallet" style={{textDecoration: 'none'}}>
                    <ReturnButton>Voltar</ReturnButton>
                </Link>

            </Container>

        </PageBackground>
    );


};

export default NewExpensePage;



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
    font-family: 'Raleway';
    font-style: normal;
    font-weight: 700;
    font-size: 26px;
    color: #FFFFFF;
    margin: 25px 0 40px 0;
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const FormInput = styled.input`
    width: 326px;
    height: 58px;
    border: 1px solid #D5D5D5;
    background: #FFFFFF;
    border-radius: 5px;
    margin-bottom: 13px;
    font-size: 16px;
    padding-left:15px;
    ::placeholder{
        font-family: 'Raleway';
        font-style: normal;
        font-weight: 400;
        font-size: 20px;
        color: #000000;
    }

    :disabled{
        opacity: 0.6;
    }
`;

const FormButton = styled.button`
    width: 326px;
    height: 46px;
    background-color: #A328D6;
    border-radius: 5px;
    border: 1px solid #A328D6;
    font-family: 'Raleway';
    font-style: normal;
    font-weight: 700;
    font-size: 20px;
    color: #FFFFFF;
    display: flex;
    align-items: center;
    justify-content: center;

    :disabled{
        opacity: 0.6;
    }

    :hover {
        cursor: pointer;
    }
`;

const ReturnButton = styled.div`
    font-family: 'Raleway';
    font-style: normal;
    font-weight: 700;
    font-size: 15px;
    color: #FFFFFF;
    margin: 20px auto;
    text-align: center;
    :hover {
        cursor: pointer;
    }
`;