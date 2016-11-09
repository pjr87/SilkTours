import React from 'react';
import style from './style/style.css';
import Header from './Header';
import Footer from './Footer';

const ExplorePage = () => {
        return (
          <div className= {style.exploreMain}>
              <div className={style.main}>
        	   		<h4>available tours</h4>
        	   		<div className={style.searchMain}>
        	   			<h5>search</h5>
        	   			<input></input>
        	   			<h5>city</h5>
        	   			<select></select>
        	   			<h5>state</h5>
        	   			<select></select>
        	   	</div>
        	   	</div>
                <div className = {style.exploreBox1}>
                  <h6>philadelphia</h6>
                </div>
                <div className = {style.exploreBox2}>
                  <h6>new york</h6>
                </div>
                <div className = {style.exploreBox3}>
                  <h6>los angels</h6>
                </div>
                <div className = {style.exploreBox4}>
                  <h6>san francisco</h6>
                </div>
                <div className = {style.exploreBox1}>
                  <h6>boulder</h6>
                </div>
                <div className = {style.exploreBox2}>
                  <h6>las vegas</h6>
                </div>
            <Footer/>
          </div>
        );
}

export default ExplorePage;
