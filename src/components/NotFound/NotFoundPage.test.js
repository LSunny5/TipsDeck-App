import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import NotFoundPage from './NotFoundPage';

describe(`NotFoundPage component`, () => {
    it('renders the NotFoundPage by default', () => {
        const wrapper = shallow(<NotFoundPage />);
        expect(toJson(wrapper)).toMatchSnapshot();
    });
});
