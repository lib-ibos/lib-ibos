import React from 'react';
import { ReactWrapper, shallow, render } from 'enzyme';
//import sinon from 'sinon';

import Button from '../src/button';

describe('<Button />', () => {
  it('renders <Button /> with normal', () => {
    //const wrapper = shallow(<Button />);
    const wrapper = render(<Button />);
    console.log(wrapper.html())
    //const t = wrapper.find('button').text()
    //console.log(t)
    //expect(wrapper.find(Foo)).to.have.length(3);
  });

  it('renders <Button /> with security-emptyString', () => {
    
    const wrapper = shallow(<Button security='' />);
   
    console.log(wrapper.html())

    //const t = wrapper.find('button').text()
    //console.log(t)
    //expect(wrapper.find(Foo)).to.have.length(3);
  });

  it('renders <Button /> with security-ru', () => {
    // const wrapper = shallow(<Button security="ru"/>);
    // const t = wrapper.find('button').text()
    // console.log(t)
    const wrapper = render(<Button security="ru" />);
    console.log(wrapper.html())
    //expect(wrapper.find(Foo)).to.have.length(3);
  });

  it('renders <Button /> with security-r', () => {
    // const wrapper = shallow(<Button security="r" />);
    // const t = wrapper.find('button').text()
    // console.log(t)
    //expect(wrapper.find(Foo)).to.have.length(3);
    const wrapper = render(<Button security="r" />);
    console.log(wrapper.html())
  });

});