import React, { Component, ReactNode } from 'react';
import ReactCrop from './xcrop';
interface State {
  options: object;
}
interface Props {
  options: any | object;
  onCancle: Function;
  onConfirm: Function;
  onError: Function;
}
export default class Cropcon extends Component<Props, State> {
  public state: State;

  private input: ReactNode;
  private crop: ReactNode;

  constructor(props) {
    super(props);
    console.log(props.options);
    this.state = {
      options: props.options || {}
    };
    this.input = '';  // 上传input
    this.crop = '';  // 裁剪组件

    this.onChange = this.onChange.bind(this);
    this.onCancle = this.onCancle.bind(this);
    this.onConfirm = this.onConfirm.bind(this);
    this.onError = this.onError.bind(this);
  }
  static el = null;
  static show() {
    Cropcon.el.click();
  }

  componentDidMount() {
    Cropcon.el = this.input;
    
    
    
    
   
    
    
  }

  onChange(e) {
    this.crop[0].load(e.target.files[0]);
  }

  onCancle(crop) {
    this.props.onCancle(crop);
  }

  onConfirm(crop) {
    this.props.onConfirm(crop);
  }

  onError(error) {
    this.props.onError(error);
  }

  render() {
    return (
      <div className='xcrop-con'>
        <input className='hide' ref={el => this.input = el || null} type='file' onChange={this.onChange} accept='image/*' value='' />
        <ReactCrop
          ref={el => this.crop = el || null}
          options={this.state.options}
          onCancle={this.onCancle}
          onConfirm={this.onConfirm}
          onError={this.onError}
        ></ReactCrop>
      </div>
    );
  }
}