import React from 'react';
import './Footer.css';
import { NavLink } from 'react-router-dom';

class Footer extends React.Component {
    render() {
        if (window.location.pathname === '/') return null;

        return (
            <footer className="footer">
                <div className="footerLogo">
                    <NavLink to="/">     
                        <img alt="TipsDeck Logo" src={process.env.PUBLIC_URL + '/images/TipsDeckLogo.png'} className="footerImage" />
                    </NavLink>
                </div>
                <div className="footerNote">Created by Sunny Lee</div>
            </footer>
        );
    }
}

export default Footer;