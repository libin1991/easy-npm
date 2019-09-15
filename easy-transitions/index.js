import React from 'react';
import Transition from './transition';
import TransitionGroup from './transition-group';
import './css/index.less';
export default class TransitionCom extends React.Component {
    render() {
        const { animation } = this.props;
        return (React.createElement(TransitionGroup, { component: 'div' },
            React.createElement(Transition, { className: animation }, this.props.children)));
    }
}
