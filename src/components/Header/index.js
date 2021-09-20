
import React from 'react';
import UserInfo from './components/UserInfo';
import { useHistory } from "react-router-dom";


import './header.scss';

const Header = (props) => {
  let history = useHistory();
  const userImage = sessionStorage.getItem('currentUserImage')


  const logout = () => {
    sessionStorage.clear()
    history.push('/sign-in')
  }

  return (
    <header className="Header">
      <UserInfo
        image={userImage ? 'https://dev-dl.tdcx.com:3092' + userImage : 'http://loremflickr.com/60/60'}
        userName={sessionStorage.getItem('currentUser')}
      />
      <button className="Header-button" onClick={() => logout()}>
        <i className="fa fa-chevron-left" />
        Logout
      </button>

    </header>
  );
};

export default Header;