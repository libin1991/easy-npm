import React from 'react';

import TransitionCom from './transition';
import TransitionGroup from './transition-group';

import './transition.less';

interface Props {
    animation: string;   /* fade zoom slideDown slideLeft slideRight slideUp flip rotate door*/

}
interface State {
}
export class Transition extends React.Component<Props, State> {

    render() {
        const { animation } = this.props;
        return (
            <TransitionGroup component='div'>
                <TransitionCom className={animation}>
                    {this.props.children}
                </TransitionCom>
            </TransitionGroup>
        );
    }
}