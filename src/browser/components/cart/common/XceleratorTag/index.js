import React from 'react';
import PropTypes from 'prop-types';

// Styles
import Style from './xceleratorTag.base.css';

const getTopXceleratorTag = (sysAttributes, xceleratorTagsPriorityList) => {
  /* Build a {attribute : value} map from applicable system attributes.
    Value is the text to be displayed */
  const systemAttributeMap = {};
  sysAttributes.forEach(attr => {
    systemAttributeMap[attr.attribute] = attr.value;
  });

  /* Iterate over priority list and find correct tag to display
    If not tag from priority list present, do not display */
  let topXceleratorTag = null;
  for (let i = 0; i < xceleratorTagsPriorityList.length; i++) {
    /* Check if tag is present in system attributes for current product */
    if (systemAttributeMap[xceleratorTagsPriorityList[i]]) {
      topXceleratorTag = systemAttributeMap[xceleratorTagsPriorityList[i]];
      break;
    }
  }
  return topXceleratorTag;
};

const getXceleratorTagUI = displayText => {
  return (
    <div className={Style.xceleratorTag}>
      <div className={`${Style.slant} ${Style.slantUp}`}>
        <div className={Style.text}>{displayText}</div>
      </div>
      <div className={`${Style.slant} ${Style.slantDown}`}>
        <div className={Style.text}>{displayText}</div>
      </div>
    </div>
  );
};

const XceleratorTag = props => {
  const topXceleratorTag = getTopXceleratorTag(
    props.sysAttributes,
    props.xceleratorTagsPriorityList
  );
  return topXceleratorTag ? getXceleratorTagUI(topXceleratorTag) : null;
};

XceleratorTag.propTypes = {
  xceleratorTagsPriorityList: PropTypes.array,
  sysAttributes: PropTypes.array
};

XceleratorTag.defaultProps = {
  xceleratorTagsPriorityList: [],
  sysAttributes: []
};

export default XceleratorTag;
