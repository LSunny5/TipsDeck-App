import React from 'react';
import './CategoryTips.css';
import TipsDeckContext from '../../TipsDeckContext';

class CategoryTips extends React.Component {
    static contextType = TipsDeckContext;
    
    
    render() {
       // const { categories = [] } = this.context;
        const {name} = this.props.match.params;
        return (
            <section className="CategoryTipsBox">
           




                <h1>{name}</h1>
            </section>
        );
    };
}

export default CategoryTips;