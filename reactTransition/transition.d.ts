import React from 'react';
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
    state: any;
    refs: any;
    constructor(props: any);
    componentWillReceiveProps(nextProps: any): void;
    componentWillUnmount(): void;
    animationEnd: (e: any) => void;
    getClasses(): string;
    render(): React.DetailedReactHTMLElement<any, HTMLElement>;
}
export {};
