import React, {Component} from 'react';
import ReactDOM,{render}  from 'react-dom';

import classnames from 'classnames';
import { Upload as AUpload, Button, Icon } from 'antd';
import { SplitContainer} from '../split-container';
const Dragger = AUpload.Dragger;

import './styles'

class Upload extends Component {
    constructor(props) {
        super(props)

        this.state = {
          hasFile:false
        }
    }

    static defaultProps ={
      buttonText:'点击或拖拉上传',
      children:'仅支持excel、word、pdf文件，且文件小于3M。',
    };

  componentWillMount(){
    const _props = this.props;
    const hasFile = _props.defaultFileList && _props.defaultFileList.length
    this.setState({
      hasFile
    });
  }

    onChange = (file) => {
      if(file.fileList == 0){
        this.setState({
          hasFile:false
        })
      }
    }

    render() {
        const {children,size,buttonText,disabled,...props} = this.props;
console.log('render')
        const classname = classnames(
          "o-upload",{
            ['o-upload--no-file']: !this.state.hasFile,
            ['o-upload--'+size]: size,
          }
        );

        return (
            <Dragger
              className={classname}
              disabled={disabled}
              {...props}
              onChange={(file)=>{this.onChange(file)}}
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