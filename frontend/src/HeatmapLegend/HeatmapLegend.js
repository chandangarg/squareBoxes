import React from "react";
import "./HeatmapLegend.css";
/*import Draggable from 'react-draggable';*/
import HeatmapLabel from './HeatmapLabel';


import {
  GridContextProvider,
  GridDropZone,
  GridItem,
  //swap,
  move
} from "react-grid-dnd";
//import { render } from "@testing-library/react";

class HeatmapLegend extends React.Component {
  constructor(props) {
      super(props);

      this.state = {
        items: this.props.colorData,
        legendInputStyle: 'none',
        legendStyle: '',
        priority: ''
      }
      this.onChange = this.onChange.bind(this);
  }  
/*function HeatmapLegend() {
  const [items, setItems] = React.useState({
    left: [
      { id: 1, name: "Low", color:"low-bar" },
      { id: 2, name: "moderate", color:"moderate-bar"  },
      { id: 3, name: "high", color:"high-bar" },
      { id: 4, name: "extreme", color:"extreme-bar" }
    ]
  });*/
 
  onChange(sourceId, sourceIndex, targetIndex, targetId) {
    let items = this.props.colorData;
    if (targetId) {
      const result = move(
        items[sourceId],
        items[targetId],
        sourceIndex,
        targetIndex
      );
      //console.log( result );
      /*return setItems({
        ...items,
        [sourceId]: result[0],
        [targetId]: result[1]
      });*/
    }
 
    //const result = swap(items[sourceId], sourceIndex, targetIndex);
    /*return setItems({
      ...items,
      [sourceId]: result
    });*/
  }

  _handleDoubleClickDisplay = (event) => {
    this.setState({ legendInputStyle: ''});
    this.setState({ legendStyle: 'none'});
  }

  _handleBlurDisplay = (event) => {
    this.setState({ legendInputStyle: 'none'});
    this.setState({ legendStyle: ''});
  }
 
  render() {
    let colorData = this.props.colorData;
    /* code for sorting legends from color priorities */
    colorData.sort(function(a,b){
      return parseInt(b.priority)  - parseInt(a.priority);
    });
    
    return <div>
      <GridContextProvider /*onChange={onChange}*/ >
        <div className="risk-guide-main full-width">
          <GridDropZone
            className="full-width"
            id="left"
            boxesPerRow={4}
            rowHeight={70}
          >
            { //colorData.sort((a, b) => a.item.priority > b.item.priority).map(item => (
              colorData.map(item => (
              /*<GridItem className="dropzone-box" key={item.id}>
                  <div className="risk-guide-box">
                    <h2 id={'key_'+item.id} onDoubleClick={item._handleDoubleClickDisplay} >{item.label}</h2>
                    <div style={{background: item.hex_code}} className={'risk-guide-bar '}></div>
                  </div>
              </GridItem>*/
                <HeatmapLabel 
                    LabelInputStyle={'none'}
                    LabelSpanStyle={''}
                    LabelData={item}
                />
            ))}
          </GridDropZone>
        </div>
      </GridContextProvider>
    </div>
  }
}

export default HeatmapLegend;
