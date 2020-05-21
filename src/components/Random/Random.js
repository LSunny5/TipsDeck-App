import React from 'react';
import './Random.css';
import TipsDeckContext from '../../TipsDeckContext';
import { shuffleArray} from '../../TipsDeckHelpers';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

class Random extends React.Component {
    static contextType = TipsDeckContext;

    render() {
        const { tips = [] } = this.context;
        let temp = [...tips];
        temp = shuffleArray(temp);

        return (
            <section className="RandomContent">
                <h1>Random</h1>

                <div className="TipsBox">
                    {(temp.length > 0) ? (
                        temp.map(tip =>
                            <NavLink
                                key={tip.id}
                                to={`/Category/Random/${tip.id}`}
                                className="TipLink">
                                <h2 className="tName">{tip.tipname}</h2>
                                <p className="tipDesc">{tip.tipdescription}</p>
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

Random.propTypes = {
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
  };

export default Random;
