import React, { useEffect, useState } from 'react'
import { FaRegHeart, FaSearch } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts, setSearchComicsRequest } from '../../redux/productsSlice';
import { Button, Card, CardContent, CardMedia, Pagination } from '@mui/material';
import SaleBadge from '../saleBadge/SaleBadge';
import ComicInfo from '../comicInfo/ComicInfo';
import { addToFavorite } from '../../redux/favoriteSlice';
import { Triangle } from "react-loader-spinner";
import './style.css';
import Search from '../search/Search';


const ComicsList = () => {
    const [open, setOpen] = useState(false);
    const [selectedComic, setSelectedComic] = useState(null);

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8;

    const [_, setLikedComic] = useState(false);
    const [clickedHeart, setClickedHeart] = useState(null);

    const dispatch = useDispatch();
    const { products, searchRequest, loading, error } = useSelector((state) => state.products);
    const { favoriteItems } = useSelector((state) => state.favorite);

    useEffect(() => {
        dispatch(fetchProducts())
    }, [dispatch]);

    useEffect(() => {//сброс страницы на первую при смене фильтра,поиска или сортировки
        setCurrentPage(1);
    }, [searchRequest]);

    // useEffect(() => {
    //     console.log(products);
    // }, [products]);

    const handleReadMore = (comic) => {
        setSelectedComic(comic);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setSelectedComic(null);
    };

    const isLiked = (id) => {
        return favoriteItems.some(item => item.id === id);
    };

    const toggleLike = (id) => {
        setLikedComic((prev) => ({
            ...prev,
            [id]: !prev[id]
        }));

        setClickedHeart(id);
        setTimeout(() => setClickedHeart(null), 400);
    };

    const filteredProducts = products.filter((product) => product.title.toLowerCase().includes(searchRequest.toLowerCase()));

    //пагинация
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentProducts = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

    if (loading) {
        return (
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "80vh" }}>
                <Triangle
                    height={150}
                    width={150}
                    color="#00bfff"
                    ariaLabel="loading"
                />
            </div>
        );
    };

    if (error) return <p style={{ color: 'red' }}>Error: {error}</p>;

    return (
        <div className='container'>
            <Search />

            <div className='products-wrapper'>
                {currentProducts.map((product) => (
                    <div key={product.id}>
                        <Card
                            // onClick={() => navigate(`/product/${product.id}`)}
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
                                {product.prices[0].price === 0 && <SaleBadge />}

                                <CardMedia
                                    component="img"
                                    image={`${product.thumbnail.path}.${product.thumbnail.extension}`}
                                    alt={product.title}
                                    sx={{ objectFit: 'contain', height: "350px", minWidth: '280px' }}
                                />
                            </div>

                            <CardContent sx={{ display: "flex", justifyContent: 'space-between', flexDirection: "column", minHeight: '120px' }} >
                                <div className='product-title-cart'>
                                    <div>{product.title.slice(0, 30)}...</div>
                                </div>
                                <div className='btn-group'>
                                    <Button
                                        onClick={() => handleReadMore(product)}
                                        variant="outlined"
                                        style={{ borderRadius: '10px', color: '#00bfff' }}
                                    >
                                        Read More
                                    </Button>

                                    <Button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            dispatch(addToFavorite(product));
                                            toggleLike(product.id);
                                        }}
                                        variant="outlined"
                                        style={{
                                            color: '#00bfff',
                                            backgroundColor: isLiked(product.id) ? '#00bfff' : 'transparent', borderRadius: '50%',
                                            padding: '6px',
                                            cursor: 'pointer',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center'
                                        }}
                                    >
                                        <FaRegHeart
                                            className={`heart-icon ${clickedHeart === product.id ? 'clicked' : ''}`}
                                            style={{
                                                color: isLiked(product.id) ? 'white' : '#00bfff',
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
            <ComicInfo
                open={open}
                handleClose={handleClose}
                comic={selectedComic}
                toggleLike={toggleLike}
                isLiked={isLiked}
            />
        </div>
    )
}

export default ComicsList;
