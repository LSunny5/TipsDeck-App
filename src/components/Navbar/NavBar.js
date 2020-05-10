import React from 'react';
import './NavBar.css';
import { NavLink } from 'react-router-dom';
import TipsDeckContext from '../../TipsDeckContext';
import Tipcard from '../TipCard/Tipcard'

class NavBar extends React.Component {
    static contextType = TipsDeckContext;
    constructor() {
        super();
        this.state = {
            search: ''
        };
    }

    updateSearch(event) {
        this.setState({ search: event.target.value.substr(0, 20) });
    }

    render() {
        let term = this.state.search.toLowerCase().trim();
        let filteredTips = [];
        if (term.length !== 0) {
            filteredTips = this.context.tips.filter(tip => {
                return (
                    (tip.description.toLowerCase().indexOf(term) !== -1)
                    || (tip.name.toLowerCase().indexOf(term) !== -1)
                    || (tip.directions.toLowerCase().indexOf(term) !== -1)
                );
            })
        }

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
                <div className="categoryIcon">
                    <div className="dropdown" >
                        <button className="dropButton">
                            <img alt="Search Logo" src="/images/MagnifyingIcon.png" className="logoImage" />
                        </button>
                        <div className="dropdown-content">
                            <div className="searchBar">
                                <input
                                    type="text"
                                    value={this.state.search}
                                    placeholder=" Search for tips here..."
                                    name="search"
                                    className="searchField"
                                    onChange={this.updateSearch.bind(this)}
                                />
                            </div>
                            <div className="searchResultsBox">
                                {filteredTips.map((tip) => {
                                    return (
                                        <Tipcard
                                            key={tip.id}
                                            id={tip.id}
                                            name={tip.name}
                                            cat={tip.category}
                                        />
                                    )
                                })
                                }
                            </div>
                            
                            {/* 
                            ***Maybe implement later to make dynamic search page

                            <NavLink to={`/SearchResults`}>
                                Search Page
                            </NavLink> */}

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