import React, { ReactNode } from 'react';
interface Props {
    component: ReactNode;
}
interface State {
}
export default class TransitionGroup extends React.Component<Props, State> {
    state: any;
    constructor(props: any);
    componentWillReceiveProps(nextProps: any): void;
    handleLeave: (child: any) => void;
    render(): JSX.Element;
}
export {};
