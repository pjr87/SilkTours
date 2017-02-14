import React, {Component} from 'react';
import ToursDisplay from '../../components/tours/ToursDisplay.js';
import Warning from '../../components/warning/Warning.js';
import * as service from '../../ajaxServices/AjaxList.js';


class TourContainer extends Component {

     constructor(props) {
        super();
        // initializes component state
        this.state = {
            fetching: false, // tells whether the request is waiting for response or not
            tours: [],
            warningVisibility: false
        };
    }

    componentDidMount() {
        this.fetchPostInfo(1);
    }

    showWarning = () => {
        this.setState({
            warningVisibility: true
        });
        // after 1.5 sec
        setTimeout(
            () => {
                this.setState({
                    warningVisibility: false
                });
            }, 1500
        );
    }


    fetchPostInfo = async (postId) => {
        this.setState({
            fetching: true // requesting..
        });

        try {
            // wait for two promises
            const info = await Promise.all([
                service.getAllTours()
            ]);

            // Object destructuring Syntax,
            // takes out required values and create references to them

            const tours = info[0].data.data

            this.setState({
                tours,
                fetching: false // done!
            });

        } catch(e) {

            // if err, stop at this point
            this.setState({
                fetching: false
            });

            this.showWarning();
        }
    }

    render() {
        const {fetching, tours, warningVisibility} = this.state;

        return (
            <div>
                <ToursDisplay tours={tours}/>
                <Warning visible={warningVisibility} message="That post does not exist"/>
            </div>
        );
    }
}

export default TourContainer;
