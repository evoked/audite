import React, { Component } from 'react';
import PropTypes from 'prop-types';

class PageSelect extends Component {
    constructor(props) {
        super(props)
        this.state({page: this.props.current})
    }

    // componentDidMount() {

    // }

    // componentDidUpdate() {

    // }

    render() {
        return (
            <div>
                <p>{this.state.page}</p>
            </div>
        );
    }
}

PageSelect.propTypes = {

};

export default PageSelect;