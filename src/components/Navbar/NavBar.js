import React from 'react';
import './NavBar.css';
import { NavLink } from 'react-router-dom';
import TipsDeckContext from '../../TipsDeckContext';
import Tipcard from '../TipCard/Tipcard'

//Header and navigation bar component and css
class NavBar extends React.Component {
    static contextType = TipsDeckContext;
    constructor() {
        super();
        this.state = {
            search: '',
            filteredTips: [],
        };
    }

    updateSearch(event) {
        this.setState({ search: event.target.value.substr(0, 20) });
    }

    handleClick = () => {
        this.setState({ search: '' });
    }

    render() {
        let term = this.state.search.toLowerCase().trim();
        let filteredTips = [];
        if (term.length !== 0) {
            filteredTips = this.context.tips.filter(tip => {
                return (
                    (tip.tipdescription.toLowerCase().indexOf(term) !== -1)
                    || (tip.tipname.toLowerCase().indexOf(term) !== -1)
                    || (tip.directions.toLowerCase().indexOf(term) !== -1)
                );
            })
        }

        return (
            <nav role="navigation" className="navBar" onClick={this.handleClick}>
                <button
                    className="categoryIcon backButton"
                    onClick={() => this.props.history.goBack()}>
                    <img src="/images/backarrow.png" alt="Go back" className="logoImage back" />
                    <div className="buttonName">Back</div>
                </button>
                <NavLink
                    className="categoryIcon catButton"
                    to={`/Category`}>
                    <img src="/images/CategoriesIcon.png" alt="Categories Icon" className="logoImage" />
                    <div className="buttonName">Categories</div>
                </NavLink>
                <div className="categoryIcon searchContainer">
                    <div className="dropdown" >
                        <button className="dropButton">
                            <img alt="Search Logo" src="/images/MagnifyingIcon.png" className="logoImage" />
                            <div className="buttonName">Search</div>
                        </button>
                        <div className="dropdown-content">
                            <div className="searchResultsBox" >
                                <div className="searchBar" >
                                    <label htmlFor="search">Enter search here...</label>
                                    <input
                                        type="text"
                                        autoComplete="off"
                                        value={this.state.search}
                                        placeholder=" Search for tips here..."
                                        name="search"
                                        className="searchField"
                                        onChange={this.updateSearch.bind(this)}
                                    />
                                </div>
                                <div className = "results" onClick={this.handleClick}>
                                {filteredTips.map((tip) => {
                                    return (
                                        <Tipcard
                                            key={tip.id}
                                            id={tip.id}
                                            name={tip.tipname}
                                            cat={tip.category_id}
                                        />
                                    )
                                })
                                }
                                </div>
                            </div>
                        </div>
                    </div>
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