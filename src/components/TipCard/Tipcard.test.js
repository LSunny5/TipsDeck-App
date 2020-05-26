import React from 'react';
import ReactDOM from 'react-dom';
import Tipcard from './Tipcard';
import toJson from 'enzyme-to-json'
import { shallow } from 'enzyme'
import { BrowserRouter } from 'react-router-dom';

describe(`Tipcard component`, () => {
    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(
            <BrowserRouter>
                <Tipcard />
            </BrowserRouter>, div);
        ReactDOM.unmountComponentAtNode(div);
    });

    it('renders the Tipcard component', () => {
        const wrapper = shallow(<Tipcard />)
        expect(toJson(wrapper)).toMatchSnapshot()
    })
});
