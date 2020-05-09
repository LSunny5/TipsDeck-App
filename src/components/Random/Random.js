import React from 'react';
import './Random.css';
import TipsDeckContext from '../../TipsDeckContext';
import { shuffleArray} from '../../TipsDeckHelpers';
import { NavLink } from 'react-router-dom';

class Random extends React.Component {
    static contextType = TipsDeckContext;

    render() {
        const { tips = [] } = this.context;
        let temp = [...tips];
        temp = shuffleArray(temp);

        
        /* let tempId;
        let findCat = findTip(tips, tempId);
        let a = getCategoryName(categories, findCat.category)
        let catName = a.name; */

        return (
            <section className="RandomContent">
                <h1>Random</h1>

                <div className="TipsBox">
                    {(temp.length > 0) ? (
                        temp.map(tip =>
                            <NavLink
                                key={tip.id}
                                to={`/Category/${tip.category}/${tip.id}`}
                                className="TipLink">
                                <h2 className="tName">{tip.name}</h2>
                                <p className="tipDesc">{tip.description}</p>
                            </NavLink>
                        )) : (
                            <div className="noTips">
                                Sorry there are no tips at this time.
                            </div>)}
                </div>
            </section>
        );
    }
}

export default Random;
