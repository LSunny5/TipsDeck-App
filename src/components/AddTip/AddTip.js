import React from 'react';
import './AddTip.css';
import TipsDeckContext from '../../TipsDeckContext';
import { NavLink } from 'react-router-dom';
import { getCategoryName } from '../../TipsDeckHelpers';

class AddTip extends React.Component {
    static contextType = TipsDeckContext;
    
    /* state = {
        category: '',
        name: '',
        description: '',
        directions: '',
        sourceTitle: '',
        sourceURL: '',
    } */

    handleUpdate = event => {
        const { title, value } = event.target;
        this.setState({ [title]: value.trim() });
    }

    handleSubmit = event => {
        event.preventDefault();
        const newId = (this.context.tips.length + 50).toString();
       // const { Category, TipName, description, directions, sourceName, sourceURL } = event.target;

        const newTip = [{
                /* id: newId,
                category: Category.value,
                name: TipName.value,
                description: description.value,
                directions: directions.value,
                sourceTitle: sourceName.value,
                sourceURL: sourceURL.value,
                rating: 0, 
                numRaters: 0 */
               // numRaters: 0,
               // rating: 0
                id: newId.toString(),
                category: event.target['Category'].value,
                name: event.target['TipName'].value,
                description: event.target['description'].value,
                directions: event.target['directions'].value,
                sourceTitle: event.target['sourceName'].value,
                sourceURL: event.target['sourceURL'].value
            }]
        
        const catName = getCategoryName(this.context.categories, event.target['Category'].value);


      //      console.log(newTip );

        this.context.addTip(newTip);

        
        console.log(this.context.tips);
        console.log(' newest tips')
    
        
        //console.log(Category.value +  ' category');

        
        this.props.history.push(`/Category/${catName.name}/${newId}`);
    };

    render() {
        const { categories = []} = this.context;

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
                            onChange={this.handleUpdate}
                        />
                        <br />
                        <label htmlFor="Category" className="inputLabel">Category: </label>
                        <select
                            id="Category"
                            defaultValue=''
                            required
                            onChange={this.handleUpdate}
                        >
                            {categories.slice(0, categories.length - 1).map(category =>
                                <option
                                    key={category.id}
                                    value={category.id}
                                >
                                    {category.name}
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
                            onChange={this.handleUpdate}
                        />
                        <br />
                        <label htmlFor="directions" className="inputLabel">Directions: </label>
                        <br />
                        <textarea
                            id="directions"
                            name="directions"
                            placeholder="Add directions here..."
                            onChange={this.handleUpdate}
                        />
                        <br />
                        <label htmlFor="sourceName" className="inputLabel">Source Title:  </label>
                        <input
                            type="text"
                            id="sourceName"
                            name="sourceName"
                            className="inputAdd"
                            placeholder="Add name of source here..."
                            onChange={this.handleUpdate}
                        />
                        <br />
                        <label htmlFor="sourceURL" className="inputLabel">Source URL: </label>
                        <br />
                        <textarea
                            type="text"
                            id="sourceURL"
                            name="sourceURL"
                            className="sourceText"
                            placeholder="Enter source URL here..."
                            onChange={this.handleUpdate}
                        />
                        <br />
                        <div className="buttonBox">
                            <button
                                type="submit"
                                className="editButton"
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

                {/* 
                    
                        
                            
                            
                            
                                    <label for="description" class="AddLabel">Description: </label>
                                    <Textarea id="description" name="description" class="AddLabel" placeholder="Describe the tip here..."></Textarea><br>
                                        <label for="directions" class="AddLabel">Directions: </label>
                                        <Textarea id="directions" name="directions" class="AddLabel" placeholder="Enter directions for tip here..."></Textarea><br>
                                            <label for="source" class="AddLabel">Source URL: </label>
                                            <input type="text" id="source" name="source" class="inputAdd" placeholder="ex. www.randomsite.com"><br>
                                                

        
      */}
            </section>
        );
    }
}

export default AddTip;