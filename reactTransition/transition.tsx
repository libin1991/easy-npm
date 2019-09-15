import React from 'react';
import classNames from 'classnames';

interface Props {
    show?: boolean;
    className?: string;
    onEnter?: Function;
    onLeave?: Function;
    children?: any;
}

interface State {
    entering: boolean;
    leaving: boolean;
    visible: boolean;
}
export default class Transition extends React.Component<Props, State> {
    public state: any;
    public refs: any;
    constructor(props: any) {
        super(props);
        this.state = {
            entering: props.show,
            leaving: false,
            visible: props.show
        };
        this.refs = '';
    }

    componentWillReceiveProps(nextProps: any) {
        if (!this.props.show && nextProps.show) {
            this.setState({
                entering: true,
                leaving: false,
                visible: true
            });
        } else if (this.props.show && !nextProps.show) {
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

    animationEnd = (e: any) => {
        const el = e.target;
        const {
            onEnter,
            onLeave
        }: any = this.props;

        const {
            entering,
            leaving
        } = this.state;

        this.setState({
            entering: false,
            leaving: false,
            visible: entering
        });

        if (entering) {
            onEnter && onEnter(el);
        } else if (leaving) {
            onLeave && onLeave(el);
        }
    }

    getClasses() {
        const {
            className
        }: any = this.props;

        const {
            entering,
            leaving
        } = this.state;

        return classNames({
            [`hk-rodal--${className}-enter`]: entering,
            [`hk-rodal--${className}-leave`]: leaving
        });
    }

    render() {
        const visible: any = this.state.visible;

        const {
            children,
            ...inProps
        }: any = this.props;

        const childrenPropsList: string = children.props.className || '';

        const style = {
            display: visible ? '' : 'none'
        };

        const child = React.Children.only(children);

        const childProps: any = {
            ...inProps,
            className: childrenPropsList + ' ' + this.getClasses(),
            style,
            onAnimationEnd: this.animationEnd,
            ref: (el: any) => {
                this.refs = el;
            }
        };

        delete childProps.onEnter;
        delete childProps.onLeave;
        delete childProps.show;
        return React.cloneElement(child, childProps);
    }
}