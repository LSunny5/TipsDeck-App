import React from 'react';
import ReactDOM from 'react-dom';
import Tip from './Tip';
import toJson from 'enzyme-to-json'
import { shallow } from 'enzyme'
import { BrowserRouter } from 'react-router-dom';

describe(`Tip component`, () => {
    const props = {
        match: {
          params: {
            id: 3,
          }
        }
    }

    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(
            <BrowserRouter>
                <Tip {...props} />
            </BrowserRouter>, div);
        ReactDOM.unmountComponentAtNode(div);
    });

    it('renders the Tip form', () => {
        const wrapper = shallow(<Tip {...props} />)
        expect(toJson(wrapper)).toMatchSnapshot()
    })
});