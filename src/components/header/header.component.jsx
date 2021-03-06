import React from "react";
import { connect } from "react-redux";
import { auth } from "../../firebase/firebase.utils";

import { ReactComponent as Logo } from "../../assets/logo.svg";

import "./header.styles.scss";
import CartIcon from "../cart-icon/cart-icon.component";
import CartDropdown from "../cart-dropdown/cart-dropdown.component";
import { createStructuredSelector } from "reselect";
import { selectCartHidden } from "../../redux/cart/cart.selectors";
import { selectCurrentUser } from "../../redux/user/user.selector";

import {HeaderContainer, LogoContainer, OptionsContainer, OptionsLink} from './header.style'

const Header = ({ currentUser, hidden }) => (
  <HeaderContainer>
    <LogoContainer to="/">
      <Logo className='logo' />
    </LogoContainer>
    <OptionsContainer>
      <OptionsLink to="/shop">
        SHOP
      </OptionsLink>
      <OptionsLink to="/contact">
        CONTACT
      </OptionsLink>
      {currentUser ? (
        <OptionsLink as='div' onClick={() => auth.signOut()}>
          SIGN OUT
        </OptionsLink>
      ) : (
        <OptionsLink to="/signin">
          SIGN IN
        </OptionsLink>
      )}
      <CartIcon />
    </OptionsContainer>
    {hidden ? null : <CartDropdown />}
  </HeaderContainer>
);

// const mapStateToProps = ({ user: { currentUser }, cart: { hidden } }) => ({
//   currentUser,
//   hidden,
// });

// const mapStateToProps = (state) => ({
//     currentUser: selectCurrentUser(state),
//     hidden: selectCartHidden(state)
//   });

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  hidden: selectCartHidden,
});

export default connect(mapStateToProps)(Header);
