import { useSelector } from "react-redux";
import { fetchProducts } from "../../redux/productsSlice";
import ComicInfo from '../comicInfo/ComicInfo';
import ProductList from "../productList/ProductList";
import SaleBadge from "../saleBadge/SaleBadge";


const ComicsList = () => {
    const { comics } = useSelector((state) => state.products);

    return (
        <ProductList
            products={comics}
            searchField="title"
            CardInfoModal={ComicInfo}
            onFetchProducts={fetchProducts}
            onReadMoreDataKey="title"
            renderCardBadge={(product) => product.prices[0].price === 0 && <SaleBadge />}
        />
    );
};

export default ComicsList;