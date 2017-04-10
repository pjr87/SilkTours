


import React from 'react'

import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import style from '../style.css';
import { Link } from 'react-router';
import { SocialIcon } from 'react-social-icons';




class Footer extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log("loc: ", this.props.location);

    let footer =
      <Grid>
          <Row>
            <Col xs={12} md ={4} >
              <p className={style.contactUsText}>
                © {new Date().getFullYear()} {this.props.brandName}
              </p>

              <p className={style.contactUsText}>
              <Link to='/contactus'>
                <span className={style.contactSpan}>✉     </span>
                <span className={style.contactSpan}>Contact Us</span>
              </Link>

              </p>
              
            </Col>
            <Col xs={12} md ={4}>
            </Col>
            <Col xs={12} md ={4}>
              <ul className="pull-right">
                <li className={style.icons}><SocialIcon url="https://twitter.com/silktoursapp" /></li>
                <li className={style.icons}><SocialIcon url="http://www.facebook.com/silktoursapp" /></li>
                <li className={style.icons}><SocialIcon url="http://instagram.com/silktours"  /></li>
              </ul>
            </Col>
          </Row>
      </Grid> ;

    if( this.props.location.pathname == '/messages')
    {
      footer = <div></div>;
    }

    return (
      <div className={ this.props.location.pathname =='/messages' || style.footerBG}>
        {footer}
      </div>
    )
  }
}

export default Footer;
