import React, { useEffect, useState } from 'react';
import { Button, Card, CardContent, CardMedia, CircularProgress, Pagination } from '@mui/material';
import { FaSearch, FaRegHeart } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { addToFavorite } from '../../redux/favoriteSlice';
import { setSearchRequest } from '../../redux/productsSlice';
import '../comicsList/style.css';


const ProductList = ({
    products, //Массив продуктов (characters или comics)
    searchField, //Поле для поиска (name или title)
    CardInfoModal, //Компонент модального окна (CharInfo или ComicInfo)
    onFetchProducts, //Thunk для загрузки данных (fetchCharacters или fetchProducts)
    onReadMoreDataKey, //Название ключа для карточки (например, name или title)
    renderCardBadge, //Компонент для отображения бейджа (SaleBadge или null)
}) => {
    const [open, setOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8;

    const [clickedHeart, setClickedHeart] = useState(null);

    const dispatch = useDispatch();
    const { searchRequest, loading, error } = useSelector((state) => state.products);
    const { favoriteItems } = useSelector((state) => state.favorite);

    useEffect(() => {
        dispatch(onFetchProducts()); //(fetchCharacters или fetchProducts)
    }, [dispatch]);

    useEffect(() => {//сброс страницы на первую при смене фильтра,поиска или сортировки
        setCurrentPage(1);
    }, [searchRequest]);

    const handleReadMore = (item) => {
        setSelectedItem(item);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setSelectedItem(null);
    };

    const isLiked = (id) => favoriteItems.some(item => item.id === id);

    const toggleLike = (id) => {
        setClickedHeart(id);
        setTimeout(() => setClickedHeart(null), 400);
    };

    const filtered = products.filter((product) => product[searchField]?.toLowerCase().includes(searchRequest.toLowerCase()));

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filtered.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filtered.length / itemsPerPage);

    if (loading) {
        return (
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "80vh" }}>
                <CircularProgress size={100} thickness={4} sx={{ color: "#00bfff" }} />
            </div>
        );
    }
    if (error) return <p style={{ color: 'red' }}>Error: {error}</p>;

    return (
        <div className='container'>
            <div className="search-form">
                <div className="search-icon">
                    <FaSearch style={{ color: 'white' }} />
                </div>
                <input
                    onChange={(e) => dispatch(setSearchRequest(e.target.value))}
                    value={searchRequest}
                    type="text"
                    className="search-input"
                    placeholder="Search..."
                />
            </div>

            <div className='products-wrapper'>
                {currentItems.map((item) => (
                    <div key={item.id}>
                        <Card
                            sx={{
                                maxWidth: 290,
                                height: 460,
                                transition: "transform 0.2s ease-in-out",
                                borderRadius: '20px',
                                backgroundColor: 'rgb(32, 32, 32)',
                                border: '1px solid rgb(68 68 68)',
                                "&:hover": {
                                    transform: "scale(1.05)",
                                    boxShadow: "0px 5px 15px #00bfff",
                                },
                            }}
                        >
                            <div style={{ position: 'relative' }}>
                                {/* Отображение бейджа, если он есть(ПОКА НЕ УВЕРЕН ЧТО БУДЕТ РАБОТАТЬ) */}
                                {renderCardBadge && renderCardBadge(item)}

                                <CardMedia
                                    component="img"
                                    image={`${item.thumbnail.path}.${item.thumbnail.extension}`}
                                    alt="img"
                                    sx={{ objectFit: 'contain', height: "350px", minWidth: '280px' }}
                                />
                            </div>

                            <CardContent sx={{ display: "flex", justifyContent: 'space-between', flexDirection: "column", minHeight: '120px' }}>
                                <div className='product-title'>
                                    <div>{onReadMoreDataKey === 'title'
                                        ? `${item[onReadMoreDataKey]?.slice(0, 30)}...`
                                        : item[onReadMoreDataKey]}
                                    </div>
                                </div>

                                <div className='btn-group'>
                                    <Button
                                        onClick={() => handleReadMore(item)}
                                        variant="outlined"
                                        style={{ borderRadius: '10px', color: '#00bfff' }}
                                    >
                                        Read More
                                    </Button>

                                    <Button
                                        onClick={() => {
                                            dispatch(addToFavorite(item));
                                            toggleLike(item.id);
                                        }}
                                        variant="outlined"
                                        className='heart-btn-override'
                                        style={{
                                            color: '#00bfff',
                                            backgroundColor: isLiked(item.id) ? '#00bfff' : 'transparent',
                                            borderRadius: '50%',
                                            padding: '6px',
                                            cursor: 'pointer',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center'
                                        }}
                                    >
                                        <FaRegHeart
                                            className={`heart-icon ${clickedHeart === item.id ? 'clicked' : ''}`}
                                            style={{
                                                color: isLiked(item.id) ? 'white' : '#00bfff',
                                                width: '24px',
                                                height: '24px'
                                            }}
                                        />
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                ))}
            </div>

            <div style={{ display: "flex", justifyContent: "center", marginTop: "35px", paddingBottom: '50px' }}>
                <Pagination
                    count={totalPages}
                    page={currentPage}
                    onChange={(event, value) => setCurrentPage(value)}
                    color="primary"
                    className='pagination'
                />
            </div>


            {/* МОДАЛКА descr */}
            <CardInfoModal
                open={open}
                handleClose={handleClose}
                isLiked={isLiked}
                toggleLike={toggleLike}
                char={ searchField === 'name' ? selectedItem : undefined }
                comic={ searchField === 'title' ? selectedItem : undefined }
            />
        </div>
    );
}

export default ProductList;