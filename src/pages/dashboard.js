import React from 'react';
import Sidebar from './sidebar';
import MainView from './mainView';
import ScreenPlayer from './screenplayer';

function dashboard () {
    return (
        <div className="dashboard">
            <Sidebar/>
            <MainView/>
            <ScreenPlayer />
        </div>
    )
}

export default dashboard;