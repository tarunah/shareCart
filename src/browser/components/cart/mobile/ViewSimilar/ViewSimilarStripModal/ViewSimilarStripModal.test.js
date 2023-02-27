import React from 'react';
import { mount } from 'enzyme';
import ViewSimilarStripModal from '.';
import Modal from 'commonComp/Modal';
import ViewSimilarStrip from '../ViewSimilarStrip';

describe('<ViewSimilarStripModal />', () => {
  it('should render the Modal and ViewSimilarStrip', () => {
    window.triggerEvent = () => {};
    const wrapper = mount(
      <ViewSimilarStripModal
        handlToggleSimilarModal={() => {}}
        handleCartAction={() => {}}
      />
    );

    expect(wrapper.find(Modal).length).toBe(1);
    expect(wrapper.find(ViewSimilarStrip).length).toBe(1);
  });
});
