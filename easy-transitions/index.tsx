import React from 'react';

import Transition from './transition';
import TransitionGroup from './transition-group';

import './css/index.less';

interface Props {
    animation: string;   /* fade zoom slideDown slideLeft slideRight slideUp flip rotate door*/

}
interface State {
}
export default class TransitionCom extends React.Component<Props, State> {

    render() {
        const { animation } = this.props;
        return (
            <TransitionGroup component='div'>
                <Transition className={animation}>
                    {this.props.children}
                </Transition>
            </TransitionGroup>
        );
    }
}