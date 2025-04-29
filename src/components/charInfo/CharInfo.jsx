import React from 'react'
import { Box, Button, Modal } from '@mui/material';
import { FaPlus } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { addToFavorite } from '../../redux/favoriteSlice';
import './../comicInfo/style.css';


const CharInfo = ({ open, handleClose, char, toggleLike, isLiked }) => {
    const dispatch = useDispatch();

    if (!char) return null;

    return (
        <Modal onClose={handleClose}
            open={open}
            className="comic-card"
        >
            <Box
                sx={{
                    display: 'flex',
                    gap: '15px',
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 900,
                    bgcolor: 'rgb(32, 32, 32)',
                    border: '2px solid #555555',
                    boxShadow: '0 10px 30px rgba(0, 191, 255, 0.5)',
                    p: 4,
                    color: 'white',
                    borderRadius: '16px'
                }}
            >
                <div className="comic-info">
                    <h2 style={{ marginBottom: '0px' }}>{char.name}</h2>
                    <div className='information-link'>
                        <a href={char.urls[0]?.url} alt='homepage-link'>
                            <Button variant="outlined" style={{ borderRadius: '15px', color: '#00bfff' }}>Homepage</Button>
                        </a>
                        <a href={char.urls[0]?.url} alt='homepage-wiki'>
                            <Button variant="outlined" style={{ borderRadius: '15px', color: '#00bfff' }}>Wiki</Button>
                        </a>
                    </div>
                    <div>
                        <h2 style={{ marginBottom: '0px' }}>Description:</h2>
                        {char.description ? `${char.description.slice(0, 150)}...` : 'No description for this character'}
                    </div>
                    <ul>
                        <h2>Comics:</h2>
                        {char.comics.items.slice(0, 6).map((c, i) => {
                            return (
                                <li key={i}>- {c.name},</li>
                            )
                        })}
                    </ul>

                    <Button
                        onClick={() => {
                            dispatch(addToFavorite(char));
                            toggleLike(char.id);
                        }}
                        variant="outlined"
                        style={{     
                            backgroundColor: isLiked(char.id) ? '#00bfff' : 'transparent',
                            borderRadius: '10px',
                            height: '40px', 
                            width: '40px' 
                        }}
                    >
                        <FaPlus style={{ color: 'white' }} />
                    </Button>
                </div>

                <div className="comic-image">
                    <img src={`${char.thumbnail.path.replace('http://', 'https://')}.${char.thumbnail.extension}`} alt={char.title} />
                </div>
            </Box>
        </Modal>
    )
}

export default CharInfo;