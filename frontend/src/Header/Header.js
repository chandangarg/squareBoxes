import React from 'react';
//import logo from './logo.svg';
import logo from '../images/logo-main.jpg';
import avatar from '../images/avatar-s-1.jpg';
import './Header.css';

class Header extends React.Component {
  render() {
    return <div className="header-main">
          <nav className="navbar navbar-full navbar-expand-lg">
              <a href="http://codersgod.com/" target="_blank" className="navbar-brand"><img src={logo} title="logo" alt="logo" /></a>
              <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navb">
                <span className="navbar-toggler-icon"><i className="fa fa-bars"></i></span>
              </button>
              <div className="collapse navbar-collapse" id="navb">
                  <ul className="navbar-nav">
                      <li className="nav-item">
                          <a className="nav-link" href="/" >Home</a>
                      </li>
                      <li className="nav-item">
                          <a className="nav-link" href="http://codersgod.com/about" target="_blank">About Us</a>
                      </li>
                      <li className="nav-item">
                          <a className="nav-link" href="http://codersgod.com/contactus" target="_blank">Contact Us</a>
                      </li>
                  </ul>
                  <form className="form-inline head-search autoComplete-box my-2 my-lg-0">
                    <input className="form-control py-2 typeahead tt-query" type="text" autoComplete="off" spellCheck="false" placeholder="Search"
                        id="example-search-input" />

                  </form>
                  
              </div>
              <div className="header-right">
                  <div className="notify-main">
                      <div className="dropdown">
                          <div className="dropdown-toggle notify-main" data-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">
                              <div className="notify-box">
                                  <span className="noti-icon-badge">5</span>
                                  <i className="fa fa-bell"></i>
                              </div>
                          </div>
                      </div>
                  </div>
                  <div className="profile-main">
                      <div className="dropdown">
                          <div className="dropdown-toggle porfile-section" data-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">
                              <div className="header-profile-box">
                                  <div className="avatar"><img src={avatar} title="avatar-img" alt="" /></div>
                                  <div className="avatar-name">
                                      <span>Chandan Garg</span> Administrator
                                  </div>
                              </div>
                              
                          </div>
                      </div>
                  </div>
              </div>
          </nav>
      </div>

  }
}

export default Header;
