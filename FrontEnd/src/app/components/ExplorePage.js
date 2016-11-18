import React from 'react';
import { BrowserRouter as Router, Link, Match, Miss } from 'react-router';
import style from './style/style.css';
import logoImg from './style/images/logo.png';
import logoImg2 from './style/images/logo2.png';
import Header from './Header';
import Footer from './Footer';
import AvailableToursPage from './AvailableToursPage';

class ExplorePage extends React.Component{
  render(){
        return (
          <div className= {style.exploreMain}>
              <Header/>
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
                <Link
                  to={{
                    pathname: '/explore',
                    query: { location: 'philadelphia' }
                  }}>
                <div className = {style.exploreBox1}>
                  <h6>philadelphia</h6>
                </div>
                </Link>
                <Link
                  to={{
                    pathname: '/explore',
                    query: { location: 'newyork' }
                  }}>
                <div className = {style.exploreBox2}>
                  <h6>new york</h6>
                </div>
                </Link>
                <Link
                  to={{
                    pathname: '/explore',
                    query: { location: 'losangels' }
                  }}>
                <div className = {style.exploreBox3}>
                  <h6>los angels</h6>
                </div>
                </Link>
                <Link
                  to={{
                    pathname: '/explore',
                    query: { location: 'sanfrancisco' }
                  }}>
                <div className = {style.exploreBox4}>
                  <h6>san francisco</h6>
                </div>
                </Link>
                <Link
                  to={{
                    pathname: '/explore',
                    query: { location: 'boulder' }
                  }}>
                <div className = {style.exploreBox1}>
                  <h6>boulder</h6>
                </div>
                </Link>
                <Link
                  to={{
                    pathname: '/explore',
                    query: { location: 'lasvegas' }
                  }}>
                <div className = {style.exploreBox2}>
                  <h6>las vegas</h6>
                </div>
                </Link>
            <Footer/>
          </div>
        );
      }
}

export default ExplorePage;
