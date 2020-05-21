import React from 'react';
import './Tip.css';
import TipsDeckContext from '../../TipsDeckContext';
import { findTip, getCategoryName } from '../../TipsDeckHelpers';
import { NavLink } from 'react-router-dom'
import Rating from '../Rating/Rating';
import PropTypes from 'prop-types';
import config from '../../config';

class Tip extends React.Component {
    static contextType = TipsDeckContext;


    handleClickDelete = (cName) => {
        const { id } = this.props.match.params;

        //fetch code here for note
        fetch(`${config.APIEndpoint}/Tips/${id}`, {
            method: 'DELETE',
            headers: {
                'content-type': 'application/json'
            },
        })
            .then(response => {
                if (!response.ok)
                    return response.json().then(error => Promise.reject(error))
                return response
            })
            .then(() => {
                this.context.deleteTip(id);
                this.props.history.push(`/Category/${cName}`);
                window.location.reload();
            })
            .catch(error => {
                alert('Could not delete note:  ' + error);
            })
    }

    handleClickCancel = () => {
        alert('Tip was not deleted');
    }

    render() {
        const { tips = [], categories = [] } = this.context;
        const { id } = this.props.match.params;
        const targetTip = findTip(tips, id) || {};
        const cat = getCategoryName(categories, targetTip.category_id) || {};

        return (
            <section className="TipContainer">
                <h1 className="tipTitle">{targetTip.tipname}</h1>
                <h2 className="catName">{cat.category}</h2>

                <Rating value={targetTip.rating} />

                <div className="tipText">
                    <p className="bold lefttext">Description: </p>
                    {targetTip.tipdescription}
                </div>
                <div className="tipText">
                    <p className="bold lefttext">Directions: </p>
                    {targetTip.directions}
                </div>
                <div className="tipText sourceBox">
                    <p className="bold lefttext">Source: </p>
                    <a target='_blank' rel="noopener noreferrer" href={targetTip.sourceurl}>
                        {targetTip.sourcetitle}
                    </a>
                </div>

                <div className="buttonBox">
                    <NavLink
                        className="editTipButton"
                        to={`/Category/${cat.category}/${id}/editTip`}
                    >
                        Edit
                    </NavLink>

                    <button
                        className="deleteTipButton"
                        type='button'
                        onClick={() => {
                            if (window.confirm('Are you sure you wish to delete the tip?') ?
                                this.handleClickDelete(cat.category) : this.handleClickCancel())
                                this.handleClickCancel()
                        }}
                        aria-pressed='false'
                        aria-label='delete tip button'
                    >
                        Delete
                    </button>
                </div>
            </section>
        );
    }
}

Tip.propTypes = {
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
    id: PropTypes.number,
};

export default Tip;