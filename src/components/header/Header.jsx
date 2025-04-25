import { Button } from '@mui/material';
import React from 'react'
import { CiLogin } from "react-icons/ci";
import { IoMdPersonAdd } from "react-icons/io";
// import { FaGithub } from "react-icons/fa";
import { CiBookmarkPlus } from "react-icons/ci";
import { Link } from 'react-router-dom';
import './style.css';
import { useSelector } from 'react-redux';



const Header = () => {
    const favorite = useSelector((state) => state.favorite.favoriteItems);

    return (
        <div className='container-xl'>
            <div className='wrapper'>
                <div className='logo-marvel'>
                    <img src="/assets/Avengers.png" alt="header-img" />
                </div>
                <div>
                    <Link to={'/'} >
                        <h3>MARVEL</h3>
                    </Link>

                </div>
                <div className='navigation'>
                    <a href="/" className='navigation-item'>Home</a>
                    <Link to='/characters' className='navigation-item'>Cheracters</Link>
                    <Link to='/comics' className='navigation-item'>Comics</Link>
                </div>
                <div className='log'>
                    <Link to='./favorite'>
                        <Button variant="outlined" style={{ color: '#00bfff', backgroundColor: 'rgb(32, 32, 32)' }}><CiBookmarkPlus /><span style={{marginLeft: '5px'}}>{favorite.length === 0 ? null : favorite.length}</span><p>Favorite</p></Button>
                    </Link>
                    <Link to='./login'>
                        <Button variant="outlined" style={{ color: 'white', backgroundColor: 'rgb(32, 32, 32)' }}><CiLogin /><p>Login</p></Button>
                    </Link>
                    <Link to='./registration'>
                        <Button variant="outlined" style={{ color: 'white', backgroundColor: 'rgb(32, 32, 32)' }}><IoMdPersonAdd /> <p>Sign Up</p></Button>
                    </Link>
                </div>
            </div>
        </div>

    )
}

export default Header;