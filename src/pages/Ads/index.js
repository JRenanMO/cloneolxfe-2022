import 
 React, 
{ 
    useState, 
    useEffect 
} from 'react'
import { PageArea } from './styled';
import { PageContainer } from '../../components/MainComponents';
import { 
    useLocation, 
    useHistory } 
    from 'react-router-dom';
import useAPI from '../../helpers/OlxAPI';
import AddItem from '../../components/partials/AdItem'

let timer;

const Page = () => {
    const api = useAPI();
    const history = useHistory();

    const useQueryString = () => {
        return new URLSearchParams(useLocation().search);
    }

    const query = useQueryString();

    const [q, setQ] = useState(query.get('q') != null ? query.get() : '');
    const [cat, setCat] = useState(query.get('cat') != null ? query.get('cat') : '');
    const [state, setState] = useState(query.get('state') != null ? query.get('state') 
    : '');

    

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
                    <input 
                    type="email" 
                    disabled={disabled}
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                    />  
                    </div>
                </label>
                <label className="area">
                    <div className="area--title">Senha</div>
                    <div className="area--input">
                    <input 
                    type="password" 
                    disabled={disabled}
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required
                    />  
                    </div>
                </label>
                <label className="area">
                    <div className="area--title">Lembrar a Senha</div>
                    <div className="area--input">
                    <input 
                    type="checkbox"
                    className='check' 
                    disabled={disabled}
                    checked={rememberPassword}
                    onChange={() => setRememberPassword(!rememberPassword)}
                    required
                    />  
                    </div>
                </label>
                <label className="area">
                    <div className="area--title"></div>
                    <div className="area--input">
                    <button disabled={disabled}>Fazer Login</button> 
                    </div>
                </label>
            </form>
        </PageArea>
        </PageContainer>
    )
}

export default Page;