import React from 'react';
import get from 'lodash/get';
import PropTypes from 'prop-types';

import useModal from 'customHooks/useModal';
import Image from 'commonComp/Image';
import Modal from 'commonComp/Modal';

import Style from './knowMore.base.css';

const ImageComponent = ({ src }) => {
  return (
    <div className={Style.imageComponent}>
      <Image src={src} lazyLoad={false} nonCloudinary={true} />
    </div>
  );
};

const TextAndLink = props => {
  const text = get(props, 'desc', '');
  const link = get(props, 'link', '');
  const linkText = get(props, 'linkText', '');
  const className = get(props, 'className', '');
  const isMobile = get(props, 'isMobile');

  const target = isMobile ? '' : '_blank';
  const rel = isMobile ? '' : 'noopener noreferrer';
  return (
    <div className={`${Style.text} ${className}`}>
      {text}{' '}
      {linkText && (
        <a className={Style.anchor} href={link} target={target} rel={rel}>
          {linkText}
        </a>
      )}
    </div>
  );
};

const KnowMore = ({ className, modalConfig, isMobile = true }) => {
  const [isModalOpen, toggleModal] = useModal(false);

  const title = get(modalConfig, 'title');
  const src = get(modalConfig, 'imgSource', []);
  const linkAndDescription = get(modalConfig, 'linkAndDescription', []);
  const footerConfig = get(modalConfig, 'footer', {});

  const onClick = e => {
    triggerEvent('DONATION_WIDGET_KNOW_MORE');
    toggleModal();
  };

  return (
    <React.Fragment>
      <div className={className} onClick={onClick}>
        Know More
      </div>
      {isModalOpen && (
        <Modal
          cancelCallback={toggleModal}
          className={isMobile ? Style.modalMobile : Style.modalDesktop}
          cancelIconConfig={{ show: true, className: Style.modalCloseIcon }}
          halfCard={isMobile}
        >
          <div
            className={`${Style.title} ${isMobile ? Style.titleMobile : ''}`}
          >
            {title}
          </div>
          <ImageComponent src={src} />
          <div className={Style.textContainer}>
            <ul className={Style.list}>
              {linkAndDescription.map(item => (
                <li>
                  <TextAndLink {...item} isMobile={isMobile} />
                </li>
              ))}
            </ul>
            <TextAndLink {...footerConfig} className={Style.footer} />
          </div>
        </Modal>
      )}
    </React.Fragment>
  );
};

KnowMore.propTypes = {
  className: PropTypes.string,
  modalConfig: PropTypes.object.isRequired,
  isMobile: PropTypes.bool
};

export default KnowMore;
