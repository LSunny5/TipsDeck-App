import React from 'react';
import './Landing.css';
import { NavLink } from 'react-router-dom'

/*Landing Page code*/
class LandingPage extends React.Component {
    render() {
        return (
            <section className="LandingContent">
                <h1>TipsDeck</h1>
                <img src='images/TipsDeckLogo.png' className="landingLogo" alt="TipsDeck Logo"/>
                <div>
                    <p className="description">TipsDeck is a collection of tips and life hacks from all over that can help optimize everday life.  In Japan, the word to describe this is Urawaza, which means secret trick.  From topics in beauty, cleaning, gardening, and even dealing with kids, TipsDeck can be your go-to for quick solutions to your everyday problems.</p>
                    <NavLink to="/Category" className="letsGoButton">Let's Go!</NavLink>
                </div>
                <div className="landingFooter">
                    Created by Sunny Lee
                </div>
            </section>
        );
    }
}

export default LandingPage;