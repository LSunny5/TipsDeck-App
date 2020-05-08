import React from 'react';
import './NavBar.css';
//import { Link } from 'react-router-dom';

class NavBar extends React.Component {
    render() {
        return (
            <nav role="navigation" className="navBar">
                <p>Navigation bar goes here</p> 
                
                
                {/* 
                <nav role="navigation" className="navBar">
                <ul>
                    <li class="backList">
                        <a href="javascript:history.back()">
                            <img alt="Go back" src="/images/backarrow.png" class="logoImage back" />
                            <div>Back</div>
                        </a>
                    </li>
                    <li>
                        <a href="Categories.html">
                            <img alt="Categories Icon" src="/images/CategoriesIcon.png" class="logoImage" />
                            <div>Categories</div>
                        </a>
                    </li>
                    <li>
                        <a href="#">
                            <div class="dropdown">
                                <button class="dropButton"><img alt="Search Logo" src="/images/MagnifyingIcon.png"
                                    class="logoImage" /></button>
                                <div class="dropdown-content">
                                    <form class="searchBar" action="SearchResults.html">
                                        <input type="text" placeholder=" Search for tips here..." name="search" class="searchField" />
                                        <button type="submit" class="searchButton">Search</button>

                                    </form>
                                </div>
                            </div>
                            <div>Search</div>
                        </a>
                    </li>
                    <li>
                        <a href="RandomPage.html" class="randomIcon">
                            <img alt="Random Logo" src="/images/dice.png" class="logoImage" />
                            <div>Random</div>
                        </a>
                    </li>
                    <li>
                        <a href="AddTip.html" class="addIcon">
                            <img alt="Plus Logo" src="/images/PlusSymbol.png" class="logoImage" />
                            <div>Add Tip</div>
                        </a>
                    </li>
                </ul> */}
            
            
            
            </nav>
        );
    }
}

export default NavBar;