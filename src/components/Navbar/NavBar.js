import React from 'react';
import './NavBar.css';
import { NavLink } from 'react-router-dom';

class NavBar extends React.Component {
    render() {
        return (
            <nav role="navigation" className="navBar">
                <button
                    className="categoryIcon backButton"
                    onClick={() => this.props.history.goBack()}>
                    <img src="/images/backarrow.png" alt="Go back" className="logoImage back" />
                    <div className="buttonName">Back</div>
                </button>
                <NavLink
                    className="categoryIcon"
                    to={`/Category`}>
                    <img src="/images/CategoriesIcon.png" alt="Categories Icon" className="logoImage" />
                    <div className="buttonName">Categories</div>
                </NavLink>
                <div
                    className="categoryIcon"
                    to={`/`}>
                    <div className="dropdown">
                        <button className="dropButton">
                            <img alt="Search Logo" src="/images/MagnifyingIcon.png" className="logoImage" />
                        </button>
                        <div className="dropdown-content">
                            <form className="searchBar" action="SearchResults.html">
                                <input type="text" placeholder=" Search for tips here..." name="search" className="searchField" />
                                <button type="submit" className="searchButton" onClick={() => this.props.push(`/SearchResults`)}>
                                    <img alt="Search Logo" src="/images/MagnifyingIcon.png" className="searchImage" />
                                </button>
                            </form>
                        </div>
                    </div>
                    <div className="buttonName">Search</div>
                </div>
                <NavLink
                    className="categoryIcon randomIcon"
                    to={`/Random`}>
                    <img src="/images/dice.png" alt="Random Logo" className="logoImage" />
                    <div className="buttonName">Random</div>
                </NavLink>
                <NavLink
                    className="categoryIcon addIcon"
                    to={`/addTip`}>
                    <img src="/images/PlusSymbol.png" alt="Plus Logo" className="logoImage" />
                    <div className="buttonName">Add Tip</div>
                </NavLink>
            </nav>
        );
    }
}

export default NavBar;