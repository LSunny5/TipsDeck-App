import React from 'react';
import './Category.css';
import { Link } from 'react-router-dom';
import TipsDeckContext from '../../TipsDeckContext';

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
                                    pathname: `/Category/${category.name}`, 
                                    state: category.name
                                }}
                                className="categoryName">
                                <div className="categoryButton">
                                    {category.name}
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

export default Category;