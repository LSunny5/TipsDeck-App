import React from 'react';
import './Tipcard.css';
import { Link } from 'react-router-dom';
import TipsDeckContext from '../../TipsDeckContext'
import { getCategoryName } from '../../TipsDeckHelpers';
import PropTypes from 'prop-types';

//component that gets called for each of the search results that returns a card with the name
class Tipcard extends React.Component {
    static contextType = TipsDeckContext;

    render() {
        const {categories = [] } = this.context;
        const { id, name, cat } = this.props;

        const temp = getCategoryName(categories, cat) || {};

        return (
            <div className="Tipbox">
                <Link 
                    to={`/Category/${temp.name}/${id}`} 
                    className="tipLink"
                >
                    <p className="cardName">
                        {name}
                    </p>
                </Link>
            </div>
        )
    }
}

Tipcard.propTypes = {
    categories: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        category: PropTypes.string.isRequired,
      })
    ),
    id: PropTypes.number, 
    name: PropTypes.string, 
    cat: PropTypes.number,
  };

export default Tipcard;