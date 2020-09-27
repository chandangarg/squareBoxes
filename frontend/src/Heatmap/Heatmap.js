import React from 'react';
import './Heatmap.css';
import HeatmapBlock from './HeatmapBlock';
import HeatmapRowLabel from './HeatmapRowLabel';
import HeatmapColumnLabel from './HeatmapColumnLabel';

class Heatmap extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = { 
            backendpath:'http://localhost/goatrisk-react/backend', 
            inputStyle: 'none',
            inputClass: '',
            risks : [],
            priorityScale: '',
            columnLabels: this.props.columnLabels,
            rowLabels: this.props.rowLabels
        };
    }

    _handlePriorityChangeForLegendsBlock = (id) => {
        this.props.PriorityChangeForLegends();
    }

    render() {
        var count = 0;
        //console.log('this.props data: ', this.props.colorItems);
        let buttonComponent = this;
        var buttons = this.props.mapData.map( function(RiskBlock){
            var riskBox = RiskBlock.map(function(data){
                //console.log(count);
                count++;
                return (
                    <HeatmapBlock
                        inputStyle={'none'}
                        priorityInputClass={'none'}
                        blockCount={count}
                        mapBlockData={data}
                        key={'heatmapblock_'+count}
                        colCount={buttonComponent.props.column_count}
                        rowCount={buttonComponent.props.row_count}
                        colorItems={buttonComponent.props.colorItems}
                        UpdateLegends={buttonComponent._handlePriorityChangeForLegendsBlock}
                    />
                )
            });
            return (
                <div className="risk-assessment-row" key={count}>
                    {riskBox}
                </div>
            )
        });

        let colLabelsComponent = this;
        var ColumnLabelsData = colLabelsComponent.props.columnLabels.map( function(Labels){
            return (
                <HeatmapColumnLabel 
                    columnLabelInputStyle={'none'}
                    columnLabelSpanStyle={''}
                    LabelData={Labels}
                />
            )
        });
        let rowLabelsComponent = this;
        var RowLabelsData = rowLabelsComponent.props.rowLabels.map( function(Labels){
            return ( 
                <HeatmapRowLabel 
                    rowLabelInputStyle={'none'}
                    rowLabelSpanStyle={''}
                    LabelData={Labels}
                />
            );
        });
        return (
            <div className="risk-assessment-main full-width">
                <h2>Dynamic Square Boxes </h2>
                <div className="risk-assessment-box" id="risk-assessment-box">
                    <div className="assessment-vertical-text"><span>Y Axis Legends</span></div>
                    <div className="risk-assessment-sub">
                        <div id="heatmap-box" className="risk-assessment-board">
                            {buttons}
                        </div>
                        <div className="assessment-bottom-label">
                            {RowLabelsData}
                        </div> 
                    </div>
                    <div className="impacts-text">X Axis Legends</div>   
                    <div className="assessment-right-label">
                        {ColumnLabelsData}
                    </div>
                </div>
            </div> )
      }
}
export default Heatmap;