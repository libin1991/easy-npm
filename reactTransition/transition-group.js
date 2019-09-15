var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
import React, { Children, cloneElement } from 'react';
export default class TransitionGroup extends React.Component {
    constructor(props) {
        super(props);
        this.handleLeave = (child) => {
            const children = this.state.children;
            children.splice(child.key, 1);
            this.setState({ children });
        };
        this.state = {
            children: Children.map(props.children, (child) => {
                const _a = child.props, { show } = _a, inProps = __rest(_a, ["show"]);
                return cloneElement(child, Object.assign({ show: true }, inProps));
            })
        };
    }
    componentWillReceiveProps(nextProps) {
        const props = this.props;
        const newChildren = nextProps.children;
        const oldChildren = this.state.children;
        const oldCount = Children.count(oldChildren);
        const newCount = Children.count(newChildren);
        if (newCount > oldCount) {
            Children.forEach(newChildren, (child, key) => {
                if (oldChildren[key]) {
                    newChildren[key] = oldChildren[key];
                }
                else {
                    const _a = child.props, { show } = _a, inProps = __rest(_a, ["show"]);
                    newChildren[key] = cloneElement(child, Object.assign({ show: true }, inProps));
                }
            });
            const children = newChildren;
            this.setState({ children });
        }
        else {
            Children.forEach(oldChildren, (child, key) => {
                if (!newChildren[key]) {
                    const _a = child.props, { show, onLeave } = _a, inProps = __rest(_a, ["show", "onLeave"]);
                    newChildren[key] = cloneElement(child, Object.assign({ show: false, onLeave: this.handleLeave.bind(this, child) }, inProps));
                }
                else {
                    newChildren[key] = child;
                }
            });
            const children = newChildren;
            this.setState({ children });
        }
    }
    render() {
        const { children } = this.state;
        const _a = this.props, { component: Component } = _a, propsList = __rest(_a, ["component"]);
        return (React.createElement(Component, Object.assign({}, propsList), children));
    }
}
