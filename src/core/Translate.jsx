import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

const Translate = ({ children }) => {
  const { t } = useTranslation();

  const translateChildren = React.Children.map(children, (child) => {
    if (typeof child === 'string') {
      return t(child);
    }
    return React.cloneElement(child, { t });
  });

  return <>{translateChildren}</>;
};

Translate.propTypes = {
  children: PropTypes.node.isRequired, // Định nghĩa kiểu cho children
};

export default Translate;
