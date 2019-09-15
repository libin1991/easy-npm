import React from 'react';
export default class TransitionGroup extends React.Component {
    static propTypes: {
        component: any;
    };
    static defaultProps: {
        component: string;
    };
    state: any;
    constructor(props: any);
    componentWillReceiveProps(nextProps: any): void;
    handleLeave: (child: any) => void;
    render(): any;
}
