import React from 'react';
import './dialog.less';
import { Transition } from 'react-transition-strict';
interface Option {
    opacity?: number
    title?: string
    warpClass?: string
    content?: any
    animation?: string   /* fade zoom slideDown slideLeft slideRight slideUp flip rotate door*/
    btnSuccText?: string
    onSucc?(event: any): any | Promise<any>
    btnFailText?: string
    onCancel?(event: any): any | Promise<any>
    maskHide?: boolean
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
    onCancel = (e) => {
        e.stopPropagation();
        const {
            onCancel,
        } = this.props.setting;
        const { context } = this.props;
        const cancelVal = onCancel(e);
        if (Object.prototype.toString.call(cancelVal) == '[object Promise]') {
            cancelVal.then(() => {
                context.hide();
            });
        } else {
            context.hide();
        }
    }
    onSucc = (e) => {
        e.stopPropagation();
        const {
            onSucc,
        } = this.props.setting;
        const { context } = this.props;
        const succVal = onSucc(e);
        if (Object.prototype.toString.call(succVal) == '[object Promise]') {
            succVal.then(() => {
                context.hide();
            });
        } else {
            context.hide();
        }
    }
    onMask = (e) => {
        e.stopPropagation();
        const {
            maskHide,
        } = this.props.setting;
        const { context } = this.props;
        maskHide && context.hide();
    }
    render() {
        const {
            opacity,
            title,
            content,
            btnSuccText,
            btnFailText,
            animation,
            warpClass
        } = this.props.setting;
        const style = {
            'background': `rgba(0,0,0,${opacity})`
        };
        const Content = typeof content == 'function' ? content : null;
        return (
            <div className='hk-mask' ref={(el) => { this.mask = el; }} onClick={this.onMask} style={style}>
                <Transition animation={animation}>
                    <div className={`hk-dialog ${warpClass}`}>
                        {title && <div className='hk-title1'>{title}</div>}
                        {typeof Content == 'function' ? <Content></Content> : <p className='hk-title1 hk-title2'>{content}</p>}
                        <div className='hk-btnlist onepx-top-border'>
                            {btnFailText && <div className='hk-abort' onClick={this.onCancel}>{btnFailText}</div>}
                            <div className='hk-ok onepx-left-border' onClick={this.onSucc}>{btnSuccText}</div>
                        </div>
                    </div>
                </Transition>
            </div >
        );
    }
}