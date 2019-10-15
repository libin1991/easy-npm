import React from 'react';
import './dialog.less';
import { Transition } from 'react-transition-strict';
interface Option {
    opacity?: number
    title?: string
    warpClass?: string
    allwaysHide?: boolean
    content?: string
    animation?: string   /* fade zoom slideDown slideLeft slideRight slideUp flip rotate door*/
    btnSuccText?: string
    onSucc?(event: any): void
    btnFailText?: string
    onCancel?(event: any): void
    onMask?(event: any): void
    [name: string]: any
}
interface Props {
    setting: Option,
    [name: string]: any
}
export class DialogCom extends React.Component<Props, {}> {
    mask: any;
    constructor(props) {
        super(props);
        this.mask = '';
    }
    componentDidMount() {
        this.mask.addEventListener('touchmove', function (e) {
            e.stopPropagation();
            e.preventDefault();
        }, false);
    }
    render() {
        const {
            opacity,
            title,
            content,
            btnSuccText,
            onSucc,
            btnFailText,
            onCancel,
            onMask,
            animation,
            allwaysHide,
            warpClass
        } = this.props.setting;
        const { context } = this.props;
        const style = {
            'background': `rgba(0,0,0,${opacity})`
        };
        return (
            <div className='hk-mask' ref={(el) => { this.mask = el; }} onClick={(e) => {
                e.stopPropagation();
                onMask(context.hide.bind(context));
            }} style={style}>
                <Transition animation={animation}>
                    <div className={`hk-dialog ${warpClass}`}>
                        {title && <div className='hk-title1'>{title}</div>}
                        <p className='hk-title1 hk-title2'>{content}</p>
                        <div className='hk-btnlist onepx-top-border'>
                            <div className='hk-ok' onClick={(e) => {
                                e.stopPropagation();
                                onSucc(context.hide.bind(context));
                                allwaysHide && context.hide();
                            }}>{btnSuccText}</div>
                            {btnFailText && <div className='hk-abort onepx-left-border' onClick={(e) => {
                                e.stopPropagation();
                                onCancel(context.hide.bind(context));
                                allwaysHide && context.hide();
                            }}>{btnFailText}</div>}
                        </div>
                    </div>
                </Transition>
            </div >
        );
    }
}