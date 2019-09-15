import React, { Children, cloneElement, isValidElement, ReactNode } from 'react';

interface Props {
    component: ReactNode
}

interface State {

}
export default class TransitionGroup extends React.Component<Props, State> {
    public state: any;
    constructor(props: any) {
        super(props);

        this.state = {
            children: Children.map(props.children, (child: any) => {
                const { show, ...inProps } = child.props;
                return cloneElement(child, { show: true, ...inProps });
            })
        };
    }

    componentWillReceiveProps(nextProps: any) {
        const props = this.props;
        const newChildren = nextProps.children;
        const oldChildren = this.state.children;
        const oldCount = Children.count(oldChildren);
        const newCount = Children.count(newChildren);
        if (newCount > oldCount) {
            Children.forEach(newChildren, (child, key) => {
                if (oldChildren[key]) {
                    newChildren[key] = oldChildren[key];
                } else {
                    const { show, ...inProps } = child.props;
                    newChildren[key] = cloneElement(child, { show: true, ...inProps });
                }
            });
            const children = newChildren;
            this.setState({ children });
        } else {
            Children.forEach(oldChildren, (child, key) => {
                if (!newChildren[key]) {
                    const { show, onLeave, ...inProps } = child.props;
                    newChildren[key] = cloneElement(child, {
                        show: false,
                        onLeave: this.handleLeave.bind(this, child),
                        ...inProps
                    });
                } else {
                    newChildren[key] = child;
                }
            });
            const children = newChildren;
            this.setState({ children });
        }
    }

    handleLeave = (child: any) => {

        const children = this.state.children;
        children.splice(child.key, 1);
        this.setState({ children });
    }

    render() {
        const { children } = this.state;
        const { component: Component, ...propsList }: any = this.props;
        return (
            <Component {...propsList}>{children}</Component>
        );
    }
}
