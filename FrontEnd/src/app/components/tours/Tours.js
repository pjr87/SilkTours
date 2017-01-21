import React from 'react';
import style from '../../style/style.css';

const Tours = ({name, price, address_street, styleIndex}) => {
    var styleBox;
    if ((styleIndex+1) % 4 === 0){
      styleBox = style.exploreBox4;
    }
    else if ((styleIndex+1) % 4 === 1){
      styleBox = style.exploreBox1;
    }
    else if ((styleIndex+1) % 4 === 2){
      styleBox = style.exploreBox2;
    }else {
      styleBox = style.exploreBox3;
    }
    return (
      <div className = {styleBox}>
        <p className = {style.exploreBoxBorder}>{name}</p>
      </div>
    );
};

export default Tours;
