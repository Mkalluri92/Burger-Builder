import React from 'react';

import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import NavigationItems from './NavigationItems';

configure({adapter: new Adapter()})

describe('<NavigationItems />', () => {
    it('should render two <NavigationItems /> if not authenticated', () => {

    });

})