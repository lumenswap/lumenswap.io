import React from 'react';
import { slide as Menu } from 'react-burger-menu';
import PropTypes from 'prop-types';
import NavLink from 'components/LumenSwapHeader/NavLink';
import BurgerMenu from 'assets/images/burgerMenu';

const MobileMenu = ({ menus, isLogged }) => (
  <div id="outer-container">
    <Menu
      pageWrapId="page-wrap"
      outerContainerId="outer-container"
      customBurgerIcon={<BurgerMenu />}
    >
      <ul>
        {menus.map((menu, index) => (!menu.restricted || isLogged) && (
          <li key={index}>
            <NavLink name={menu.name} href={menu.link} mainHref={menu.mainHref} />
          </li>
        ))}
      </ul>
    </Menu>
  </div>
);

MobileMenu.propTypes = {
  menus: PropTypes.array.isRequired,
  isLogged: PropTypes.bool.isRequired,
};

export default MobileMenu;
