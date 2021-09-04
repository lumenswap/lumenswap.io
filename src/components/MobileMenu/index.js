import React from 'react';
import { slide as Menu } from 'react-burger-menu';
import PropTypes from 'prop-types';
import styles from './styles.module.scss';

const MobileMenu = (props) => (
  <div id="outer-container" className={styles.container}>
    <Menu pageWrapId="page-wrap" outerContainerId="outer-container">
      <ul>
        <li>1</li>
        <li>2</li>
        <li>3</li>
      </ul>
    </Menu>
  </div>
);

MobileMenu.propTypes = {

};

export default MobileMenu;
