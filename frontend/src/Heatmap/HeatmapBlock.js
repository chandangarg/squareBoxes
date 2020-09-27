import React from 'react';

class HeatmapBlock extends React.Component {
    constructor(props) {
        super(props);

        this.state = { 
            //visible: false,
            //backendpath:'http://localhost/goatrisk-react/backend', 
            inputStyle: this.props.inputStyle,
            inputClass: this.props.inputClass,
            labelStyle: this.props.labelStyle,
            priorityScale: '',
            priorityBlockStyle: '',
            mapBlockData: [],
            priorityInputStyle: this.props.priorityInputClass,
            displayColorPicker: 'false',
            bgColor: ''
            //column_count: this.props.colCount,
            //row_count: this.props.rowCount
        };

        this._handleDoubleClickItem = this._handleDoubleClickItem.bind(this);
        this._handleDoubleClickPriority = this._handleDoubleClickPriority.bind(this);
        this._handleBlurItem = this._handleBlurItem.bind(this);
        this.handlePriorityChange = this.handlePriorityChange.bind(this);
        
    }

    handleClick() {
        this.setState({ displayColorPicker: !this.state.displayColorPicker })
    }
    
    handleClose = () => {
        this.setState({ displayColorPicker: false })
    };

    _handleDoubleClickItem = (event) => { 
        //alert('I got double-clicked!');
        this.setState({ inputStyle: ''});
        this.setState({ inputClass: 'active'});
        this.setState({ labelStyle: 'none'});
        this.setState({ priorityBlockStyle: 'none'});
        
        var blockId = event.target.id;
        if( blockId ){
            blockId = blockId.split('_');
            blockId = blockId[1];
            setTimeout( function(){
                document.getElementById('textarea_'+blockId).focus();
            }, 50);
        }
    }

    _handleBlurItem = (event) => {
        this.setState({ inputStyle: 'none'});
        this.setState({ inputClass: ''});
        this.setState({ priorityScale: ''});
        this.setState({ labelStyle: ''});
        this.setState({ priorityBlockStyle: ''});
        let currentComponent = this.props.mapBlockData;
        currentComponent.value = event.target.value;
    }

    _handleDoubleClickPriority = (event) => {
        this.setState({ priorityScale: 'scale'});
        this.setState({ priorityInputStyle: ''});

        var blockId = event.target.id;
        if( blockId ){
            blockId = blockId.split('_');
            blockId = blockId[1];
            setTimeout( function(){
                document.getElementById('inputpriority_'+blockId).focus();
            }, 50);
        }
    }

    _handleBlurPriorityItem = (event) => {
        this.setState({ priorityScale: ''});
        this.setState({ priorityInputStyle: 'none'});

        let currentComponent = this.props.mapBlockData;
        currentComponent.priority = event.target.value;
        //console.log(this.props);

        var priority = event.target.value;
        var background = currentComponent.background;
        
        var colorBlocks = this.props.colorItems;
        var colorBlockIndex = 0
        colorBlocks.map( function(colordata){
            if( colordata.hex_code == background ){
                colordata.priority =  priority;
            }
            colorBlockIndex++;
        });
        
        this.setState({ colorItems: colorBlocks });
        this.props.UpdateLegends();
    }

    // Handle Change.
    handlePriorityChange = (event) => {
        if (event.target.value.length > event.target.maxLength) {
            event.target.value = event.target.value.slice(0, event.target.maxLength)
        }
    }

    getBackgroundColorCode = (event) => {
        let currentComponent = this;
        let BlockComponent = currentComponent.props.mapBlockData;
        let colorItems = currentComponent.props.colorItems;
        var colorCode = '';
        if( BlockComponent.colour_id ){
            colorItems.map( function(colorData){
                if( colorData.id == BlockComponent.colour_id ){
                    colorCode = colorData.hex_code;
                }
            });
        }
        return colorCode;
    }

    render() {
        let currentComponent = this;
        let BlockComponent = currentComponent.props.mapBlockData;
        //console.log(BlockComponent);
        let colorCode = currentComponent.getBackgroundColorCode();
        

        return ( <div  id={'datakey_'+currentComponent.props.blockCount} className="risk-assessment-col" key={currentComponent.props.blockCount}  >
                    <div className={"full-width "} data-id={colorCode} style={{background: colorCode}} >
                        <div className="assessment-box-number">
                            <div id={'input_'+currentComponent.props.blockCount} className ="datavalue" data-value="1" onDoubleClick={currentComponent._handleDoubleClickItem} >
                                <label id={'key_'+BlockComponent.id} style={{display: this.state.labelStyle}} >{BlockComponent.value}</label>
                                <textarea id={'textarea_'+BlockComponent.id} maxLength = "21" className ={this.state.inputClass} onBlur={currentComponent._handleBlurItem} style={{display: this.state.inputStyle}} type="text" name={'key_'+BlockComponent.id} defaultValue={BlockComponent.value} />
                            </div>
                        </div>
                        <div style={{display: this.state.priorityBlockStyle}} id={'priority_'+currentComponent.props.blockCount} className ={'priority '+this.state.priorityScale} data-priority="1" onDoubleClick={currentComponent._handleDoubleClickPriority} ><b id={'key_'+BlockComponent.id}>{BlockComponent.priority}</b>
                            <input id={'inputpriority_'+BlockComponent.id} maxLength={2} style={{display: this.state.priorityInputStyle}} type="number" name={'priority_'+BlockComponent.id} onBlur={currentComponent._handleBlurPriorityItem} defaultValue={BlockComponent.priority} onChange={currentComponent.handlePriorityChange} />
                        </div>
                    </div>
                </div>
        )
      }
}
export default HeatmapBlock;