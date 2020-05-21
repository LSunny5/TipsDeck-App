import React from 'react';
import './CategoryTips.css';
import TipsDeckContext from '../../TipsDeckContext';
import { getTips, getCategoryId} from '../../TipsDeckHelpers';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

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
                                <h2 className="tName">{tip.tipname}</h2>
                                <p className="tipDesc">{tip.tipdescription}</p>
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

CategoryTips.propTypes = {
    categories: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        category: PropTypes.string.isRequired,
      })
    ),
    tips: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        category_id: PropTypes.number.isRequired,
        tipname: PropTypes.string.isRequired,
        tipdescription: PropTypes.string.isRequired,
        directions: PropTypes.string.isRequired,
        sourcetitle: PropTypes.string,
        sourceurl: PropTypes.string,
        rating: PropTypes.number.isRequired,
        numraters: PropTypes.number.isRequired,
      })
    ),
    name: PropTypes.string,
  };

export default CategoryTips;