import 
React, {
    useState,
    useEffect
} from 'react'
import { Link } from 'react-router-dom'
import { PageArea, SearchArea } from './styled'
import { PageContainer 
} from '../../components/MainComponents';
import AdItem from '../../components/partials/AdItem';
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

    useEffect(() => {
        const getRecentAds = async () =>{
            const json = await api.getAds({
                sort:'desc',
                limit: 8
            })
            setAdList(json.ads);
        }
        getRecentAds();
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
                {categories.map((i, k)=>
                <Link
                key={k}
                to={`/ads?cat=${i.slug}`}
                className="categoryItem"
                >
                    <img src={i.img} alt={`Logo da categoria ${i.name}`} />
                    <span>{i.name}</span>
                </Link>
                )}
            </div>
            </PageContainer>
        </SearchArea>
        <PageContainer>
            <PageArea>
                    <h2>Anúncio Recentes</h2>
                    <div className="List">
                        {adList.map((i, k) =>
                        <AdItem key={k} data={i} />
                        )}
                    </div>
                    <Link to="/ads" className="seaAllLink">Ver Todos anúncios</Link>
                    <hr />
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                    Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
                    when an unknown printer took a galley of type and scrambled it to make a type specimen book. 
                    It has survived not only five centuries, but also the leap into electronic typesetting, 
                    remaining essentially unchanged. 
            </PageArea>
        </PageContainer>
        </>
    )
}

export default Page