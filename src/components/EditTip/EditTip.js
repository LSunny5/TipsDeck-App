import React from 'react';
import './EditTip.css';
import TipsDeckContext from '../../TipsDeckContext';
import { findTip, getCategoryName } from '../../TipsDeckHelpers';
import { NavLink } from 'react-router-dom';
import config from '../../config';
import PropTypes from 'prop-types';
import ValidationError from '../../ErrorFiles/ValidationError';
import { getCategoryId } from '../../TipsDeckHelpers';

//Edit the Tip Information
class EditTip extends React.Component {
    static contextType = TipsDeckContext;
    constructor(props) {
        super(props);
        this.state = {
            Category: {
                value: 1,
                touched: false
            },
            TipName: {
                value: '',
                touched: false
            },
            description: {
                value: '',
                touched: false
            },
            directions: {
                value: '',
                touched: false
            }, 
            sourceName: {
                value: '',
                touched: false
            },
            sourceurl: {
                value: '',
                touched: false
            }, 
            rating: {
                value: 0,
                touched: false
            },
            raters: {
                value: 0,
                touched: false
            },
        }
    }

    inputUpdate(field, text) {
        this.setState({ [field]: {value: text, touched: true} })
    }

    validateName() {
        const name = this.state.TipName.value.trim();
        if (name.length < 3) {
            return "Name is required and more than 3 characters";
        } else if (name.length > 50) {
            return "Name must be less than 50 characters";
        }
    };

    validateDescription() {
        const description = this.state.description.value.trim();
        if (description.length < 3) {
            return "Please provide a description with more than 3 characters...";
        };
    };

    validateSourceTitle() {
        const sName = this.state.sourceName.value.trim();
        if (sName.length < 3) {
            return "Please provide a source name of more than 3 characters...";
        };
    };

    validateRating() {
        const rate = this.state.rating.value;
        if (rate < 0 || rate > 5.0) {
            return "Please rate between 0 and 5.0.";
        };
    };

    handleClickEdit = event => {
        event.preventDefault();
        const { id, name } = this.props.match.params;

        const catId = getCategoryId(this.context.categories, event.target['Category'].value);

        const changedNote = {
            category_id: catId.id,
            tipname: event.target['TipName'].value,
            tipdescription: event.target['description'].value,
            directions: event.target['directions'].value,
            sourcetitle: event.target['sourceName'].value,
            sourceurl: event.target['sourceurl'].value,
            rating: parseFloat(event.target['rating'].value).toFixed(1),
            numRaters: parseInt(event.target['raters'].value),
        }

        //fetch code here for note
        fetch(`${config.APIEndpoint}/Tips/${id}`, {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(changedNote),
        })
            .then(response => {
                if (!response.ok){
                    return response.json().then(error => Promise.reject(error))
                }   
                return response
            })
            .then((tip) => {
                this.context.editTip(changedNote);
                this.props.history.push(`/Category/${name}/${id}`);
                window.location.reload();
            })
            .catch(error => {
                alert('Could not change note:  ' + error);
            })
    }

    handleClickCancel = () => {
        const { id, name } = this.props.match.params;
        this.props.history.push(`/Category/${name}/${id}`);
        alert('Tip was not edited.');
    }

    render() {
        const { tips = [], categories = [] } = this.context;
        const { id } = this.props.match.params;

        const tipEdit = findTip(tips, id) || {};
        const catForTip = getCategoryName(categories, tipEdit.category) || {};

        const nameError = this.validateName();
        const descError = this.validateDescription();
        const sourceError = this.validateSourceTitle();
        const rateError = this.validateRating();

        return (
            <section className="editContent">
                <h1>Edit Tip</h1>
                <h2>"{tipEdit.tipname}"</h2>
                <form className="editForm" onSubmit={this.handleClickEdit}>
                    <label htmlFor="TipName" className="inputLabel">Name of Tip: </label>
                    <input
                        type="text"
                        id="TipName"
                        name="TipName"
                        className="inputEdit"
                        required
                        defaultValue={tipEdit.tipname}
                        onChange={e => this.inputUpdate("TipName", e.target.value)}
                    />
                    <div className="errorBox" id="contentErrorBox">
                        {this.state.TipName.touched && <ValidationError message={nameError} />}
                    </div>
                    <label htmlFor="Category" className="inputLabel">Category: </label>
                    <select id="Category" className="inputEdit"
                        value={tipEdit.category_id}              
                        required
                        onChange={e => this.inputUpdate("Category", e.target.value)}
                    >
                        {categories.slice(0, categories.length).map(category =>
                            <option
                                key={category.id}
                                value={category.id}
                            >
                                {category.category}
                            </option>
                        )}
                    </select>
                    <br />
                    <label htmlFor="description" className="inputLabel">Description: </label>
                    <br />
                    <textarea
                        id="description"
                        name="description"
                        defaultValue={tipEdit.tipdescription}
                        onChange={e => this.inputUpdate("description", e.target.value)}
                    />
                    <div className="errorBox" id="contentErrorBox">
                        {this.state.description.touched && <ValidationError message={descError} />}
                    </div>
                    <br />
                    <label htmlFor="directions" className="inputLabel">Directions: </label>
                    <br />
                    <textarea
                        id="directions"
                        name="directions"
                        defaultValue={tipEdit.directions}
                        onChange={e => this.inputUpdate("directions", e.target.value)}
                    />
                    <br />
                    <label htmlFor="sourceName" className="inputLabel">Source Name: </label>
                    <input
                        type="text"
                        id="sourceName"
                        name="sourceName"
                        className="inputEdit"
                        required
                        defaultValue={tipEdit.sourcetitle}
                        onChange={e => this.inputUpdate("sourceName", e.target.value)}
                    />
                    <div className="errorBox" id="contentErrorBox">
                        {this.state.sourceName.touched && <ValidationError message={sourceError} />}
                    </div>
                    <label htmlFor="sourceurl" className="inputLabel">Source URL: </label>
                    <textarea
                        type="text"
                        id="sourceurl"
                        name="sourceurl"
                        className="sourceText"
                        defaultValue={tipEdit.sourceurl}
                        onChange={e => this.inputUpdate("sourceurl", e.target.value)}
                    />
                    <br />
                    <label htmlFor="rating" className="inputLabel">Rating (0-5):  </label>
                    <input
                        type="text"
                        id="rating"
                        name="rating"
                        className="rateCSS"
                        required
                        defaultValue={tipEdit.rating}
                        onChange={e => this.inputUpdate("rating", e.target.value)}
                    />
                    <div className="errorBox" id="contentErrorBox">
                        {this.state.rating.touched && <ValidationError message={rateError} />}
                    </div>
                    <label htmlFor="raters" className="inputLabel"># of Raters: </label>
                    <input
                        type="text"
                        id="raters"
                        name="raters"
                        className="rateCSS"
                        required
                        defaultValue={tipEdit.numraters}
                        onChange={e => this.inputUpdate("raters", e.target.value)}
                    />
                    <br />
                    <div className="buttonBox">
                        <button
                            type="submit"
                            className="editButton"
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


EditTip.propTypes = {
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

export default EditTip;