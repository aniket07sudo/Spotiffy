import React from 'react';
import Logo from '../Assets/spotify.svg';
import {ReactComponent as Home} from '../Assets/home.svg';
import {NavLink} from 'react-router-dom';
import {ReactComponent as Search} from '../Assets/search.svg';
import {ReactComponent as Library} from '../Assets/library.svg';
import {ReactComponent as Add} from '../Assets/add.svg';
import {ReactComponent as Like} from '../Assets/like.svg';

function Sidebar() {

    return (
       
        <div className="sidebar">
            <div className="sidebar-wrapper">
                <div className="logo-holder">
                <img src={Logo} className="logo"/>
                <h2 className="sans title-logo">Spotify<span className="r">&#174;</span></h2>
                </div>
                <ul className="basic-list">
                    <li><NavLink to="/" exact><Home />Home</NavLink></li>
                    <li><NavLink to="/search"><Search />Search</NavLink></li>
                    <li><NavLink to="/library"><Library />Your Library</NavLink></li>
                </ul>
                <ul className="playlist">
                    <h5>PLAYLISTS</h5>
                    <li><NavLink to="/playlist"><div className="icon-wrapper"><Add className="playlist-icon"/></div>Create Playlists</NavLink></li>
                    <li><NavLink to="/collection"><div className="icon-wrapper gradient"><Like /></div>Liked Songs</NavLink></li>
                </ul>
            </div>
         
        </div>
        
    )
}
export default Sidebar;