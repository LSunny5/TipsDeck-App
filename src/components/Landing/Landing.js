import React from 'react';
import './Landing.css';
import { NavLink } from 'react-router-dom'

/*Landing Page code*/
class LandingPage extends React.Component {
    render() {
        return (
            <section className="LandingContent landingbg">
                <img src='images/TipsDeckLogo.png' className="landingLogo" alt="TipsDeck Logo" />
                <h1 className="LandingHeading">
                    TipsDeck
                </h1>
                <div>
                    <p className="description">TipsDeck is a collection of tips and life hacks that aim to help optimize everday life.  From topics in beauty, cleaning, childcare, and more TipsDeck can be your go-to for alternative quick solutions for everyday needs with the tools you have on hand.</p>
                    <div id="letsGoContainer">
                        <NavLink to="/Category" className="letsGoButton">
                            <span className="circle" aria-hidden="true">
                                <span className="icon arrow"></span>
                            </span>
                            <span className="button-text">Let's Go </span>
                        </NavLink>
                    </div>
                </div>
                <p className="landingFooter">
                    Created by Sunny Lee
                </p>
            </section>
        );
    }
}

export default LandingPage;