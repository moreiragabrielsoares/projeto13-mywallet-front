import { React , useState } from 'react';
import { Link , useNavigate } from "react-router-dom";
import styled from 'styled-components';
import axios from 'axios';

import { ThreeDots } from  'react-loader-spinner'



function SingUpPage() {
    
    const [userName, setUserName] = useState("");
    const [userEmail, setUserEmail] = useState("");
    const [userPassword, setUserPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [isFormDisabled, setIsFormDisabled] = useState(false);

    const navigate = useNavigate();
    
    
    function register(event) {
        event.preventDefault();
        setIsFormDisabled(true);
        
        const singUpObj = {
            name: userName,
            email: userEmail,
            password: userPassword,
            confirmPassword: confirmPassword
        }

        const request = axios.post("https://driven-projeto-mywallet-back.herokuapp.com/signup", singUpObj);
        
        request.then((res) => {navigate("/")});         
        
        request.catch((erro) => {alert(erro.response.data); setIsFormDisabled(false); setUserEmail(""); setUserPassword(""); setUserName(""); setConfirmPassword("")});
    }

    
    
    return (

        <FrontPageBackground>

            <Container>

                <LogoLine>MyWallet</LogoLine>

                <Form onSubmit={register}>
                    <FormInput 
                        id="userName" 
                        placeholder="Nome" 
                        onChange={e => setUserName(e.target.value)} 
                        value={userName}
                        type="text"
                        required
                        disabled={isFormDisabled}
                    />
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
                    <FormInput 
                        id="ConfirmPassword" 
                        placeholder="Confirme a senha" 
                        onChange={e => setConfirmPassword(e.target.value)} 
                        value={confirmPassword}
                        type="password"
                        required
                        disabled={isFormDisabled}
                    />

                    {isFormDisabled ? 
                        (<FormButton type="submit" disabled={isFormDisabled}>
                            <ThreeDots color="#FFFFFF" height={50} width={50} />
                        </FormButton>) 
                        : (<FormButton type="submit" disabled={isFormDisabled}>Cadastrar</FormButton>)
                    }

                </Form>

                <Link to="/" style={{textDecoration: 'none'}}>
                    <LoginLine>Já tem uma conta? Entre agora!</LoginLine>
                </Link>

            </Container>

        </FrontPageBackground>

    );
}
  



export default SingUpPage;

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
    padding-left: 15px;
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

const LoginLine = styled.div`
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