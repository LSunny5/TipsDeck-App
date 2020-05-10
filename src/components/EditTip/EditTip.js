import React from 'react';
import './EditTip.css';
import TipsDeckContext from '../../TipsDeckContext';
import { findTip, getCategoryName } from '../../TipsDeckHelpers';
import { NavLink } from 'react-router-dom';

//Edit the Tip Information
class EditTip extends React.Component {
    static contextType = TipsDeckContext;
    
    handleUpdate = event => {
        const { title, value } = event.target;
        this.setState({ [title]: value.trim() });
    }

    handleClickEdit = event => {
        event.preventDefault();
        const {id, name} = this.props.match.params;

        const changedNote = {
            id: id, 
            category: event.target['Category'].value,
            name: event.target['TipName'].value,
            description: event.target['description'].value,
            directions: event.target['directions'].value,
            sourceTitle: event.target['sourceName'].value,
            sourceURL: event.target['sourceurl'].value,
            rating: event.target['rating'].value,
            numRaters: event.target['raters'].value,
        }

        this.context.editTip(changedNote);
        this.props.history.push(`/Category/${name}/${id}`);
    }

    handleClickCancel = () => {
        const {id, name} = this.props.match.params;
        this.props.history.push(`/Category/${name}/${id}`);
        alert('Tip was not edited.');
    }

    render() {
        const { tips = [], categories = [] } = this.context;
        const { id } = this.props.match.params;

        const tipEdit = findTip(tips, id) || {};
        const catForTip = getCategoryName(categories, tipEdit.category) || {};

        return (
            <section className="editContent">
                <h1>Edit Tip</h1>
                <h2>"{tipEdit.name}"</h2>
                <form className="editForm" onSubmit={this.handleClickEdit}>
                    <label htmlFor="TipName" className="inputLabel">Name of Tip: </label>
                    <input
                        type="text"
                        id="TipName"
                        name="TipName"
                        className="inputEdit"
                        required
                        defaultValue={tipEdit.name}
                        onChange={this.handleUpdate}
                    />
                    <br />
                    <label htmlFor="Category" className="inputLabel">Category: </label>
                    <select id="Category" className="inputEdit"
                        defaultValue={catForTip.id}
                        required
                        onChange={this.handleUpdate}
                    >
                        {categories.slice(0, categories.length - 1).map(category =>
                            <option
                                key={category.id}
                                value={category.name}
                            >
                                {category.name}
                            </option>
                        )}
                    </select>
                    <br />
                    <label htmlFor="description" className="inputLabel">Description: </label>
                    <br />
                    <textarea 
                        id="description" 
                        name="description" 
                        defaultValue={tipEdit.description} 
                        onChange={this.handleUpdate}
                    />
                    <br />
                    <label htmlFor="directions" className="inputLabel">Directions: </label>
                    <br />
                    <textarea 
                        id="directions" 
                        name="directions" 
                        defaultValue={tipEdit.directions} 
                        onChange={this.handleUpdate}
                    />
                    <br />
                    <label htmlFor="sourceName" className="inputLabel">Source Name: </label>
                    <input
                        type="text"
                        id="sourceName"
                        name="sourceName"
                        className="inputEdit"
                        required
                        defaultValue={tipEdit.sourceTitle}
                        onChange={this.handleUpdate}
                    />  
                    <br />
                    <label htmlFor="sourceurl" className="inputLabel">Source URL: </label>
                    <textarea
                        type="text"
                        id="sourceurl"
                        name="sourceurl"
                        className="sourceText"
                        defaultValue={tipEdit.sourceURL}
                        onChange={this.handleUpdate}
                    />
                    <br />
                    <label htmlFor="rating" className="inputLabel">Rating: </label>
                    <input
                        type="text"
                        id="rating"
                        name="rating"
                        className="rateCSS"
                        required
                        defaultValue={tipEdit.rating}
                        onChange={this.handleUpdate}
                    />  
                    <label htmlFor="raters" className="inputLabel"># of Raters: </label>
                    <input
                        type="text"
                        id="raters"
                        name="raters"
                        className="rateCSS"
                        required
                        defaultValue={tipEdit.numRaters}
                        onChange={this.handleUpdate}
                    />  
                    <br />
                    <div className="buttonBox">
                        <button 
                            type="submit" 
                            className="editButton"
                            /* onClick={() => {
                                if (window.confirm('Are you sure you wish to update the tip?') ? this.handleClickEdit() : this.handleClickCancel())
                                    this.handleClickCancel()
                            }} */
                        >
                            Save Changes
                        </button>
                        <NavLink
                            className="editButton" 
                            to={`/Category/${catForTip.name}/${tipEdit.id}`}
                        >
                            Cancel
                        </NavLink>
                    </div>
                </form>
            </section>
        );
    }
}

export default EditTip;
