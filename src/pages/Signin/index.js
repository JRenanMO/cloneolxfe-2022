import React, { useState } from 'react'
import { PageArea } from './styled'
import { PageContainer, PageTitle, ErrorMessage } from '../../components/MainComponents';
import { doLogin } from '../../helpers/AuthHandler';
import useAPI from '../../helpers/OlxAPI';

const Page = () => {
    const api = useAPI();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberPassword, setRememberPassword] = useState(false);
    const [disabled, setDisabled] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setDisabled(true);
        setError('');
        const json = await api.login(email, password);
        if (json.error) {
            setError(json.error);
        } else {
            doLogin(json.token, rememberPassword);
            window.location.href ='/';
        }
        setDisabled(false);
    }

    return (
        <PageContainer>
        <PageTitle>Login</PageTitle>
        <PageArea>
            {error &&
            <ErrorMessage>{error}</ErrorMessage>
            }
            <form onSubmit={handleSubmit}>
                <label className="area">
                    <div className="area--title">E-mail</div>
                    <div className="area--input">
                    <input type="email" />  
                    </div>
                </label>
                <label className="area">
                    <div className="area--title">Senha</div>
                    <div className="area--input">
                    <input type="password" />  
                    </div>
                </label>
                <label className="area">
                    <div className="area--title">Lembrar a Senha</div>
                    <div className="area--input">
                    <input type="checkbox"className='check' />  
                    </div>
                </label>
                <label className="area">
                    <div className="area--title"></div>
                    <div className="area--input">
                    <button>Fazer Login</button> 
                    </div>
                </label>
            </form>
        </PageArea>
        </PageContainer>
    )
}

export default Page