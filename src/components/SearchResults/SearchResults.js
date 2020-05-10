import React from 'react';
import './SearchResults.css';
import TipsDeckContext from '../../TipsDeckContext';
import Tip from '../Tip/Tip';

class SearchResults extends React.Component {
    static contextType = TipsDeckContext;



    render() {
        const {tips =[]} = this.context;
        return (
            <section className="SearchContent">
                <h1>Search Results</h1>

                
            </section>
        );
    }
}

export default SearchResults;