import React from 'react';
import './EditTip.css';
import TipsDeckContext from '../../TipsDeckContext';
import { findTip, getCategoryName } from '../../TipsDeckHelpers';
import { NavLink } from 'react-router-dom';

//Edit the Tip Information
class EditTip extends React.Component {
    static contextType = TipsDeckContext;
    constructor(props) {
        super(props);
        this.state = {
            TipName: {
                value: '',
                touched: false
            },
            Category: {
                value: '',
                touched: false
            },
            descriptions: {
                value: '',
                touched: false
            },
        }
    }

    updateName(name) {
        this.setState({ TipName: { value: name, touched: true } });
    }

    updateCategory(category) {
        this.setState({ Category: { value: category, touched: true } });
    }

    updateDesc(desc) {
        this.setState({ description: { value: desc, touched: true } });
    }

   




    handleChange = event => {
		const { name, value } = event.target;
		this.setState({ [name]: value });
	};


    handleClickEdit = event => {
        event.preventDefault();
        const {id, name} = this.props.match.params;

        const changedNote = {
            category: event.target['Category'].value,
            name: event.target['TipName'].value,
            description: event.target['description'].value,
           /*  directions: this.state.directions,
            sourceURL: this.state.sourceURL, */
        }

        this.context.editTip(changedNote);
        this.props.history.push(`/Category/${name}/${id}`);


        //this.props.history.push('/');
    }

    handleClickCancel = () => {
        //this.props.history.goBack();
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
                        onChange={e => this.updateName(e.target.value)}
                    />
                    <br />
                    <label htmlFor="Category" className="inputLabel">Category: </label>
                    <select id="Category" className="inputEdit"
                        defaultValue={catForTip.id}
                        required
                        onChange={e => this.updateCategory(e.target.value)}
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
                    <textarea id="description" name="description" defaultValue={tipEdit.description} onChange={e => this.updateDesc(e.target.value)}></textarea>
                    <br />
                    <label htmlFor="directions" className="inputLabel">Directions: </label>
                    <br />
                    <textarea id="directions" name="directions" defaultValue={tipEdit.directions} onChange={this.handleChange}></textarea>
                    <br />
                    <label htmlFor="source" className="inputLabel">Source URL: </label>
                    <textarea
                        type="text"
                        id="source"
                        name="source"
                        className="sourceText"
                        defaultValue={tipEdit.sourceURL}
                        onChange={this.handleChange}
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
