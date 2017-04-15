


import React from 'react'

import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import style from '../style.css';
import { Link } from 'react-router';
import { SocialIcon } from 'react-social-icons';
import SocialBadge from 'react-social-badge'




class Footer extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log("loc: ", this.props.location);

    let footer =
      <Grid>
          <Row>
            <Col xs={3} xsOffset={1} >
              <div className={style.footerHeader}>Silk</div>
              <div className={style.footerContent}>
                <ul>
                  <li><Link to={'/tour-creation'}>Create A Tour</Link></li>
                  <li><Link to={'/guide'}>Why Guide?</Link></li>
                </ul>
              </div>
            </Col>
            <Col xs={3} xsOffset={1} >
              <div className={style.footerHeader}>Resources</div>
              <div className={style.footerContent}>
                <ul>
                  <li><Link to={'/aboutus'}>About</Link></li>
                  <li><Link to={'/blog'}>Blog</Link></li>
                  <li><Link to={'/contactus'}>Contact Us</Link></li>
                </ul>
              </div>
            </Col>
            <Col xs={3} xsOffset={1} >
              <div className={style.footerHeader}>Connect With Silk</div>
              <div className={style.footerContent}>
                <ul>
                  <li className={style.icons}>
                    <SocialBadge badgeColor="#00aced" url="https://twitter.com/silktoursapp" />
                    <div className={style.social}>
                      <a href={'https://twitter.com/silktoursapp'} className={style.footerLink}>
                        Twitter
                      </a>
                    </div>
                  </li>
                  <li className={style.icons}>
                    <SocialBadge badgeColor="#3b5998" url="http://www.facebook.com/silktoursapp" />
                    <div className={style.social}>
                      <a href={'http://www.facebook.com/silktoursapp'} className={style.footerLink}>
                        Facebook
                      </a>
                    </div>
                  </li>
                  <li className={style.icons}>
                    <SocialBadge badgeColor="#3f729b" url="http://instagram.com/silktours"  />
                    <div className={style.social}>
                      <a href={'http://instagram.com/silktours'} className={style.footerLink}>
                        Instagram
                      </a>
                    </div>
                  </li>
                </ul>
              </div>
            </Col>
          </Row>
          <Row>
            <Col xs={10} xsOffset={1} >
              <hr />
            </Col>
          </Row>
          <Row>
            <Col xs={8} xsOffset={1}>
              <div className={style.footerContent}>© {new Date().getFullYear()} {this.props.brandName}</div>
            </Col>
            <Col xs={1}  >
              <div className={style.footerContent}><Link to={'/terms'}>Terms</Link></div>
            </Col>
            <Col xs={1}  >
              <div className={style.footerContent}><Link to={'/privacy'}>Privacy</Link></div>
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
