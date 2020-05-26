import React from 'react';
import ReactDOM from 'react-dom';
import Random from './Random';
import toJson from 'enzyme-to-json'
import { shallow } from 'enzyme'
import { BrowserRouter } from 'react-router-dom';

describe(`Random component`, () => {
    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(
            <BrowserRouter>
                <Random />
            </BrowserRouter>, div);
        ReactDOM.unmountComponentAtNode(div);
    });

    it('renders the Random component', () => {
        const wrapper = shallow(<Random />)
        expect(toJson(wrapper)).toMatchSnapshot()
    })
});
