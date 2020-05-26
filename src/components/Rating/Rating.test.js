import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import Rating from './Rating';

describe(`Rating component`, () => {
    it('renders the Rating by default', () => {
        const wrapper = shallow(<Rating />);
        expect(toJson(wrapper)).toMatchSnapshot();
    });
});
