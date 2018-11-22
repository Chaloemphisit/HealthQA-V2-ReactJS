import React from 'react';
import './style.css';
import logo from './header-logo.png';

export default function LoadingFullPage(props) {
    return (
        <div className="ipl-progress-indicator" id="ipl-progress-indicator">
            <div className="ipl-progress-indicator-head">
                <div className="first-indicator"></div>
                <div className="second-indicator"></div>
            </div>
            <div className="insp-logo-frame">
                <img src={logo} className="insp-logo-frame-img" alt="Logo" />
            </div>
        </div>
    );
}