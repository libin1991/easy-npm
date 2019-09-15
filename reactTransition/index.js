import React from 'react';
import TransitionCom from './transition';
import TransitionGroup from './transition-group';
import './transition.less';
export class Transition extends React.Component {
    render() {
        const { animation } = this.props;
        return (React.createElement(TransitionGroup, { component: 'div' },
            React.createElement(TransitionCom, { className: animation }, this.props.children)));
    }
}
