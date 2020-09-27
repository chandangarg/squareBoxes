import React from 'react';

class HeatmapRowLabel extends React.Component {
    constructor(props) {
        super(props);

        this.state = { 
            rowLabelInputStyle: this.props.rowLabelInputStyle,
            rowLabelSpanStyle: this.props.rowLabelSpanStyle
        };

        this._handleDoubleClickDisplay = this._handleDoubleClickDisplay.bind(this);
        this._handleBlurRowLabelItem = this._handleBlurRowLabelItem.bind(this);
        this._handleRowLabelChange = this._handleRowLabelChange.bind(this);
        
    }

    _handleDoubleClickDisplay = (event) => {
        this.setState({ rowLabelInputStyle: ''});
        this.setState({ rowLabelSpanStyle: 'none'});
        var rowId = event.target.id;
        if( rowId ){
            rowId = rowId.split('_');
            rowId = rowId[1];
            setTimeout( function(){
                document.getElementById('rowkey_'+rowId).focus();
            }, 50);
        }
        
    }

    _handleBlurRowLabelItem = (event) => {
        this.setState({ rowLabelInputStyle: 'none'});
        this.setState({ rowLabelSpanStyle: ''});
    }

    _handleRowLabelChange = (event) => {
        let currentComponent = this.props.LabelData;
        currentComponent.item_name = event.target.value;
        /*allow max length to be added */
        if (event.target.value.length > event.target.maxLength) {
            event.target.value = event.target.value.slice(0, event.target.maxLength)
        }
    }

    render() {
        let myComponent = this;
        let LabelComponent = myComponent.props.LabelData;
        
        return ( 
            <div className="rowLabels" key={LabelComponent.id} onDoubleClick={myComponent._handleDoubleClickDisplay} >
                <span id={'key_'+LabelComponent.id} style={{display: myComponent.state.rowLabelSpanStyle }} >{LabelComponent.item_name}</span>
                <input maxlength={10} id={'rowkey_'+LabelComponent.id} style={{display: myComponent.state.rowLabelInputStyle}} onBlur={myComponent._handleBlurRowLabelItem} type="text" name={'rowLabel_'+LabelComponent.id} defaultValue={LabelComponent.item_name} onChange={myComponent._handleRowLabelChange} />
            </div>
        )
      }
}
export default HeatmapRowLabel;