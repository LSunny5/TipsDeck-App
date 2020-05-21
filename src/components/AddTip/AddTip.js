import React from 'react';
import './AddTip.css';
import TipsDeckContext from '../../TipsDeckContext';
import config from '../../config';
import ValidationError from '../../ErrorFiles/ValidationError';
import PropTypes from 'prop-types';

import { NavLink } from 'react-router-dom';
//import { getCategoryName } from '../../TipsDeckHelpers';

class AddTip extends React.Component {
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

    handleSubmit = event => {
        event.preventDefault();
        const newTip = {
            category_id: event.target['Category'].value,
            tipname: event.target['TipName'].value,
            tipdescription: event.target['description'].value,
            directions: event.target['directions'].value,
            sourcetitle: event.target['sourceName'].value,
            sourceurl: event.target['sourceURL'].value,
            rating: 0,
            numraters: 0
        }

        fetch(`${config.APIEndpoint}/Tips`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(newTip),
        })
            .then(response => {
                if (!response.ok)
                    return response.json().then(e => Promise.reject(e))
                return response.json()
            })
            .then(tip => {
                this.context.addTip(newTip);
                this.props.history.push(`/Category/`)
                window.location.reload();
            })
            .catch(error => {
                console.error({ error })
                alert('Error! New tip was not added:  ' + error);
            })
    };

    render() {
        const { categories = [] } = this.context;
        const nameError = this.validateName();
        const descError = this.validateDescription();
        const sourceError = this.validateSourceTitle();

        return (
            <section className="AddTipContent">
                <section className="addBox">
                    <form className="addForm" onSubmit={this.handleSubmit}>
                        <legend>Add a Tip</legend>
                        <label htmlFor="TipName" className="inputLabel">Name of Tip: </label>
                        <input
                            type="text"
                            id="TipName"
                            name="TipName"
                            className="inputAdd"
                            placeholder="Add tip name here..."
                            onChange={e => this.inputUpdate("TipName", e.target.value)}
                        />
                        <div className="errorBox" id="nameErrorBox">
                                {this.state.TipName.touched && <ValidationError message={nameError} />}
                        </div>
                        <label htmlFor="Category" className="inputLabel">Category: </label>
                        <select
                            id="Category"
                            defaultValue=''
                            required
                            onChange={e => this.inputUpdate("Category", e.target.value)}
                        >
                            {categories.slice(0, categories.length - 1).map(category =>
                                <option
                                    key={category.id}
                                    value={category.id}
                                >
                                    {category.category}
                                </option>
                            )}
                        </select>
                        <br />
                        <br />
                        <label htmlFor="description" className="inputLabel">Description: </label>
                        <br />
                        <textarea
                            id="description"
                            name="description"
                            placeholder="Add a description here..."
                            onChange={e => this.inputUpdate("description", e.target.value)}
                        />
                        <div className="errorBox" id="nameErrorBox">
                                {this.state.description.touched && <ValidationError message={descError} />}
                        </div>
                        <label htmlFor="directions" className="inputLabel">Directions: </label>
                        <br />
                        <textarea
                            id="directions"
                            name="directions"
                            placeholder="Add directions here..."
                            onChange={e => this.inputUpdate("directions", e.target.value)}
                        />
                        <br />
                        <label htmlFor="sourceName" className="inputLabel">Source Title:  </label>
                        <input
                            type="text"
                            id="sourceName"
                            name="sourceName"
                            className="inputAdd"
                            placeholder="Add name of source here..."
                            onChange={e => this.inputUpdate("sourceName", e.target.value)}
                        />
                        <div className="errorBox" id="nameErrorBox">
                                {this.state.sourceName.touched && <ValidationError message={sourceError} />}
                        </div>
                        <label htmlFor="sourceURL" className="inputLabel">Source URL: </label>
                        <br />
                        <textarea
                            type="text"
                            id="sourceURL"
                            name="sourceURL"
                            className="sourceText"
                            placeholder="Enter source URL here..."
                            onChange={e => this.inputUpdate("sourceURL", e.target.value)}
                        />
                        <br />
                        <div className="buttonBox">
                            <button
                                type="submit"
                                className="editButton"
                                disabled={
                                    this.validateName() ||
                                    this.validateDescription() ||
                                    this.validateSourceTitle()
                                }
                            >
                                Add Tip
                        </button>
                            <NavLink
                                className="editButton"
                                to={`/Category`}
                            >
                                Cancel
                        </NavLink>
                        </div>
                    </form>
                </section>
            </section>
        );
    }
}

AddTip.propTypes = {
    categories: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        category: PropTypes.string.isRequired,
      })
    ),
  };

export default AddTip;