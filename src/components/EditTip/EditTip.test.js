import React from 'react';
import ReactDOM from 'react-dom';
import EditTip from './EditTip';
import toJson from 'enzyme-to-json'
import { shallow } from 'enzyme'
import { BrowserRouter } from 'react-router-dom';

describe(`EditTip component`, () => {
    const props = {
        match: {
          params: {
            category: 'Laundry'
          }
        }, 
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
      }

    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(
            <BrowserRouter>
                <EditTip {...props} />
            </BrowserRouter>, div);
        ReactDOM.unmountComponentAtNode(div);
    });

    it('renders the EditTip form', () => {
        const wrapper = shallow(<EditTip {...props} />)
        expect(toJson(wrapper)).toMatchSnapshot()
    })
});