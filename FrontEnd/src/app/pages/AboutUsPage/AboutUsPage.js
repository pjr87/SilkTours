import React from 'react';
import Style from './style.css';
import abouthero from '../../style/images/abouthero.jpg';
import aboutus from '../../style/images/aboutus.jpg';
import {PageTitle, AboutContents} from 'components';
import Image from 'react-bootstrap/lib/Image';


class AboutUsPage extends React.Component{
  render(){
    return(
      <div>
        <div className = {Style.pane}>
          <div className= {Style.sideLeft}>
            <Image className="img-responsive" src={abouthero}/>
          </div>
          <div className = {Style.sideRight}>
            <Image className="img-responsive" src={aboutus}/>
            <p className = {Style.paneText}>Aenean sollicitudin, erat a elementum</p>
            <p className = {Style.paneText}>rutrum, neque sem pretium metus, quis</p>
            <p className = {Style.paneText}>mollis nisl nunc et massa. Vestibulum</p>
            <p className = {Style.paneText}>sed metus in lorem tristique</p>
            <p className = {Style.paneText}>ullamcorper id vitae erat. Nulla mollis</p>
            <p className = {Style.paneText}>sapien sollicitudin lacinia lacinia.</p>
          </div>
        </div>
        <br/>
        <br/>
        <PageTitle title= "Mission Statement"/>
        <br/>
        <br/>
        <PageTitle title= "Introducing our team members"/>
        <AboutContents/>
      </div>
    );
  }
}

export default AboutUsPage;
