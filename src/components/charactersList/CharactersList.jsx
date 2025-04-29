import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchCharacters, setSearchRequest } from '../../redux/charactersSlice';
import { Button, Card, CardContent, CardMedia, Pagination } from '@mui/material';
import { FaSearch } from "react-icons/fa";
import CharInfo from '../charInfo/CharInfo';
import { FaRegHeart } from "react-icons/fa";
import { addToFavorite } from '../../redux/favoriteSlice';
import { Triangle } from "react-loader-spinner";
import Search from '../search/Search';


const CharactersList = () => {
    const [open, setOpen] = useState(false);
    const [selectedChar, setSelectedChar] = useState(null);

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8;

    const [_, setLikedCharacters] = useState(false);
    const [clickedHeart, setClickedHeart] = useState(null);

    const dispatch = useDispatch();
    const { characters, searchRequest, loading, error } = useSelector((state) => state.characters);
    const { favoriteItems } = useSelector((state) => state.favorite);


    useEffect(() => {
        dispatch(fetchCharacters());
    }, [dispatch]);

    useEffect(() => {//сброс страницы на первую при смене фильтра,поиска или сортировки
        setCurrentPage(1);
    }, [searchRequest]);

    // useEffect(() => {
    //     console.log(characters);
    // }, [characters]);

    const handleReadMore = (char) => {
        setSelectedChar(char);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setSelectedChar(null);
    };

    const isLiked = (id) => {
        return favoriteItems.some(item => item.id === id);
    };

    const toggleLike = (id) => {
        setLikedCharacters((prev) => ({
            ...prev,
            [id]: !prev[id]
        }));

        setClickedHeart(id);
        setTimeout(() => setClickedHeart(null), 400);
    };

    const filteredProducts = characters.filter((product) => product.name.toLowerCase().includes(searchRequest.toLowerCase()));

    //пагинация
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentCharacters = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);
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
                {currentCharacters.map((character) => (
                    <div key={character.id}>
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
                            <CardMedia
                                component="img"
                                image={`${character.thumbnail.path}.${character.thumbnail.extension}`}
                                alt={character.name}
                                sx={{ objectFit: 'contain', height: "350px", minWidth: '280px' }}
                            />

                            <CardContent sx={{ display: "flex", justifyContent: 'space-between', flexDirection: "column", minHeight: '120px' }} >
                                <div className='product-title-cart'>
                                    <div>{character.name}</div>
                                </div>

                                <div className='btn-group'>
                                    <Button
                                        onClick={() => handleReadMore(character)}
                                        variant="outlined"
                                        style={{ borderRadius: '10px', color: '#00bfff' }}
                                    >
                                        Read More
                                    </Button>

                                    <Button
                                        onClick={() => {
                                            dispatch(addToFavorite(character));
                                            toggleLike(character.id);
                                        }}
                                        variant="outlined"
                                        style={{
                                            color: '#00bfff',
                                            backgroundColor: isLiked(character.id) ? '#00bfff' : 'transparent',
                                            borderRadius: '50%',
                                            padding: '6px',
                                            cursor: 'pointer',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center'
                                        }}
                                    >
                                        <FaRegHeart
                                            className={`heart-icon ${clickedHeart === character.id ? 'clicked' : ''}`}
                                            style={{
                                                color: isLiked(character.id) ? 'white' : '#00bfff',
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
            <CharInfo
                open={open}
                handleClose={handleClose}
                char={selectedChar}
                toggleLike={toggleLike}
                isLiked={isLiked}
            />
        </div>
    );
}

export default CharactersList;