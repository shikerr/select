import { render, mount } from 'enzyme';
import * as React from 'react';
import Select, { Option } from '../../src';
import { INTERNAL_PROPS_MARK } from '../../src/interface/generator';

export default function allowClearTest(mode: any, value: any) {
  describe('allowClear', () => {
    it('renders correctly', () => {
      const wrapper = render(<Select mode={mode} value={value} allowClear />);
      expect(wrapper.find('.rc-select-clear-icon').length).toBeTruthy();
    });
    it('clears value', () => {
      const onClear = jest.fn();
      const internalOnClear = jest.fn();
      const wrapper = mount(
        <Select
          value="1"
          allowClear
          mode={mode}
          onClear={onClear}
          internalProps={{
            mark: INTERNAL_PROPS_MARK,
            onClear: internalOnClear,
          }}
        >
          <Option value="1">1</Option>
          <Option value="2">2</Option>
        </Select>,
      );

      // disabled
      wrapper.setProps({ disabled: true });
      expect(wrapper.find('.rc-select-clear')).toHaveLength(0);

      // enabled
      wrapper.setProps({ disabled: false });
      wrapper
        .find('.rc-select-clear')
        .last()
        .simulate('mousedown');
      // expect(handleChange).toHaveBeenCalledWith(undefined, undefined);
      expect(wrapper.find('input').props().value).toEqual('');
      expect(onClear).toHaveBeenCalled();
      expect(internalOnClear).toHaveBeenCalled();
    });
  });
}
