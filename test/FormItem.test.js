import React from 'react';
import { ReactWrapper, shallow, render } from 'enzyme';
//import sinon from 'sinon';

import {Input, Checkbox} from 'antd'
import FormItem from '../src/components/FormLayout/FormItem';

describe('<FormItem />', () => {
  it('renders <FormItem /> with normal', () => {
    const wrapper = render(<FormItem ><Input /></FormItem>);
    console.log(wrapper.html())
  });

  it('renders <FormItem /> with security-emptyString', () => {
    
    const wrapper = shallow(<FormItem security='' />);
   
    console.log(wrapper.html())
  });

  it('renders <FormItem /> with security-ru', () => {
    const wrapper = render(<FormItem security="ru" />);
    console.log(wrapper.html())
  });

  it('renders <FormItem /> with security-r', () => {
    const wrapper = render(<FormItem security="r" ><Checkbox /></FormItem>);
    console.log(wrapper.html())
  });

});