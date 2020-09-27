import React from 'react';
import './LeftSidebar.css';

class LeftSidebar extends React.Component {
  render() {
    return (
            <div>
                <h2>Coders God</h2>
                <div className="note-box-main">
                    <div className="note-link">
                        <a href="http://codersgod.com/" target="_blank">Home</a>
                    </div>
                    <div className="note-link">
                        <a href="http://codersgod.com/about/" target="_blank">About</a>
                    </div>
                    <div className="note-link">
                        <a href="http://codersgod.com/category/php/" target="_blank">Blogs</a>
                    </div>
                    <div className="note-link">
                        <a href="http://codersgod.com/web-plugin/" target="_blank">Web Plugins</a>
                    </div>
                    <div className="note-link">
                        <a href="http://codersgod.com/online-tools" target="_blank">Online Tools</a>
                    </div>
                    <div className="note-link">
                        <a href="http://codersgod.com/contactus" target="_blank">Contact Us</a>
                    </div>
                </div>
            </div>    
    )    
  }
}

export default LeftSidebar;
