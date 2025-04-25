import React from 'react'
import './style.css';
import { Box, Button, Modal } from '@mui/material';
import { FaPlus } from 'react-icons/fa';


const ComicInfo = ({ open, handleClose, comic }) => {
    if (!comic) return null;

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
                    <h2 style={{ marginBottom: '0px' }}>{comic.title}</h2>
                    <div>
                        <h2 style={{ marginBottom: '0px' }}>Description: </h2>
                        {comic.description || "There is no description..."}
                    </div>
                    <p>
                        <strong style={{ color: '#00bfff' }}>Pages: </strong>
                        {comic.pageCount ? `${comic.pageCount} pages` : "No information about the number of pages"}
                    </p>
                    <p>
                        <strong style={{ color: '#00bfff' }}>Language: </strong>
                        {comic.textObjects[0]?.language || "en-us"}
                    </p>
                    <p>
                        <strong style={{ color: '#00bfff' }}>Price: </strong>
                        {comic.prices[0].price ? `${comic.prices[0].price}` : "Сheck the price with the manager"}
                    </p>

                    <Button
                        // onClick={(e) => {
                        //     e.stopPropagation();
                        //     dispatch(addToCart(product))
                        // }}
                        variant="outlined"
                        style={{ borderRadius: '10px', color: '#00bfff', height: '40px', width: '40px' }}
                    >
                        <FaPlus />
                    </Button>
                </div>

                <div className="comic-image">
                    <img src={`${comic.thumbnail.path.replace('http://', 'https://')}.${comic.thumbnail.extension}`} alt={comic.title} />
                </div>
            </Box>
        </Modal>
    )
}

export default ComicInfo;