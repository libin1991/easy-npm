import React from 'react';
import ReactDOM from 'react-dom';
import { DialogCom } from './dialog';
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
export class Dialog {
    static dialogEle = '';
    static show(option: Option) {
        const setting: Option = {
            opacity: 0.6,
            title: '提示信息',
            content: '消息提示成功',
            animation: 'slideDown',   /* fade zoom slideDown slideLeft slideRight slideUp flip rotate door */
            btnSuccText: '确定',
            onSucc() { },
            btnFailText: '',
            onCancel() { },
            maskHide: false,
            warpClass: ''
        };
        this.dialog({
            ...setting,
            ...option
        });
    }
    static dialog(setting: Option) {
        const div = document.createElement('div');
        const id = document.createAttribute('id');
        this.dialogEle = 'dialogEle-' + new Date().getTime();
        id.value = this.dialogEle;
        div.setAttributeNode(id);
        document.body.appendChild(div);
        ReactDOM.render(<DialogCom setting={setting} context={Dialog} />, div);
    }
    static hide() {
        const dialogEle = document.querySelector('#' + this.dialogEle);
        if (dialogEle) {
            ReactDOM.unmountComponentAtNode(dialogEle);
            document.body.removeChild(dialogEle);
        }
    }
}