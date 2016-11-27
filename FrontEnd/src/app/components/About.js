import React from 'react';
import style from './style/style.css';
import Header from './Header';
import Footer from './Footer';

const About = () => {
  return (
    <div className= {style.exploreMain}>
      <Header largeHeader={false} />
      <div className={style.main}>
        <h4>mission statement</h4>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
      </div>
      <div className = {style.aboutBox1}>
        <h6>Matt<br/>Esposito</h6>
      </div>
      <div className = {style.aboutBox2}>
        <h6>Phillip<br/>Ryan</h6>
      </div>
      <div className = {style.aboutBox3}>
        <h6>Kendall<br/>Stephens</h6>
      </div>
      <div className = {style.aboutBox3}>
        <h6>Junho<br/>An</h6>
      </div>
      <div className = {style.aboutBox1}>
        <h6>Andrew<br/>Shidel</h6>
      </div>
      <div className = {style.aboutBox2}>
        <h6>Harsh<br/>Bhargava</h6>
      </div>
      <div className = {style.aboutBox2}>
        <h6>Joe<br/>Budd</h6>
      </div>
      <div className = {style.aboutBox3}>
        <h6>Troy<br/>Santry</h6>
      </div>
      <div className = {style.aboutBox1}>
        <h6>Yongqiang<br/>Fan</h6>
      </div>
      <Footer/>
    </div>
  )
}

export default About;
