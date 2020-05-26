import React from 'react';
import ReactDOM from 'react-dom';
import Category from './Category';
import toJson from 'enzyme-to-json'
import { shallow } from 'enzyme'
import { BrowserRouter } from 'react-router-dom';

describe(`Category component`, () => {
    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(
            <BrowserRouter>
                <Category />
            </BrowserRouter>, div);
        ReactDOM.unmountComponentAtNode(div);
    });

    it('renders the Category component', () => {
        const wrapper = shallow(<Category />)
        expect(toJson(wrapper)).toMatchSnapshot()
    })
});