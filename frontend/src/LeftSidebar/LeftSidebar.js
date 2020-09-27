import React from 'react';
import './LeftSidebar.css';

class LeftSidebar extends React.Component {
  render() {
    return (
            <div>
                <h2>Coders God</h2>
                <div className="note-box-main">
                    <div className="note-link">
                        <a href="#">Home</a>
                    </div>
                    <div className="note-link">
                        <a href="#">About</a>
                    </div>
                    <div className="note-link">
                        <a href="#">Blogs</a>
                    </div>
                    <div className="note-link">
                        <a href="#">Web Plugins</a>
                    </div>
                    <div className="note-link">
                        <a href="#">Online Tools</a>
                    </div>
                    <div className="note-link">
                        <a href="#">Contact Us</a>
                    </div>
                </div>
            </div>    
    )    
  }
}

export default LeftSidebar;
