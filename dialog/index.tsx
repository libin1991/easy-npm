import React from 'react';
import ReactDOM from 'react-dom';
import { DialogCom } from './dialog';
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
export class DialogCpt {
    static dialogEle = '';
    static show(option: Option) {
        const setting: Option = {
            opacity: 0.6,
            allwaysHide: true,
            title: '提示信息',
            content: '消息提示成功',
            animation: 'slideDown',   /* fade zoom slideDown slideLeft slideRight slideUp flip rotate door*/
            btnSuccText: '确定',
            onSucc() { },
            btnFailText: '',
            onCancel() { },
            onMask() { },
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
        ReactDOM.render(<DialogCom setting={setting} context={DialogCpt} />, div);
    }
    static hide() {
        const dialogEle = document.querySelector('#' + this.dialogEle);
        if (dialogEle) {
            ReactDOM.unmountComponentAtNode(dialogEle);
            document.body.removeChild(dialogEle);
        }
    }
}

export function Dialog(option: Option) {
    DialogCpt.show(option);
}

