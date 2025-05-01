import React from 'react'
import { Col, Container, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import './style.css';
import { removeFromFavorite } from '../../redux/favoriteSlice';
import { Button, CircularProgress } from '@mui/material';


const Favorite = () => {
    const dispatch = useDispatch();
    const { favoriteItems, loading, error } = useSelector((state) => state.favorite);

    if (loading) {
        return (
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "80vh" }}>
                <CircularProgress size={100} thickness={4} sx={{ color: "#00bfff" }} />
            </div>
        );
    }
    if (error) return <p style={{ color: 'red' }}>Error: {error}</p>;

    return (
        favoriteItems.length > 0 ? (
            <Container className="card-collection-container">
                <div className="collection-header">
                    <h2 className="collection-title">My Favorite:</h2>
                    <p className="collection-description">(Here are your favorite comics. Click on the "Remove" button to remove a comic from your favorites)</p>
                </div>
                <Row className="g-4">
                    {favoriteItems.map(item => (
                        <Col key={item.id} xs={12} sm={6} md={4} lg={3}>
                            <div className="card-item">
                                <img
                                    src={`${item.thumbnail.path}.${item.thumbnail.extension}`}
                                    alt={item.title || item.name}
                                    className="card-img"
                                />

                                <div className="card-content">
                                    <div>
                                        <h5 className="card-title">{item.title || item.name}</h5>
                                    </div>

                                    <Button
                                        onClick={() => dispatch(removeFromFavorite(item.id))}
                                        className="btn remove-btn"
                                    >
                                        Remove
                                    </Button>
                                </div>
                            </div>
                        </Col>
                    ))}
                </Row>
            </Container>
        ) : (
            <div className='container'>
                <div className="empty-cart">
                    <div className="image-wrapper">
                        <img src="/assets/emptycart.png" alt="emptycart.png" />
                        <div className="hover-text">Favorite is empty...</div>
                    </div>
                </div>
            </div>
        )
    )
}

export default Favorite;