import React from 'react';

class HeatmapLabel extends React.Component {
    constructor(props) {
        super(props);

        this.state = { 
            LabelInputStyle: this.props.LabelInputStyle,
            LabelSpanStyle: this.props.LabelSpanStyle
        };

        this._handleDoubleClickDisplay = this._handleDoubleClickDisplay.bind(this);
        this._handleBlurLabelItem = this._handleBlurLabelItem.bind(this);
        this._handleLabelChange = this._handleLabelChange.bind(this);
        
    }

    _handleDoubleClickDisplay = (event) => {
        this.setState({ LabelInputStyle: ''});
        this.setState({ LabelSpanStyle: 'none'});
        var rowId = event.target.id;
        if( rowId ){
            rowId = rowId.split('_');
            rowId = rowId[1];
            setTimeout( function(){
                document.getElementById('rowkey_'+rowId).focus();
            }, 50);
        }
        
    }

    _handleBlurLabelItem = (event) => {
        this.setState({ LabelInputStyle: 'none'});
        this.setState({ LabelSpanStyle: ''});
    }

    _handleLabelChange = (event) => {
        let currentComponent = this.props.LabelData;
        currentComponent.label = event.target.value;
        /*allow max length to be added */
        if (event.target.value.length > event.target.maxLength) {
            event.target.value = event.target.value.slice(0, event.target.maxLength)
        }
    }

    render() {
        let myComponent = this;
        let LabelComponent = myComponent.props.LabelData;
        
        return ( 
            <div className="risk-guide-box" key={LabelComponent.id} >
                <h2 id={'key_'+LabelComponent.id} style={{display: myComponent.state.LabelSpanStyle }} onDoubleClick={myComponent._handleDoubleClickDisplay} >{LabelComponent.label}</h2>
                <input maxlength={9} id={'rowkey_'+LabelComponent.id} style={{display: myComponent.state.LabelInputStyle}} onBlur={myComponent._handleBlurLabelItem} type="text" className={'LegendInput'} defaultValue={LabelComponent.label} onChange={myComponent._handleLabelChange} />
                <div style={{background: LabelComponent.hex_code}} className={'risk-guide-bar '}></div>
            </div>
        )
      }
}
export default HeatmapLabel;