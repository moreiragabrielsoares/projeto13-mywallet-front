import { useState, useContext } from 'react';
import UserContext from '../contexts/UserContext'
import { Link , useNavigate } from "react-router-dom";
import styled from 'styled-components';
import axios from 'axios';

import { ThreeDots } from  'react-loader-spinner';



function LoginPage() {
    
    const [userEmail, setUserEmail] = useState("");
    const [userPassword, setUserPassword] = useState("");

    const [isFormDisabled, setIsFormDisabled] = useState(false);
    
    const navigate = useNavigate();

    const {token, setToken, userName, setUserName} = useContext(UserContext);
    
    function login(event) {
        event.preventDefault();
        setIsFormDisabled(true);

        const loginObj = {
            email: userEmail,
            password: userPassword
        }

        const request = axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/login", loginObj);
        
        request.then(loginSuccess);         
        
        request.catch((erro) => {alert(erro.response.data.message); setIsFormDisabled(false)});

    }
    

    function loginSuccess (res) {
        setToken(res.data.token);
        setUserName(res.data.name);
        navigate("/wallet");
    }

    
    return (
        <FrontPageBackground>

            <Container>

                <LogoLine>MyWallet</LogoLine>
                
                {/* Inserir onSubmit={login} */}
                <Form>
                    <FormInput 
                        id="userEmail" 
                        placeholder="E-mail" 
                        onChange={e => setUserEmail(e.target.value)} 
                        value={userEmail}
                        type="email"
                        required
                        disabled={isFormDisabled}
                    />
                    <FormInput 
                        id="userPassword" 
                        placeholder="Senha" 
                        onChange={e => setUserPassword(e.target.value)} 
                        value={userPassword}
                        type="password"
                        required
                        disabled={isFormDisabled}
                    />


                    {isFormDisabled ? 
                        (<FormButton type="submit" disabled={isFormDisabled}>
                            <ThreeDots color="#FFFFFF" height={50} width={50} />
                        </FormButton>) 
                        : (<FormButton type="submit" disabled={isFormDisabled}>Entrar</FormButton>)
                    }


                </Form>

                <Link to="/signup" style={{textDecoration: 'none'}}>
                    <SingUpLine>Primeira vez? Cadastre-se!</SingUpLine>
                </Link>
                
            </Container>

        </FrontPageBackground>
      
    );
}
  
export default LoginPage;


const FrontPageBackground = styled.div`
    background-color: #9259BE;
    display: flex;
    flex-direction: column;
    text-align: center;
    width: 100%;
    height: 100%;
    position: absolute;
`;

const Container = styled.div`
    background-color: #9259BE;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: auto 0;
`;

const LogoLine = styled.div`
    font-family: 'Saira Stencil One';
    font-style: normal;
    font-weight: 400;
    font-size: 32px;
    color: #FFFFFF;
    margin-bottom: 25px;
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

const SingUpLine = styled.div`
    font-family: 'Raleway';
    font-style: normal;
    font-weight: 700;
    font-size: 15px;
    color: #FFFFFF;
    margin-top: 25px;
    :hover {
        cursor: pointer;
    }
`;
