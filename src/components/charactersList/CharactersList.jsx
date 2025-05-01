import { useSelector } from "react-redux";
import { fetchCharacters } from "../../redux/productsSlice";
import ProductList from "../productList/ProductList";
import CharInfo from '../charInfo/CharInfo';


const CharactersList = () => {
    const { characters } = useSelector((state) => state.products);

    return (
        <ProductList
            products={characters}
            searchField="name"
            CardInfoModal={CharInfo}
            onFetchProducts={fetchCharacters}
            onReadMoreDataKey="name"
        />
    );
};

export default CharactersList;