import React from 'react'
import './style.css';
import { Button, TextField } from '@mui/material';
import { FaGithub } from 'react-icons/fa';
import { FaArrowRight } from "react-icons/fa";
import { GiHeavyArrow } from "react-icons/gi";
import { AiOutlineDingding } from "react-icons/ai";
import { GiMagicGate } from "react-icons/gi";
import { GiMagicSwirl } from "react-icons/gi";


const Footer = () => {

    return (
        <div className="footer">
            <div className="container">
                <div className="footer-top">
                    <div className="footer-section terms">
                        <div className="terms-links">
                            <a href="#">
                                <strong className="glow-green">Terms</strong>
                            </a>

                            <GiHeavyArrow className="icon-glow" />

                            <a href="#">
                                <strong className="glow-green">Privacy Policy</strong>
                            </a>
                        </div>
                        <div>
                            <img src="/assets/mjolnir.png" alt="mjolnir" />
                        </div>
                    </div>

                    <div className="footer-section products">
                        <div className="section-header">
                            <p><strong className="glow-green">Products</strong></p>
                            <AiOutlineDingding className="icon-glow" />
                        </div>

                        <ul>
                            <li><a href="#">Web Studio</a></li>
                            <li><a href="#">DynamicBox Flex</a></li>
                            <li><a href="#">Programming Forms</a></li>
                            <li><a href="#">Integrations</a></li>
                            <li><a href="#">Command-line</a></li>
                        </ul>
                    </div>

                    <div className="footer-section resources">
                        <div className="section-header">
                            <strong className="glow-green">Resources</strong>
                            <GiMagicGate className="icon-glow" />
                        </div>

                        <ul>
                            <li><a href="#">Documentation</a></li>
                            <li><a href="#">Tutorials & Guides</a></li>
                            <li><a href="#">Blog</a></li>
                            <li><a href="#">Support Center</a></li>
                            <li><a href="#">Partners</a></li>
                        </ul>
                    </div>

                    <div className="footer-section company">
                        <div className="section-header">
                            <strong className="glow-green">Company</strong>
                            <GiMagicSwirl className="icon-glow" />
                        </div>

                        <ul>
                            <li><a href="#">Home</a></li>
                            <li><a href="#">About us</a></li>
                            <li><a href="#">Company values</a></li>
                            <li><a href="#">Pricing</a></li>
                            <li><a href="#">Privacy Policy</a></li>
                        </ul>
                    </div>
                    
                    <div className="footer-section subscribe">
                        <div className="section-header">
                            <h3><strong>Subscribe</strong></h3>
                        </div>

                        <div className="subscribe-form">
                            <TextField id="filled-basic" label="Your email" variant="filled" className="email-input" sx={{ backgroundColor: 'white' }} />
                            
                            <button type="submit">
                                <FaArrowRight />
                            </button>
                        </div>

                        <p className="subscribe-note">
                            (get the latest news and articles to your inbox every month)
                        </p>
                    </div>
                </div>
                <div className="footer-bottom">
                    <a href="https://github.com/AlexanderBezugliy" className="github-link">
                        <Button variant="outlined" className="github-button">
                            <p>Made with <span className="heart">♥</span> by <strong>Alexander</strong></p>
                            <FaGithub className="git" />
                        </Button>
                    </a>
                </div>
            </div>
        </div>
    )
}

export default Footer;