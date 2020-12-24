import React from 'react'
import { shallow } from 'enzyme'
import LeftSideBar from './LeftSidebar'

const setUp = (props = {}) => {
    const component = shallow(<LeftSideBar />);
    return component
}

describe('leftSideBar component test', () => {
    let component;

    beforeEach(() => {
        component = setUp()
    })

    it('It should render without error', () => {
        const wrapper = component.find(`[data-test="leftSidebar"]`);
        expect(wrapper.length).toBe(1)
    })
    it('LeftSidebar should have a title', () => {
        const wrapper = component.find(`[data-test="leftSidebarTitle"]`);
        expect(wrapper.length).toBe(1)
    })
})