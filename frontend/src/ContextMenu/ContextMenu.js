//'use strict'
import React from 'react';
import reactCSS from 'reactcss';
import { SketchPicker } from 'react-color'; 
import './ContextMenu.css';
import { unstable_batchedUpdates } from 'react-dom';

class ContextMenu extends React.Component {
    constructor(props) {
        super(props);
        //console.log( props );
        this._handleAddNewColumn = this._handleAddNewColumn.bind(this);
        this._handleAddNewRow = this._handleAddNewRow.bind(this);
        this._handleDeleteColumn = this._handleDeleteColumn.bind(this);
        this._handleDeleteRow = this._handleDeleteRow.bind(this);
        this.handleChangeComplete = this.handleChangeComplete.bind(this);

        this.state = {
            visible: false,
            displayColorPicker: false,
            color: {
                r: '241',
                g: '112',
                b: '19',
                a: '1', 
            },
            background: '#fff',
            blockID: '',
            risks: [],
            colorItems: this.props.colorItems,
            column_count: this.props.colCount,
            row_count: this.props.rowCount
            //columnLabels: this.props.columnLabels,
            //rowLabels: this.props.rowLabels,
        };
    }
    
    
    componentDidMount() {
        document.getElementById('heatmap-box').addEventListener('contextmenu', this._handleContextMenu);
        document.getElementById('heatmap-box').addEventListener('click', this._handleClick);
    };

    componentWillUnmount() {
        document.getElementById('heatmap-box').removeEventListener('contextmenu', this._handleContextMenu);
        document.getElementById('heatmap-box').removeEventListener('click', this._handleClick);
    };
    
    _handleContextMenu = (event) => {
        event.preventDefault();
        
        this.setState({ visible: true });
        this.setState({ blockID: event.toElement.parentElement.id });
        
        const clickX = event.clientX;
        const clickY = event.clientY;
        const screenW = window.innerWidth;
        const screenH = window.innerHeight;
        const rootW = this.root.offsetWidth;
        const rootH = this.root.offsetHeight;
        
        const right = (screenW - clickX) > rootW;
        const left = !right;
        const top = (screenH - clickY) > rootH;
        const bottom = !top;
        
        if (right) {
            this.root.style.left = `${clickX + 5}px`;
        }
        
        if (left) {
            this.root.style.left = `${clickX - rootW - 5}px`;
        }
        
        if (top) {
            this.root.style.top = `${clickY + 5}px`;
        }
        
        if (bottom) {
            this.root.style.top = `${clickY - rootH - 5}px`;
        }
    };

    _handleClick = (event) => {
        const { visible } = this.state;
        const wasOutside = !(event.target.contains === this.root);
        if (wasOutside && visible) this.setState({ visible: false, });
    };

    handleClickShowColorPicker = (event) => {
        this.setState({ displayColorPicker: !this.state.displayColorPicker });
    }
    handleClose = () => {
        this.setState({ displayColorPicker: false });
    };

    handleChangeComplete = (color) => {
        this.setState({ background: color.hex });
        var blockID = this.getBlockID();
        
        let blockComponent = this;
        var MapDataBlocks = blockComponent.props.mapData;
        var colorBlocks = blockComponent.props.colorItems;
        console.log(colorBlocks);
        var newMapBlocks = [];
        var rowCount = 0;
        var count = 0;
        MapDataBlocks.map( function(RiskBlock){
            var newriskblocks = [];
            RiskBlock.map(function(data){
                //data.background = color.hex;
                if( (count+1) == blockID ){
                    data.background = color.hex;
                    
                    var newColorItem = {};
                    /* code for random number generator */
                    const len = 32;
                    const arr = '123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
                    var ans = '';
                    for (var i = len; i > 0; i--) {
                        if( i == 12 || i == 16 || i == 20 || i == 24 ){
                            ans += '-';
                        } 
                        ans +=  arr[Math.floor(Math.random() * arr.length)]; 
                    }
                    var checkColorBlocks = 'notFound';
                    colorBlocks.map( function(colordata) {
                        var itemhexcode = colordata.hex_code;
                        if( itemhexcode === color.hex ){
                            checkColorBlocks = 'Found';    
                        }
                    });
                    console.log(checkColorBlocks);
                    if( checkColorBlocks !== 'Found' ){
                        newColorItem.id = ans;
                        newColorItem.hex_code = color.hex;
                        newColorItem.label = 'EDIT';
                        newColorItem.priority = data.priority;
                        console.log(newColorItem);
                        //colorBlocks.push( newColorItem );
                        //console.log( colorBlocks.length );
                        //blockComponent.props.colorItems.splice( 0, 1, newColorItem );
                        var insertAfter = colorBlocks.length;
                        blockComponent.props.colorItems.splice( insertAfter, 0, newColorItem );
                    }
                    data.colour_id = ans;
                }
                newriskblocks.push( data );
                count++;
            });
            newMapBlocks.push( newriskblocks );
            /* assign new blocks to mapdata state variables */
            blockComponent.props.mapData[rowCount] = newriskblocks;
            rowCount++;
        });
        //console.log('---');
        //console.log(blockComponent.props.colorItems);
        
        this.setState({ risks: blockComponent.props.mapData });
        this.setState({ colorItems: blockComponent.props.colorItems });

        /* code to update legend color items and remove any color item which is not in the heatmap */
        this.handleLegendColorblocks();

        this.props.BackgroundChangeBlocks();
    };

    handleLegendColorblocks = (event) =>{
        var newColorItem = [];
        let blockComponent = this;
        var MapDataBlocks = blockComponent.props.mapData;
        MapDataBlocks.map( function(RiskBlock){
            RiskBlock.map( function(data){
                var colour_id = data.colour_id;
                if( newColorItem.indexOf( colour_id ) == '-1' ){
                    newColorItem.push( colour_id );
                }
            });
        });
        //console.log(newColorItem);
        var colorBlocks = blockComponent.props.colorItems;
        var colorBlockIndex = 0;
        colorBlocks.map( function(colordata){
            if( newColorItem.indexOf( colordata.id ) == '-1' ){
                blockComponent.props.colorItems.splice( colorBlockIndex, 1 );
            }
            colorBlockIndex++;
        });
    }

    handleChange = (color) => {
        this.setState({ color: color.hex });
        this.setState({ background: color.hex });
    };

    _handleScroll = () => {
        const { visible } = this.state;
        if (visible) this.setState({ visible: false, });
    };

    _handleAddNewColumn = (event) => {
        let blockComponent = this;
        var MapDataBlocks = blockComponent.props.mapData;
        var MapColumnCount = blockComponent.props.colCount;
        /* retrict max of 8 cols */
        if( MapColumnCount >= 8 ){
            return false;
        }
        //console.log(MapColumnCount);

        /* code to merge array in data list */
        var blockID = this.getBlockID();
        
        var insertColumnCount = (blockID % MapColumnCount);
        if( insertColumnCount === 0 ){
            insertColumnCount = (MapColumnCount);
        }
        //console.log( 'insertCount: '+ insertColumnCount );
        
        var newMapBlocks = [];
        var MapColumnIDCount = 0;
        var rowCount = 0
        MapDataBlocks.map( function(RiskBlock){
            //console.log(RiskBlock.length);
            var newriskblocks = [];
            var dataCount = 0;
            var inserted = 0;
            var colorInserted = 0;

            var newColumnData = { 
                'id': MapColumnIDCount, 
                'value':'EDIT',
                'priority':0, 
                'column_index': MapColumnIDCount,
                'row_index' : rowCount
            };

            RiskBlock.map(function(data){
                //console.log(dataCount);
                // code to clone previous block colors
                var newcolc = insertColumnCount-1;
                if( colorInserted == newcolc ){
                    newColumnData.colour_id = data.colour_id;
                }

                if( dataCount === insertColumnCount ){
                    newColumnData.id = MapColumnIDCount;
                    newColumnData.column_index = MapColumnIDCount;
                    newColumnData.row_index = rowCount;

                    newriskblocks.push( newColumnData );
                    MapColumnIDCount++;
                    inserted++;
                }
                data.id = MapColumnIDCount;
                newriskblocks.push( data );

                MapColumnIDCount++;
                dataCount++;
                /* check and insert as last loop */
                if( (dataCount === insertColumnCount) && (MapColumnCount === insertColumnCount) && (inserted !== 1) ){
                    var newlastColumnData = { 
                        'id': MapColumnIDCount, 
                        'value':'EDIT',
                        'priority':0, 
                        'column_index': MapColumnIDCount,
                        'row_index' : rowCount 
                    };
                    //code to clone prev block color code
                    if( colorInserted <= insertColumnCount ){
                        newlastColumnData.colour_id = data.colour_id;
                    }
                    newriskblocks.push( newlastColumnData );
                    inserted++;
                }

                colorInserted++;
            });
            newMapBlocks.push( newriskblocks );
            /* assign new blocks to mapdata state variables */
            blockComponent.props.mapData[rowCount] = newriskblocks;
            rowCount++;
        });
        MapColumnCount = (MapColumnCount+1);
        //console.log(blockComponent.props);

        /*add column label names */
        var newColumnLabel = {};
        newColumnLabel.id = blockID; 
        newColumnLabel.item_name = 'EDIT';
        blockComponent.props.rowLabels.splice( insertColumnCount, 0, newColumnLabel );

        //blockComponent.props.colCount = MapColumnCount;
        this.setState({ risks: blockComponent.props.mapData });
        this.setState({ visible: false });
        //this.setState({ column_count: MapColumnCount });
        //console.log(this.state.column_count);
        this.props.AddNewColumnBlocks( event );
    };
    _handleAddNewRow = (event) => {
        let blockComponent = this;
        var startIDCount = 0;
        var MapColumnCount = blockComponent.props.colCount;
        var MapRowCount = blockComponent.props.rowCount;
        startIDCount = ( (MapColumnCount) * (MapRowCount) );
        /* retrict max of 8 rows */
        if( MapRowCount >= 8 ){
            return false;
        }
        /*console.log(this);
        console.log('BlockColumnCount: '+MapColumnCount);
        console.log('BlockRowCount: '+MapRowCount);*/

        var newRowData = [];
        for( var i=0; i < MapColumnCount; i++ ){
            var blockData = {};
            blockData.id = startIDCount;
            blockData.value = 'EDIT';
            blockData.priority = 0;
            blockData.colour_id = '';
            blockData.column_index = startIDCount;
            blockData.row_index = i;
            newRowData.push(blockData);
            startIDCount++;
        }
        MapRowCount = (MapRowCount+1);
        /* code to merge array in data list */
        var blockID = this.getBlockID();
        var checkRemainder = (blockID % MapColumnCount);
        blockID = (blockID/MapColumnCount);
        if( checkRemainder !== 0 ){
            blockID++;
        }
        var insertAfter = Math.floor(blockID);
        var MapDataBlocks = blockComponent.props.mapData;
        
        /*code to clone colors from above row*/
        var blockCount = 0;
        var takeColorFrom =  ( (insertAfter * MapColumnCount) - MapColumnCount );
        var updatedColors = 0;
        MapDataBlocks.map( function(RiskBlock){
            RiskBlock.map(function(data){
                if( blockCount >= takeColorFrom && updatedColors <= MapColumnCount ){
                    var insertedColor = 0;
                    newRowData.map( function(newData){
                        if( updatedColors == insertedColor ){
                            newData.colour_id = data.colour_id;
                        }
                        insertedColor++;    
                    });
                    updatedColors++;
                }
                blockCount++;
            });
        });

        blockComponent.props.mapData.splice( insertAfter, 0, newRowData );

        /*add column label names */
        var newColumnLabel = {};
        newColumnLabel.id = blockID; 
        newColumnLabel.item_name = 'EDIT';
        blockComponent.props.columnLabels.splice( insertAfter, 0, newColumnLabel );

        this.setState({ risks: blockComponent.props.mapData });
        this.setState({ visible: false });

        this.props.AddNewRowBlocks( event );
    }

    _handleDeleteColumn = (event) => {
        let blockComponent = this;
        var MapDataBlocks = blockComponent.props.mapData;
        var MapColumnCount = blockComponent.props.colCount;
        /* retrict min of 3 rows */
        if( MapColumnCount <= 3 ){
            return false;
        }
        
        /* code to merge array in data list */
        var blockID = this.getBlockID();
        
        var DeleteColumnIndex = (blockID % MapColumnCount);
        if( DeleteColumnIndex === 0 ){
            DeleteColumnIndex = (MapColumnCount);
        }
        DeleteColumnIndex = DeleteColumnIndex-1;
        //console.log('delete index:'+DeleteColumnIndex);

        var newMapBlocks = [];
        var MapColumnIDCount = 0;
        var rowCount = 0
        MapDataBlocks.map( function(RiskBlock){
            var newriskblocks = [];
            var dataCount = 0;
            RiskBlock.map(function(data){
                //console.log(dataCount);
                data.id = MapColumnIDCount;
                if( dataCount !== DeleteColumnIndex ){
                    newriskblocks.push( data );
                    MapColumnIDCount++;
                }
                MapColumnIDCount++;
                dataCount++;
            });
            newMapBlocks.push( newriskblocks );
            /* assign new blocks to mapdata state variables */
            blockComponent.props.mapData[rowCount] = newriskblocks;
            rowCount++;
        });
        MapColumnCount = (MapColumnCount+1);
        /*adjust row labels*/
        blockComponent.props.rowLabels.splice( DeleteColumnIndex, 1 );
        /* code to update legend color items */
        this.handleLegendColorblocks();
        this.setState({ risks: blockComponent.props.mapData });
        this.setState({ visible: false });
        //this.setState({ column_count: MapColumnCount });
        this.props.DeleteColumnBlocks( event );

    }

    _handleDeleteRow = (event) => {
        let blockComponent = this;
        var MapColumnCount = blockComponent.props.colCount;
        var MapRowCount = blockComponent.props.rowCount;
        /* retrict min of 3 rows */
        if( MapRowCount <= 3 ){
            return false;
        }
        var blockID = this.getBlockID();
        blockID = (blockID/MapColumnCount);
        var DeleteRowID = Math.round(blockID);
        if( DeleteRowID || DeleteRowID == '0' ){ 
            //DeleteRowID = DeleteRowID-1;
            blockComponent.props.mapData.splice( DeleteRowID, 1 );
            /*adjust column labels*/
            blockComponent.props.columnLabels.splice( DeleteRowID, 1 );
            //blockComponent.props.colorItems.splice( DeleteRowID, 1 );
        }
        this.setState({ visible: false });
        /* code to update legend color items */
        this.handleLegendColorblocks();
        
        this.setState({ risks: blockComponent.props.mapData });
        this.props.DeleteRowBlocks();
    }

    getBlockID = (event) => {
        var blockID = this.state.blockID;
        blockID = blockID.split('_');
        blockID = blockID[1];
        return blockID;
    }
    
    render() {
        let menuComponent = this;
        //console.log(menuComponent);
        const { visible } = this.state;
        const styles = reactCSS({
            'default': {
                color: {width: '36px',height: '14px',borderRadius: '2px',background: `rgba(${ this.state.color.r }, ${ this.state.color.g }, ${ this.state.color.b }, ${ this.state.color.a })`, },
                swatch: { padding: '5px', background: '#fff',borderRadius: '1px', boxShadow: '0 0 0 1px rgba(0,0,0,.1)',display: 'inline-block',cursor: 'pointer',  },
                popover: {position: 'absolute',zIndex: '2', },
                cover: {position: 'fixed',top: '0px',right: '0px',bottom: '0px',left: '0px', },
            },
        });
        
        //console.log( this.ref );
        
        return(visible || null) && 
            <div ref={ref => {this.root = ref}} className="contextMenu">
                <div onClick={ menuComponent._handleAddNewColumn } className="contextMenu--option">Add column right</div>
                <div onClick={ menuComponent._handleAddNewRow } className="contextMenu--option">Add row below</div>
                <div onClick={ menuComponent._handleDeleteColumn} className="contextMenu--option">Delete column</div>
                <div onClick={ menuComponent._handleDeleteRow } className="contextMenu--option contextMenu--option__disabled">Delete row</div>
                <div onClick={ this.handleClickShowColorPicker } className="contextMenu--option">Edit colour</div>
                { this.state.displayColorPicker ?
                    <div style={ styles.popover }> 
                    <div style={ styles.cover } onClick={ this.handleClose }/>
                        <SketchPicker color={ this.state.color } onChangeComplete={ this.handleChangeComplete } onChange={this.handleChange} />
                    </div>
                    : null
                }
            </div>
    };
}

export default ContextMenu;
