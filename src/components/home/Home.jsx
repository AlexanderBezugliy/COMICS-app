import React from 'react'
import './style.css';
import Footer from '../footer/Footer';
import { Link } from 'react-router-dom';


const Home = () => {

    return (
        <div className="home">
            <div className='container'>
                <div className="home-header">
                    <h1 className="home-title">Welcome to the Marvel Universe!</h1>
                    <p className="home-description">Explore the world of Marvel comics, characters, and stories.</p>
                </div>
                <div className="home-content">
                    <div>
                        <h2 className="home-text">Dive into the action-packed adventures of your favorite superheroes and villains. <br />
                            Discover their stories, powers, and the epic battles that shape the Marvel Universe.</h2>

                        <p className="home-description-text">You can also buy rare comics and cards with rare characters. <br />
                            All products correspond to the original. <br />
                            Some comics may not have a price, in which case it is worth checking with the manager. <br />
                            <span><i>Also, upon registration there is a 5% discount!</i></span>
                        </p>
                    </div>

                    <div>
                        <Link to="/characters">
                            <img src="/assets/vision.png" alt="Marvel Universe" className="home-image" />
                        </Link>

                    </div>
                </div>
            </div>

            <Footer />
        </div>
    )
}

export default Home;