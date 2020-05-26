import React from 'react';
import ReactDOM from 'react-dom';
import AddTip from './AddTip';
import toJson from 'enzyme-to-json'
import { shallow } from 'enzyme'
import { BrowserRouter } from 'react-router-dom';

describe(`AddTip component`, () => {
    it('renders without crashing', () => {
        const div = document.createElement('div');

        const props = {
            category_id: 1,
            tipname: 'test tip jest 1',
            tipdescription: 'description for test tip jest 1',
            directions: 'directions for test tip jest 1',
            sourcetitle: 'title for test tip jest 1',
            sourceurl: 'url for test tip jest 1',
            rating: 0,
            numraters: 0,
            history: {
                push: () => { }
            }
        };
        ReactDOM.render(
            <BrowserRouter>
                <AddTip {...props} />
            </BrowserRouter>, div);
        ReactDOM.unmountComponentAtNode(div);
    });

    it('renders the AddTip form', () => {
        const wrapper = shallow(<AddTip />)
        expect(toJson(wrapper)).toMatchSnapshot()
    })
});