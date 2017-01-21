import React, {Component} from 'react';
import ToursList from './ToursList';

class ToursDisplay extends Component {
    constructor(props) {
        super(props);
        this.state = {
            postInfo: {
                tours:[]
            },
        }
    }


    componentWillReceiveProps (nextProps) {

        const { tours } = nextProps;

        // sync the props to state directly (this is the first post)
        this.setState({
            postInfo: {
                tours
            }
        })
    }

    render() {
        const { tours } = this.state.postInfo;

        return (
            <div> <ToursList tours={tours}/>
            </div>
        );
    }
}

export default ToursDisplay;
