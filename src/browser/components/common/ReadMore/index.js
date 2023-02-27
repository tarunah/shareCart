import React from 'react';
import Styles from './readmore.base.css';

// Usage
// Use the mainContainerClass and buttonContainerClass attributes for customizing the ReadMore component
// <ReadMore buttonText={'more'} mainContainerClass={Styles.mainContainerClass} buttonContainerClass={Styles.buttonContainerClass}>
//   <component/> || Text
// </ReadMore>

class ReadMore extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      expanded: false,
      overFlow: false
    };
    this.toggleReadMore = this.toggleReadMore.bind(this);
    this.firstRender = true;
    this.enableClick = false;

    ['setRef'].forEach(member => (this[member] = this[member].bind(this)));
  }

  isOverFlowing(e) {
    return e.offsetWidth < e.scrollWidth;
  }

  //First render happens and it is found out weather overflow occurs or not, Then the state is changed
  //to re-render the component with more button.
  componentDidMount() {
    const overFlow = this.isOverFlowing(this.expandableDiv);
    if (this.firstRender) {
      //if overflow occurs in first render with full width. Then clicking is enabled
      this.enableClick = overFlow;
      this.firstRender = false;
    }
    this.setState({ overFlow });
  }

  toggleReadMore(e) {
    e.stopPropagation(); //click propagation has been stopped because in preact the click event in the readMore DIV also closes the modal
    this.enableClick &&
      this.setState(prevState => ({ expanded: !prevState.expanded }));
  }

  setRef(ref) {
    this.expandableDiv = ref;
  }

  render() {
    const {
      children,
      buttonText,
      mainContainerClass,
      buttonContainerClass
    } = this.props;
    const { expanded, overFlow } = this.state;
    const { firstRender, setRef } = this;
    return (
      <div
        className={`${Styles.mainContainer} ${
          mainContainerClass ? mainContainerClass : ''
        }`}
        onClick={this.toggleReadMore}
      >
        <div
          className={
            firstRender
              ? Styles.fullWidthContainer
              : overFlow && !expanded
              ? Styles.slicedContainer
              : Styles.expandedContainer
          }
          ref={setRef}
        >
          {children}
        </div>
        {overFlow && !expanded && (
          <div
            className={`${Styles.readMore} ${
              buttonContainerClass ? buttonContainerClass : ''
            }`}
          >
            {buttonText}
          </div>
        )}
      </div>
    );
  }
}

export default ReadMore;
