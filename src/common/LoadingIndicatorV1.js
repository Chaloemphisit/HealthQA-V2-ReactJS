import React from 'react';
import { Spin, Icon } from 'antd';
import './LoadingIndicatorV1.css'
import logo from './header-logo.png'

export default function LoadingIndicatorV1(props) {
    return (
        <div class="ipl-progress-indicator" id="ipl-progress-indicator">
            <div class="ipl-progress-indicator-head">
                <div class="first-indicator"></div>
                <div class="second-indicator"></div>
            </div>
            <div class="insp-logo-frame">
                <img src={logo} class="insp-logo-frame-img" alt="Logo"></img>
            </div>
        </div>
    );
}