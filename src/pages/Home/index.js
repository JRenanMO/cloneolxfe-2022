import 
React, {
    useState,
    useEffect
} from 'react'
import { Link } from 'react-router-dom'
import { PageArea, SearchArea } from './styled'
import { PageContainer 
} from '../../components/MainComponents';
import useAPI from '../../helpers/OlxAPI';

const Page = () => {
    const api = useAPI();

    const [stateList, setStateList] = useState([]);
    const [categories, setCategories] = useState([]);
    const [adList, setAdList] = useState([]);

    useEffect( () => {
        const getStates = async () => {
            const sList = await api.getStates();
            setStateList(sList);
        }
        getStates();
    }, []);

    useEffect( () => {
        const getCategories = async () => {
            const cats = await api.getCategories();
            setCategories(cats);
        }
        getCategories();
    }, []);

    return (
        <>
        <SearchArea>
            <PageContainer>
            <div className="searchBox">
                <form method="GET" action="/ads">
                    <input
                    type="text"
                    name="q"
                    placeholder="o que você procura"
                    />
                    <select name="state">
                        {stateList.map((i, k) =>
                        <option key={k} value={i.name}>
                            {i.name}
                        </option>
                        )}
                    </select>
                    <button>Pesquisar</button>
                </form>
            </div>
            <div className='categoryList'>
                ...
            </div>
            </PageContainer>
        </SearchArea>
        <PageContainer>
            <PageArea>
                ...
            </PageArea>
        </PageContainer>
        </>
    )
}

export default Page