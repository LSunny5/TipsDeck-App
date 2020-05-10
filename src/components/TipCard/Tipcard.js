import React from 'react';
import './Tipcard.css';
import { Link } from 'react-router-dom';
import TipsDeckContext from '../../TipsDeckContext'
import { getCategoryName } from '../../TipsDeckHelpers';

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

export default Tipcard;