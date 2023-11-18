import 
React, 
{ useState, 
  useEffect,
  useRef 
} from 'react'
import { useHistory } from 'react-router-dom';
import { PageArea } from './styled'
import { PageContainer, 
    PageTitle, 
    ErrorMessage 
} from '../../components/MainComponents';
import useAPI from '../../helpers/OlxAPI';
import MaskedInput from 'react-text-mask';
import { createNumberMask } from 'text-mask-addons'

const Page = () => {
    const api = useAPI();
    const history = useHistory();
    const fileField = useRef();

    const [title, setTitle] = useState ('');
    const [categories, setCategories] = useState([]);
    const [category, setCategory] = useState('');
    const [price, setPrice] = useState('');
    const [priceNegotiable, setPriceNegotiable] = useState(false);
    const [description, setDescription] = useState('');

    const [disabled, setDisabled] = useState(false);
    const [error, setError] = useState('');

    useEffect( () => {
        const getCategories = async () => {
            const sList = await api.getCategories();
            setCategories(sList);
        }
        getCategories();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setDisabled(true);
        setError('');
        let errors= [];
        if(!title.trim()) {
            errors.push("É necessário informar um título")
        }
        if(!category.trim()) {
            errors.push("É necessário informa um categoria")
        }
        if(errors.length === 0) {
            const fData = new FormData();
            fData.append('title', title);
            fData.append('price', price);
            fData.append('priceneg', priceNegotiable);
            fData.append('desc', description);
            fData.append('cat', category);

            if(fileField.current.files.length > 0) {
                for (let i = 0; i < fileField.current.file.length; i++) {
                    fData.append('img', fileField.current.files[i]);
                }
            }

            const reponse = await api.addAd(fData);
            if (!reponse.error) {
                history.push('/ad${reponse.id}');
            }else{
                setError(reponse.error);
            }
            
        } else {
            setError(errors.join('\n'));
        }
        
        setDisabled(false);
    }

    const priceMask = createNumberMask({
        prefix: 'R$ ',
        includeThousandsSeparator: true,
        thousandsSeparatorSymbol: '.',
        allowDecimal: true,
        decimalSymbol: ','
    })

    return (
        <PageContainer>
        <PageTitle>Postar um Anúncio</PageTitle>
        <PageArea>
            {error &&
            <ErrorMessage>{error}</ErrorMessage>
            }
            <form onSubmit={handleSubmit}>
            <label className="area">
                    <div className="area--title">
                        Título
                        </div>
                    <div className="area--input">
                    <input 
                    type="text" 
                    disabled={disabled}
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    required
                    />  
                    </div>
                </label>
                <label className="area">
                    <div className="area--title">
                        Categoria
                        </div>
                    <div className="area--input">
                    <select
                    type="email" 
                    disabled={disabled}
                    onChange={e => setCategory(e.target.value)}
                    required
                    >

                    <option></option> 
                    {categories.map( (category, k) => 
                    <option
                    key={k}
                    value={category._id}
                    >
                        {category.name}
                    </option>
                    
                    )}   
                    </select>  
                    </div>
                </label>
                <label className="area">
                    <div className="area--title">
                        Preço
                        </div>
                    <div className="area--input">
                        <MaskedInput 
                            mask={priceMask}
                            placeholder="R$ "
                            disabled={disabled || priceNegotiable}
                            value={price}
                            onChange={e => setPrice(e.target.value)}
                        />
                    </div>
                </label>
                <label className="area">
                    <div className="area--title">
                        Preço Negociável
                        </div>
                    <div className="area--input">
                    <input 
                    type="Checkbox" 
                    className='check'
                    disabled={disabled}
                    onChange={e => setPriceNegotiable(!priceNegotiable)}
                    checked={priceNegotiable}
                    />  
                    </div>
                </label>
                <label className="area">
                    <div className="area--title">
                        Descrição
                        </div>
                    <div className="area--input">
                    <textarea  
                    disabled={disabled}
                    value={description}
                    onChange={e => setDescription(e.target.value)}

                    >

                    </textarea>
                    </div>
                </label>
                <label className="area">
                    <div className="area--title">
                        Imagens (1 ou mais)
                        </div>
                    <div className="area--input">
                    <input 
                    type="file" 
                    disabled={disabled}
                    ref={fileField}
                    multiple
                    />  
                    </div>
                </label>
                <label className="area">
                    <div className="area--title"></div>
                    <div className="area--input">
                    <button disabled={disabled}>Adicionar Anúncio</button> 
                    </div>
                </label>
            </form>
        </PageArea>
        </PageContainer>
    )
}

export default Page;