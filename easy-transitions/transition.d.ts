import React from 'react';
declare function noop(): void;
interface Props {
    show: boolean;
}
interface State {
    entering: boolean;
    leaving: boolean;
    visible: boolean;
}
export default class Transition extends React.Component<Partial<Props>, Partial<State>> {
    static propTypes: {
        className: any;
        onEnter: any;
        onLeave: any;
        show: any;
    };
    static defaultProps: {
        className: string;
        onEnter: typeof noop;
        onLeave: typeof noop;
        show: boolean;
    };
    state: any;
    refs: any;
    constructor(props: any);
    componentWillReceiveProps(nextProps: any): void;
    componentWillUnmount(): void;
    animationEnd: (e: any) => void;
    getClasses(): string;
    render(): any;
}
export {};
