import React, {Component} from 'react';
import classnames  from 'classnames';


function getMargin(margin) {
    const marginOptin={
        min:'4',
        normal:'8',
        large:'16',
        left:"ml",
        right:"mr",
        top:'mt',
        bottom:'mb'
    }

    //当时string的时候，采用左右一致的间距
    if(typeof margin ==="string"){
        const val = marginOptin[margin]
        const marginVal = 'ml'+val+' mr'+val
        return marginVal

        //当是object 的时候采用
    }else {
        let marginVal="";
       for(let key in margin){
           marginVal +=  marginOptin[key]+marginOptin[margin[key]]+" "
        }
        return marginVal
    }
}


function text({color,weight,style,width,height,align,margin,children}) {
    // 暂时不开放style 属性,style只支持 width 和 height
    const {...styles} = {width,height};

    const alignOptin ={
        left:'tal',
        right:'tar dpb',
        center:'tac dpb'
    }

    const _class = classnames(
        {
            ["color-"+color]: color,
            ["fwb"]: weight === 'bold',
            ["fwn"]: weight === 'normal',
            [alignOptin[align]]: align,
            [getMargin(margin)+' dpib']: margin,
        }
    )
    return <span className={_class} style={{...styles}} >{children}</span>
}

export default text