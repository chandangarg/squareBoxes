import React from 'react';
//import RiskLevel from './RiskLevel';
import ContextMenu from './ContextMenu/ContextMenu';
import Heatmap from './Heatmap/Heatmap';
import LeftSidebar from './LeftSidebar/LeftSidebar';
import HeatmapLegend from './HeatmapLegend/HeatmapLegend';


import axios from 'axios';

const MainData = { 
    //visible: false,
    backendpath:'https://square-boxes.vercel.app/public/', 
    inputStyle: 'none',
    inputClass: '',
    risks : [],
    colorItems : [],
    priorityScale: '',
    shown: 'parent comp data',
    column_count: 5,
    row_count: 5,
    columnLabels: [],
    rowLabels: []
  }


class ContentSection extends React.Component {
  constructor(props) {
    super(props);
    this.state = MainData;
  }

  componentDidMount() { 
    let heatmapComponent = this;
    //console.log('riskdata componentDidMount: ');
    // Optionally the request above could also be done as
    axios.get( this.state.backendpath+'/heatmap.php', {
        params: {
          ID: '1C59FC3E-CAAB-4DDB-7838-08D6B059DF9A'
        }
    })
    .then(function (response) {
        if( response.data ){
          //console.log(response.data);
          var heatmapItems = response.data.heatmap.items;
          var colorItems = response.data.heatmap.colour_items;
          var colCount = response.data.heatmap.column_count;
          var rowCount = response.data.heatmap.row_count;
          var columnLabels = response.data.heatmap.column_labels;
          var rowLabels = response.data.heatmap.row_labels;
          //console.log(columnLabels);
          heatmapComponent.setState({
            risks: heatmapItems
          });
          heatmapComponent.setState({
            column_count: colCount
          });
          heatmapComponent.setState({
            row_count: rowCount
          });
          heatmapComponent.setState({
            colorItems: colorItems
          });
          heatmapComponent.setState({
            columnLabels: columnLabels
          });
          heatmapComponent.setState({
            rowLabels: rowLabels
          });
          
          console.log(heatmapComponent);
        }
    })
    .catch(function (error) {
        console.log(error);
    })
    .finally(function () {
        // always executed
    });
  }

  updateState() {
    this.setState({ shown: 'parent data updated' });
  }

  _handleAddNewColumnBlocks = (id) => {
    let blockComponent = this; 
    this.setState({ risks: blockComponent.state.risks });
    
    this.updateColAndRowCount();
  }

  updateColAndRowCount = (event) => {
    let blockComponent = this;
    let mapComponent = blockComponent.state.risks;
    console.log(mapComponent);
    var colCount = 0;
    var rowCount = 0;
    mapComponent.map( function(RiskBlock){
      rowCount++;
      colCount = RiskBlock.length;
      RiskBlock.map( function(data){
        //console.log(data);
      });
    });
    blockComponent.setState({ row_count: rowCount });
    blockComponent.setState({ column_count: colCount });
  }

  _handleAddNewRowBlocks = (id) => {
    let blockComponent = this; 
    this.setState({ risks: blockComponent.state.risks });
    this.updateColAndRowCount();
  }

  _handleDeleteColumnBlocks = (id) => {
    let blockComponent = this; 
    this.setState({ risks: blockComponent.state.risks });

    this.updateColAndRowCount();
  }

  _handleDeleteRowBlocks = (id) => {
    let blockComponent = this; 
    //console.log(blockComponent.state.colorItems);
    this.setState({ risks: blockComponent.state.risks });
    this.setState({ colorItems: blockComponent.state.colorItems });

    this.updateColAndRowCount();
  }

  _handleBackgroundChange = (id) => {
    let blockComponent = this; 
    this.setState({ risks: blockComponent.state.risks });
    console.log(blockComponent.state.colorItems);
    this.setState({ colorItems: blockComponent.state.colorItems });
  }

  _handlecolumnLabels = (id) => {
    let blockComponent = this; 
    this.setState({ columnLabels: blockComponent.state.columnLabels });
  }

  _handlerowLabels = (id) => {
    let blockComponent = this; 
    this.setState({ rowLabels: blockComponent.state.rowLabels });
  }

  _handlePriorityChangeForLegends = (id) => {
    let blockComponent = this; 
    this.setState({ colorItems: blockComponent.state.colorItems });
  }

  render() {
    //let mapData = this;
    /*console.log('col_count: '+this.state.column_count);
    console.log('row_count: '+this.state.row_count);*/
    return <section className="container-main">
        <div className="container">
            <div className="row">
                <div className="col-md-9 order-md-12 print-full">
                        <Heatmap 
                          updateParent={this.state.shown} 
                          mapData={this.state.risks}
                          colCount={this.state.column_count}
                          rowCount={this.state.row_count}
                          columnLabels={this.state.columnLabels}
                          rowLabels={this.state.rowLabels}
                          rowLabelSpanStyle={''}
                          rowLabelInputStyle={'none'}
                          colorItems={this.state.colorItems}
                          PriorityChangeForLegends={this._handlePriorityChangeForLegends}
                        />
                        <HeatmapLegend colorData={this.state.colorItems} />
                        <ContextMenu 
                          mapData={this.state.risks} 
                          colorItems={this.state.colorItems}
                          blockBackground={'#fff'}
                          AddNewColumnBlocks={this._handleAddNewColumnBlocks}
                          AddNewRowBlocks={this._handleAddNewRowBlocks}
                          DeleteColumnBlocks={this._handleDeleteColumnBlocks}
                          DeleteRowBlocks={this._handleDeleteRowBlocks}
                          BackgroundChangeBlocks={this._handleBackgroundChange}
                          colCount={this.state.column_count}
                          rowCount={this.state.row_count}
                          columnLabels={this.state.columnLabels}
                          rowLabels={this.state.rowLabels}
                         />
                        
                    <div className="clearfix"></div>
                </div>
                <div className="col-md-3 order-md-1 sidebar-section">
                    <LeftSidebar />
                </div>
              </div>
            </div>
        </section>    

  }
}

export default ContentSection;
