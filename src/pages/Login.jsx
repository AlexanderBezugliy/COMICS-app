import React from 'react'
import './style.css';
import { Link } from 'react-router-dom';


const Login = () => {

    return (
        <div className="login-container">
            <div className="login-wrapper">
                <form action="">
                    <h1><strong>Login</strong></h1>
                    <div className="input-box">
                        <input type="text" placeholder="Username" />
                    </div>

                    <div className="input-box">
                        <input type="password" placeholder="Username" />
                    </div>

                    <div className="remember-forgot">
                        <label>
                            <input type="checkbox" placeholder="Username" /> Remember Me
                        </label>
                        <Link to="/registration">Forget Password</Link>
                    </div>

                    <button type="submit">Login</button>

                    <div className="register-link">
                        <p>don`t have an account? <Link to="/registration">Register</Link></p>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login