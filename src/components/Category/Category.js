import React from 'react';
import './Category.css';
import { Link } from 'react-router-dom';
import TipsDeckContext from '../../TipsDeckContext';
import PropTypes from 'prop-types';

//Shows a list of categories a user may select from
class Category extends React.Component {
    static contextType = TipsDeckContext;

    render() {
        const { categories = [] } = this.context;
        return (
            <section className="Categories">
                <h1>Categories</h1>
                <h2>Choose a category </h2>
                <div className="categoryBox">
                    {/* map out all the categories from the file/database */}
                    {(categories.length > 0) ? (
                        categories.map(category =>
                            <Link key={category.id}
                                to={{
                                    pathname: `/Category/${category.category}`,
                                }}
                                className="categoryName">
                                <div className="categoryButton">
                                    {category.category}
                                </div>
                            </Link>
                        )) : (
                            <div className="noCategories">
                                No categories found
                            </div>)}
                </div>
            </section>
        );
    };
}

Category.propTypes = {
    categories:
        PropTypes.arrayOf(
            PropTypes.shape({
                id: PropTypes.number.isRequired,
                category: PropTypes.string.isRequired
            })
        ),
};

export default Category;