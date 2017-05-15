var React = require('react');
var PropTypes = require('prop-types');
var { Button, Modal } = require('react-bootstrap');

class Confirm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isOpened : props.visible
        };
        this.onButtonClick = this.onButtonClick.bind(this);
        this.onClose = this.onClose.bind(this);
        this.onConfim = this.onConfim.bind(this);
    }

    onButtonClick() {
        this.setState({
            isOpened: true,
        });
    }

    onClose() {
        this.setState({
            isOpened: false,
        });
    }

    onConfim() {
        this.setState({
            isOpened: false,
        });
        this.props.onConfirm();
    }

    render() {
        var cancelButton = this.props.showCancelButton ?
            (<Button bsStyle="default" onClick={this.onClose}>{this.props.cancelText}</Button>) : null;
        var modal = (
            <Modal show={this.state.isOpened} onHide={this.onClose}>
                <Modal.Header>
                    <Modal.Title>{this.props.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {this.props.body}
                </Modal.Body>
                <Modal.Footer>
                    {cancelButton}
                    <Button bsStyle={this.props.confirmBSStyle} onClick={this.onConfim}>{this.props.confirmText}</Button>
                </Modal.Footer>
            </Modal>
        );
        var content;
        if (this.props.children) {
            var btn = React.Children.only(this.props.children);
            content = React.cloneElement(btn, {
                onClick: this.onButtonClick,
                style: this.props.style
            },
                btn.props.children,
                modal
            );
        } else {
            content = (
                <Button onClick={this.onButtonClick} style={this.props.style}>
                    {this.props.buttonText}
                    {modal}
                </Button>
            );
        }
        return content;
    }
}

Confirm.propTypes = {
    body: PropTypes.node.isRequired,
    buttonText: PropTypes.node,
    cancelText: PropTypes.node,
    confirmBSStyle: PropTypes.string,
    confirmText: PropTypes.node,
    onConfirm: PropTypes.func.isRequired,
    showCancelButton: PropTypes.bool.isRequired,
    title: PropTypes.node.isRequired,
    visible: PropTypes.bool
};

Confirm.defaultProps = {
    cancelText: 'Cancel',
    confirmText: 'Confirm',
    confirmBSStyle: 'danger',
    showCancelButton: true
};


module.exports = Confirm;