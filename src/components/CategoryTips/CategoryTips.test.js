import React from 'react';
import ReactDOM from 'react-dom';
import CategoryTips from './CategoryTips';
import toJson from 'enzyme-to-json'
import { shallow } from 'enzyme'
import { BrowserRouter } from 'react-router-dom';

describe(`CategoryTips component`, () => {
    const props = {
        match: {
          params: {
            category: 'Laundry'
          }
        }
      }

    it('renders without crashing', () => {
        const div = document.createElement('div');     
        ReactDOM.render(
            <BrowserRouter>
                <CategoryTips {...props} />
            </BrowserRouter>, div);
        ReactDOM.unmountComponentAtNode(div);
    });

    it('renders the CategoryTips component', () => {
        const wrapper = shallow(<CategoryTips {...props} />)
        expect(toJson(wrapper)).toMatchSnapshot()
    })
});