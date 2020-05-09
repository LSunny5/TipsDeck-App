import React from 'react';
import './CategoryTips.css';
import TipsDeckContext from '../../TipsDeckContext';
import { getTips, getCategoryId} from '../../TipsDeckHelpers';
import { NavLink } from 'react-router-dom';

//List all the tips from the Category
class CategoryTips extends React.Component {
    static contextType = TipsDeckContext;

    render() {
        const { tips = [], categories = [] } = this.context;
        const { name } = this.props.match.params;
        //category ID to be used to search for the tips in the category
        let cat = getCategoryId(categories, name) || {};
        //get the list of tips for each category
        let categoryTips = getTips(tips, cat.id);

        return (
            <section className="CategoryTipsBox">
                <h1>{name}</h1>

                <div className="TipsBox">
                    {(categoryTips.length > 0) ? (
                        categoryTips.map(tip =>
                            <NavLink
                                key={tip.id}
                                to={`/Category/${name}/${tip.id}`}
                                className="TipLink">
                                <h2 className="tName">{tip.name}</h2>
                                <p className="tipDesc">{tip.description}</p>
                            </NavLink>
                        )) : (
                            <div className="noTips">
                                Sorry there are no tips at this time.
                            </div>)}
                </div>
            </section>
        );
    };
}

export default CategoryTips;