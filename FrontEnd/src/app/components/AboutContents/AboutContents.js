import React from 'react'

import {Grid, Row, Col, Thumbnail, Image} from 'react-bootstrap';

import Junho from '../../style/images/Junho.png';
import Matt from '../../style/images/Matt.png';
import Phil from '../../style/images/Phil.png';
import Troy from '../../style/images/Troy.png';
import Andrew from '../../style/images/Andrew.png';
import Harsh from '../../style/images/Harsh.png';
import Kendall from '../../style/images/Kendall.png';
import Yongqiang from '../../style/images/Yongqiang.png';
import Joe from '../../style/images/Joe.png';

class AboutContents extends React.Component{
  render(){
    return(
      <div>
        <br/>
        <Grid>
          <Row>
            <AboutContentsDiv picture={Matt} name={'Matt Esposito'} email={'mattespo23@gmail.com'} position={'Co-founder'}/>
            <AboutContentsDiv picture={Phil} name={'Phillip Ryan'} email={'p.ryanc@gmail.com'} position={'Co-founder'}/>
            <AboutContentsDiv picture={Kendall} name={'Kendal Stephens'} email={'kendall13stephens@gmail.com'} position={'Designer/Photographer'}/>
            <AboutContentsDiv picture={Junho} name={'Junho An'} email={'JunhoAn0702@gmail.com'} position={'Programmer'}/>
            <AboutContentsDiv picture={Andrew} name={'Andrew Shidel'} email={'ahs59@drexel.edu'} position={'Programmer'}/>
            <AboutContentsDiv picture={Harsh} name={'Harsh Bhargava'} email={'gizmoghost95@gmail.com'} position={'Programmer'}/>
            <AboutContentsDiv picture={Joe} name={'Joe Budd'} email={'jfb74@drexel.edu'} position={'Programmer'}/>
            <AboutContentsDiv picture={Troy} name={'Troy Santry'} email={'tps54@drexel.edu'} position={'Programmer'}/>
            <AboutContentsDiv picture={Yongqiang} name={'Yongqiang Fan'} email={'yf322@drexel.edu'} position={'Programmer'}/>
          </Row>
        </Grid>
      </div>
    );
  }
}

class AboutContentsDiv extends React.Component{
  render(){
    return(
      <Col xs={12} md={4} lg={4}>
        <Thumbnail>
          <Image src={this.props.picture} alt="350x500" circle/>
          <p>{this.props.name}</p>
          <p>Email: {this.props.email}</p>
          <p>Position: {this.props.position}</p>
        </Thumbnail>
      </Col>
    );
  }
}

export default AboutContents;
