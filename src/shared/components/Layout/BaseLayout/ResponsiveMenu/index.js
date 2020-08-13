import React from 'react';
import PropTypes from 'prop-types';
import { slide as Menu } from 'react-burger-menu';
import leftArrow from 'src/assets/images/long-arrow-left.svg';
import styles from './styles.module.scss';

const ResponsiveMenu = props => {
  return (
      <Menu
          pageWrapId="page-wrap"
          outerContainerId="header"
          width={280}
          right
          burgerButtonClassName={ styles.nav }
          customBurgerIcon={
            <button type="button" className="btn p-0">
              <img src={leftArrow} width="30px" height="24px" alt="icon"/>
            </button>
          }
      >
        <a id="home" className="menu-item" href="/">Home</a>
      </Menu>
  );
};

ResponsiveMenu.propTypes = {

};

export default ResponsiveMenu;
