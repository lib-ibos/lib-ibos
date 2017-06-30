import React, {Component} from 'react';
import ReactDOM,{render}  from 'react-dom';

import classnames from 'classnames';
import { Upload as AUpload, Button, Icon } from 'antd';
const Dragger = AUpload.Dragger;

import './styles'

class Upload extends Component {
    constructor(props) {
        super(props)
    }

    static defaultProps ={
      buttonText:'点击或拖拉上传',
      children:'仅支持 excel、word、pdf 文件，且文件小于 3M。',
    };

  // componentWillMount(){
  //   const _props = this.props;
  //   const hasFile = _props.defaultFileList && _props.defaultFileList.length || _props.fileList && _props.fileList.length
  //   this.setState({
  //     hasFile
  //   });
  // }
  //
  //   onChange = (file) => {
  //     if(file.fileList.length == 0){
  //       this.setState({
  //         hasFile:false
  //       })
  //     }else {
  //       this.setState({
  //         hasFile:true
  //       })
  //     }
  //     this.props.onChange && this.props.onChange(file)
  //   };

    render() {
        const _props = this.props;
        const {children,size,buttonText,disabled,...props} = _props;
        const hasFile = _props.defaultFileList && _props.defaultFileList.length || _props.fileList && _props.fileList.length
        const classname = classnames(
          "o-upload",{
            ['o-upload--no-file']: !hasFile,
            ['o-upload--'+size]: size,
            ['o-upload--disabled']: disabled,
          }
        );

        return (
            <Dragger
              className={classname}
              disabled={disabled}
              {...props}
            >
                <Button  size={size} disabled={disabled}>
                  {buttonText}
                </Button>
                <span className="o-upload--des"><Icon type="info-circle" className="color-primary"/> {children}</span>
            </Dragger>
        );
    }
}

export default Upload;