var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
import React from 'react';
import PropTypes from 'prop-types';
import classNames from './classnames/index';
function noop() { }
export default class Transition extends React.Component {
    constructor(props) {
        super(props);
        this.animationEnd = (e) => {
            const el = e.target;
            const { onEnter, onLeave } = this.props;
            const { entering, leaving } = this.state;
            this.setState({
                entering: false,
                leaving: false,
                visible: entering
            });
            if (entering) {
                onEnter && onEnter(el);
            }
            else if (leaving) {
                onLeave && onLeave(el);
            }
        };
        this.state = {
            entering: props.show,
            leaving: false,
            visible: props.show
        };
        this.refs = '';
    }
    componentWillReceiveProps(nextProps) {
        if (!this.props.show && nextProps.show) {
            this.setState({
                entering: true,
                leaving: false,
                visible: true
            });
        }
        else if (this.props.show && !nextProps.show) {
            this.setState({
                entering: false,
                leaving: true,
                visible: true
            });
        }
    }
    componentWillUnmount() {
        this.setState({
            entering: false,
            leaving: false,
            visible: false
        });
    }
    getClasses() {
        const { className } = this.props;
        const { entering, leaving } = this.state;
        return classNames({
            [`rodal-${className}-enter`]: entering,
            [`rodal-${className}-leave`]: leaving
        });
    }
    render() {
        const visible = this.state.visible;
        const _a = this.props, { children } = _a, inProps = __rest(_a, ["children"]);
        const childrenPropsList = children.props.className || '';
        const style = {
            display: visible ? '' : 'none'
        };
        const child = React.Children.only(children);
        const childProps = Object.assign({}, inProps, { className: childrenPropsList + ' ' + this.getClasses(), style, onAnimationEnd: this.animationEnd, ref: (el) => {
                this.refs = el;
            } });
        delete childProps.onEnter;
        delete childProps.onLeave;
        delete childProps.show;
        return React.cloneElement(child, childProps);
    }
}
Transition.propTypes = {
    className: PropTypes.string,
    onEnter: PropTypes.func,
    onLeave: PropTypes.func,
    show: PropTypes.bool
};
Transition.defaultProps = {
    className: '',
    onEnter: noop,
    onLeave: noop,
    show: false
};
