import React, { Component, Fragment } from "react";
import { Switch, Route, Link } from "react-router-dom";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from "reactstrap";

class HeaderComp extends Component {
  constructor(props) {
    super(props);
    this.state = { collapsed: false };
  }
  toggleNavbar = () => this.setState({ collapsed: true });
  render() {
    return (
      <Fragment>
        <nav className='navbar navbar-expand-lg navbar-dark bg-dark'>
          <a className='navbar-brand' href='/'>
            DataBase
          </a>
          <button
            className='navbar-toggler'
            type='button'
            data-toggle='collapse'
            data-target='#navbarNav'
            aria-controls='navbarNav'
            aria-expanded='false'
            aria-label='Toggle navigation'>
            <span className='navbar-toggler-icon' />
          </button>
          <div className='collapse navbar-collapse' id='navbarNav'>
            <ul className='navbar-nav'>
              <li className='nav-item active'>
                <Link className='nav-link' to={'/display'}>
                  Display <span className='sr-only'>(current)</span>
                </Link>
              </li>
              <li className='nav-item'>
                <Link className='nav-link' to={'/add'}>
                  Add
                </Link>
              </li>
              {/* <li className='nav-item'>
                <a className='nav-link' href='#'>
                  Pricing
                </a>
              </li>
              <li className='nav-item'>
                <a className='nav-link disabled' href='#'>
                  Disabled
                </a>
              </li> */}
            </ul>
          </div>
        </nav>
      </Fragment>
    );
  }
}

export default HeaderComp;
