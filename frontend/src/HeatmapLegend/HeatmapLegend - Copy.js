import React from "react";
import "./HeatmapLegend.css";
/*import Draggable from 'react-draggable';*/


import {
  GridContextProvider,
  GridDropZone,
  GridItem,
  swap,
  move
} from "react-grid-dnd";
 
function HeatmapLegend() {
  //super(props);
  const [items, setItems] = React.useState({
    left: [
      { id: 1, name: "Low", color:"low-bar" },
      { id: 2, name: "moderate", color:"moderate-bar"  },
      { id: 3, name: "high", color:"high-bar" },
      { id: 4, name: "extreme", color:"extreme-bar" },
      { id: 5, name: "chandan", color:"extreme-bar" }
    ]
  });
  
  console.log(items);
  //console.log(this.props);
 
  function onChange(sourceId, sourceIndex, targetIndex, targetId) {
    if (targetId) {
      const result = move(
        items[sourceId],
        items[targetId],
        sourceIndex,
        targetIndex
      );
      return setItems({
        ...items,
        [sourceId]: result[0],
        [targetId]: result[1]
      });
    }
 
    const result = swap(items[sourceId], sourceIndex, targetIndex);
    return setItems({
      ...items,
      [sourceId]: result
    });
  }
  
  

  return (
    <GridContextProvider onChange={onChange}>
      <div className="risk-guide-main full-width">
        <GridDropZone
          className="full-width"
          id="left"
          boxesPerRow={4}
          rowHeight={70}
        >
          {items.left.map(item => (
            <GridItem className="dropzone-box" key={item.name}>
                <div className="risk-guide-box">
                  <h2>{item.name}</h2>
                  <div className={'risk-guide-bar ' + item.color}></div>
                </div>
            </GridItem>
          ))}
        </GridDropZone>
      </div>
    </GridContextProvider>
  );
}

export default HeatmapLegend;
