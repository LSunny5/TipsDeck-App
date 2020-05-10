import React from 'react';
import './Tip.css';
import TipsDeckContext from '../../TipsDeckContext';
import { findTip, getCategoryName } from '../../TipsDeckHelpers';
import { NavLink } from 'react-router-dom'
import Rating from '../Rating/Rating';

class Tip extends React.Component {
    static contextType = TipsDeckContext;

    handleClickDelete = (cName) => {
        const { id } = this.props.match.params;
        this.context.deleteTip(id)
        this.props.history.push(`/Category/${cName}`)
    }

    handleClickCancel = () => {
        alert('Tip was not deleted');
    }

    render() {
        const { tips = [], categories = [] } = this.context;
        const { id } = this.props.match.params;
        const targetTip = findTip(tips, id) || {};
        const cat = getCategoryName(categories, targetTip.category) || {};

        return (
            <section className="TipContainer">
                <h1 className="tipTitle">{targetTip.name}</h1>
                <h2 className="catName">{cat.name}</h2>
                
                <Rating value={targetTip.rating} />            

                <div className="tipText">
                    <p className="bold lefttext">Description: </p>
                    {targetTip.description}
                </div>
                <div className="tipText">
                    <p className="bold lefttext">Directions: </p>
                    {targetTip.directions}
                </div>
                <div className="tipText sourceBox">
                    <p className="bold lefttext">Source: </p>
                    <a target='_blank' rel="noopener noreferrer" href={targetTip.sourceURL}>
                        {targetTip.sourceTitle}
                    </a>
                </div>

                <div className="buttonBox">
                    <NavLink
                        className="editTipButton"
                        to={`/Category/${cat.name}/${id}/editTip`}
                    >
                        Edit
                    </NavLink>

                    <button
                        className="deleteTipButton"
                        type='button'
                        onClick={() => {
                            if (window.confirm('Are you sure you wish to delete the tip?') ? this.handleClickDelete(cat.name) : this.handleClickCancel())
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

export default Tip;
