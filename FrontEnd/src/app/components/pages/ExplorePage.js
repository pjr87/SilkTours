import React from 'react';
import { Link } from 'react-router';
import MediaQuery from 'react-responsive';

// Importing css style and images
import style from '../../style/style.css';
import logoImg from '../../style/images/logo2.png';

// Importing componenets
import Header from '../header/Header';
import Footer from '../footer/Footer';
import AvailableToursPage from './AvailableToursPage';

class ExplorePage extends React.Component{
  render(){
    return (
      <div className= {style.exploreMain}>
          <Header fileName={logoImg}/>
            <h4>available tours</h4>
            <div className={style.searchMain}>
              <MediaQuery minDeviceWidth={1224}>
              <MediaQuery minWidth={800}>
              <p className={style.searchMainFont}>search</p>
              <input></input>
              {/**/}
              <p className={style.searchMainFont}>country</p>
              <select>
                <option>United States</option>
              </select>
              <p className={style.searchMainFont}>state</p>
              <select>
                <option>PA</option>
              </select>
              <p className={style.searchMainFont}>city</p>
              <select>
                <option>Philadelphia</option>
              </select>&nbsp;&nbsp;
              <button>Search</button>
              </MediaQuery>
              <MediaQuery maxWidth={800}>
              <p className={style.searchMainFont}>search</p>
              <input></input>
              <br/>
              {/**/}
              <p className={style.searchMainFont}>country</p>
              <select>
                <option>United States</option>
              </select>
              <br/>
              <p className={style.searchMainFont}>state</p>
              <select>
                <option>PA</option>
              </select>
              <br/>
              <p className={style.searchMainFont}>city</p>
              <select>
                <option>Philadelphia</option>
              </select>&nbsp;&nbsp;
              <button>Search</button>
              </MediaQuery>
            </MediaQuery>
            <MediaQuery maxDeviceWidth={1224}>
              <p className={style.searchMainFont}>search</p>
              <input></input>
              <br/>
              {/**/}
              <p className={style.searchMainFont}>country</p>
              <select>
                <option>United States</option>
              </select>
              <br/>
              <p className={style.searchMainFont}>state</p>
              <select>
                <option>PA</option>
              </select>
              <br/>
              <p className={style.searchMainFont}>city</p>
              <select>
                <option>Philadelphia</option>
              </select>&nbsp;&nbsp;
              <button>Search</button>
            </MediaQuery>
             </div>
             <br/>
             <br/>
             <br/>
             <br/>
             <br/>
             <br/>
            <MediaQuery minDeviceWidth={1224}>
              <MediaQuery minWidth={700}>
                <ExploreLink location='philadelphia' locationName='philadelphia' styleName={style.exploreBox1}/>
                <ExploreLink location='newyork' locationName='new york' styleName={style.exploreBox2}/>
                <ExploreLink location='losangels' locationName='los angels' styleName={style.exploreBox3}/>
                <ExploreLink location='sanfrancisco' locationName='san francisco' styleName={style.exploreBox4}/>
                <ExploreLink location='boulder' locationName='boulder' styleName={style.exploreBox1}/>
                <ExploreLink location='lasvegas' locationName='las vegas' styleName={style.exploreBox2}/>
              </MediaQuery>
              <MediaQuery maxWidth={700}>
                <ExploreLink location='philadelphia' locationName='philadelphia' styleName={style.exploreBoxMobile1}/>
                <ExploreLink location='newyork' locationName='new york' styleName={style.exploreBoxMobile2}/>
                <ExploreLink location='losangels' locationName='los angels' styleName={style.exploreBoxMobile3}/>
                <ExploreLink location='sanfrancisco' locationName='san francisco' styleName={style.exploreBoxMobile4}/>
                <ExploreLink location='boulder' locationName='boulder' styleName={style.exploreBoxMobile1}/>
                <ExploreLink location='lasvegas' locationName='las vegas' styleName={style.exploreBoxMobile2}/>
              </MediaQuery>
            </MediaQuery>
            <MediaQuery maxDeviceWidth={1224}>
              <ExploreLink location='philadelphia' locationName='philadelphia' styleName={style.exploreBoxMobile1}/>
              <ExploreLink location='newyork' locationName='new york' styleName={style.exploreBoxMobile2}/>
              <ExploreLink location='losangels' locationName='los angels' styleName={style.exploreBoxMobile3}/>
              <ExploreLink location='sanfrancisco' locationName='san francisco' styleName={style.exploreBoxMobile4}/>
              <ExploreLink location='boulder' locationName='boulder' styleName={style.exploreBoxMobile1}/>
              <ExploreLink location='lasvegas' locationName='las vegas' styleName={style.exploreBoxMobile2}/>
            </MediaQuery>
            {/*
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
            */}
        <Footer/>
      </div>
    );
  }
}

class ExploreLink extends React.Component{
render(){
return(
  <Link
    to={{
      pathname: '/explore',
      query: { location: this.props.location }
    }}>
  <div className = {this.props.styleName}>
    <p className = {style.exploreBoxBorder}>{this.props.locationName}</p>
  </div>
  </Link>
);
}
}

export default ExplorePage;
