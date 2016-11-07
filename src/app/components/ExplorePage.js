import React from 'react';
import style from './style/style.css';
import Header from './Header';

class ExplorePage extends React.Component {
    constructor(props){
      super(props);
      this.state = {
        name: 'Explore'
      };
    }
    render(){
        return (
          <div className= {style.exploreMain}>
            <Header/>
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
          </div>
        );
    }
}

export default ExplorePage;
