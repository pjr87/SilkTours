import React from 'react';
import ReactDOM from 'react-dom';
import Header from './Header';
import Footer from './Footer';

/*import FacebookLogin from './Facebook/facebook';*/

const Sign = (response) => {
  return (
    <div>
      <Header/>
      <h2>Sign In</h2>
      <Footer/>
    </div>
  )
}
/*
ReactDOM.render(
  <FacebookLogin
    appId="606443696175641"
    autoLoad
    callback={responseFacebook}
    icon="fa-facebook"
  />,
  document.getElementById('app')
);
*/
export default Sign;
