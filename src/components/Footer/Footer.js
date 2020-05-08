import React from 'react';
import './Footer.css';
import { Link } from 'react-router-dom';

class Footer extends React.Component {
    render() {
        return (
            <footer className="footer">
                <div className="footerLogo">
                    <Link to="/">
                        <img alt="TipsDeck Logo" src='./images/TipsDeckLogo.png' className="footerImage" />
                    </Link>
                </div>
                <div className="footerNote">Created by Sunny Lee</div>
            </footer>
        );
    }
}

export default Footer;
