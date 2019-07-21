import React, { Component, ReactNode } from 'react';
import './xcrop.less';
import Crop from 'xcrop';
interface Props {
  options: object;
  onCancle: Function;
  onConfirm: Function;
  onError: Function;
}

const EVENTS = [
  'cancle', // 取消
  'confirm', // 确认
  'loaded', // 图片加载完成
  'error', // 图片加载出错
  'dragstart', // 单指按下
  'dragmove', // 单指拖动
  'dragend', // 单指拖动结束
  'pinchstart', // 双指按下
  'pinchmove', // 双指拖动
  'pinchend' // 双指拖动结束
];

export default class ReactCrop extends Component<Props, {}> {
  protected el: ReactNode;
  constructor(props) {
    super(props);
    this.el = null;
  }
  componentDidMount() {
    this.init();
    this.addEvents();
  }

  componentWillUnmount() {
    this[0] && this[0].destroy();
    this[0] = null;
  }

  init() {
    this[0] = new Crop({ ...this.props.options, el: this.el });
  }

  addEvents() {
    const that = this;

    EVENTS.forEach(eventName => {
      that[0].on(eventName, function () {
        const name = `on${firstToUpperCase(eventName)}`;
        // @ts-ignore
        that.props[name] && that.props[name](...arguments);
      });
    });
  }

  render() {
    return (
      <div className='crop-component' ref={el => this.el = el}></div>
    );
  }
}

/**
 * 首字母大写
 * @param {String} text 单词
 */
function firstToUpperCase(text) {
  return text.charAt(0).toUpperCase() + text.slice(1);
}
