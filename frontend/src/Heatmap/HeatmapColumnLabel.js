import React from 'react';
import './Heatmap.css';


class HeatmapColumnLabel extends React.Component {
    constructor(props) {
        super(props);

        this.state = { 
            columnLabelInputStyle: this.props.columnLabelInputStyle,
            columnLabelSpanStyle: this.props.columnLabelSpanStyle
        };

        this._handleDoubleClickDisplay = this._handleDoubleClickDisplay.bind(this);
        this._handleBlurColumnLabelItem = this._handleBlurColumnLabelItem.bind(this);
        this._handleColumnLabelChange = this._handleColumnLabelChange.bind(this);
        
    }

    _handleDoubleClickDisplay = (event) => {
        this.setState({ columnLabelInputStyle: ''});
        this.setState({ columnLabelSpanStyle: 'none'});
        var colId = event.target.id;
        if( colId ){
            colId = colId.split('_');
            colId = colId[1];
            setTimeout( function(){
                document.getElementById('colkey_'+colId).focus();
            }, 50);
        }
    }

    _handleBlurColumnLabelItem = (event) => {
        this.setState({ columnLabelInputStyle: 'none'});
        this.setState({ columnLabelSpanStyle: ''});
    }

    _handleColumnLabelChange = (event) => {
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
            <div className="colLabels" key={LabelComponent.id} onDoubleClick={myComponent._handleDoubleClickDisplay} >
                <span id={'key_'+LabelComponent.id} style={{display: myComponent.state.columnLabelSpanStyle }} >{LabelComponent.item_name}</span>
                <input maxlength={10} id={'colkey_'+LabelComponent.id} style={{display: myComponent.state.columnLabelInputStyle}} onBlur={myComponent._handleBlurColumnLabelItem} type="text" name={'colLabel_'+LabelComponent.id} defaultValue={LabelComponent.item_name} onChange={myComponent._handleColumnLabelChange} />
            </div>
        )
      }
}
export default HeatmapColumnLabel;