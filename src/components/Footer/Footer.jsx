import React from "react";
import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";
import './Footer.css'; // Assuming you have a CSS file for styles
import { FaMapLocationDot } from 'react-icons/fa6';
import { assets } from '../../assets/assets';

const FooterLinks = [
    {
        title: "La marque AS Shop",
        link: "/#",
    },
    {
        title: "Notre Histoire",
        link: "/#",
    },

];
const Footer = () => {
    return (
        
        <footer className="footer-container">
            <div className="container">
                <div>
                    {/* Company details */}
                    <div >
                        <h1 className="footer-title">
                            <img src={assets.logo} alt="logo" className='logo' />

                            AS Shop
                        </h1>
                        <p className="footer-description">
                            AS Shop est une boutique en ligne de vêtements crée par Asma et Salma, <br />offrant des pièces
                            tendance et de qualité.
                        </p>
                    </div>

                    {/* Footer Links */}
                    <div className="links-container">
                        <div className="link-section">
                            <h1 className="footer-links-title">A PROPOS</h1>
                            <ul className="flex flex-col gap-3">
                                {FooterLinks.map((link) => (
                                    <li className="footer-link" key={link.title}>
                                        <span>{link.title}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>


                        {/* Social links */}
                        <div>
                            <div>
                                <div className="social-icons ">
                                    <a href="#">
                                        <FaInstagram className=" social-icon" />
                                    </a>
                                    <a href="#">
                                        <FaFacebook className=" social-icon" />
                                    </a>
                                    <a href="#">
                                        <FaLinkedin className=" social-icon" />
                                    </a>
                                </div>
                            </div>

                            <div className="">
                                <p>
                                    <FaMapLocationDot className="location-icon" /> - Adresse :
                                    AsShop - Boutique en ligne
                                    Tunis, Ariana, Tunisie
                                </p>
                            </div>

                        </div>

                    </div>

                </div>
                <hr />
                <p className="copyright">
                    Copyright © 2024. Tous droits réservés par AS Shop-GROUP
                </p>
            </div>
        </footer>
    );
};

export default Footer;
