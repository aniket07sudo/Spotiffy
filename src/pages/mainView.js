import React, {Component, useEffect,useRef, useState} from 'react';
// import {ReactComponent as Back} from '../Assets/back.svg';
// import {ReactComponent as Forward} from '../Assets/forward.svg';
import {ReactComponent as User} from '../Assets/user.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { connect } from 'react-redux';
import {ReactComponent as Play} from '../Assets/play.svg';
import {ReactComponent as Pause} from '../Assets/pause.svg';
import Card from './card';
import {ReactComponent as Spot} from '../Assets/spotarrow.svg';
import { Link } from 'react-router-dom';
import {ReactComponent as Down} from '../Assets/userarrow.svg';
import {initSongs , setCurrent , isPlaying , addQueue , initPlaylists , setActivePlaylist } from '../store/actions/track';

function MainView(props) {
    useEffect(() => {
        props.oninitSongs();
        props.oninitPlaylist();
    },[]);
  
    const mainRef = useRef(null);
   

    return(
        <>
        <div className="mainArea" >
            <div className="main-head">
                <div className="main-controls">
                    <div className="navigation"><FontAwesomeIcon icon={faAngleLeft} className="nav-control" /></div>
                    <div className="navigation"><FontAwesomeIcon icon={faAngleRight} className="nav-control" /></div>
                </div>
                <div className="main-right">
                    <button className="upgrade">
                        <span>UPGRADE</span>
                    </button>
                    <div className="user">
                        <User />
                        <span>Aniket</span>
                        <Down />
                    </div>
                </div>
            </div>
            </div>
            <div className="content-area" ref={mainRef} >
                <div className="content-top">
                <h2>Recently Played</h2>
                <Link to="/seeall" className="see">See All</Link>
                </div>
                 <div className="music-cards">
                    
                {props.songs && props.songs.map(song  => (
                      <div className={props.songid === song._id && props.isPlaying ? "music-card card-active" : "music-card"} key={song._id}>
                        <div className="music-card-content">
                            <div className="music-img-container">
                                <div className="music-img">
                                <img src={song.cover} alt="image" />
                                </div>
                                {props.songid === song._id && props.isPlaying ? 
                                <span className="music-img-btn" onClick={() => props.isplaying(!props.isPlaying)}>
                                <button><Pause /></button>
                            </span> : 
                            <span className="music-img-btn" onClick={() => { props.onSetSong(song._id,song.name,song.author,song.movie,song.audio,song.cover); props.isplaying(!props.isPlaying)}}>
                            <button><Play /></button>
                        </span>
                            }
                          
                            </div>
                        <div className="music-card-footer">
                            <p>{song.name}</p>
                             <span>{song.author}</span>
                        </div>
                        </div>
                    </div> 
                ))}
                </div>      
               
            
                 {/* {props.playlists && props.playlists.map(song  => (
                        <div className={props.songid === song._id && props.isPlaying || props.activePlaylist === song._id ? "music-card card-active" : "music-card"} key={song._id}>
                        <div className="music-card-content">
                            <div className="music-img-container">
                                <div className="music-img">
                                {console.log(song.songs)}
                                <img src={song.playCover} alt="image" />
                                </div>
                                {props.songid === song._id || props.activePlaylist === song._id && props.isPlaying ? 
                                <div className="music-img-btn" onClick={() => props.isplaying(false)}>
                                <button><Pause /></button>
                            </div> : 
                            <div className="music-img-btn" onClick={() => { props.setQueue(song.songs);props.onSetSong(song.songs[0]._id,song.songs[0].name,song.songs[0].author,song.songs[0].movie,song.songs[0].audio,song.songs[0].cover);props.onactivePlaylist(song._id) }}>
                            <button><Play /></button>
                        </div>
                            }
                            </div>
                        <div className="music-card-footer">
                            <p>{song.name}</p>
                             <span>{song.author}</span>
                        </div>
                        </div>
                    </div>
                ))} */}
               
               <div className="content-top">
                    <div className="content-head">
                    <h2>Trending Playlists</h2>
                    <p>Playlists we think you'll get hooked on.</p>
                    </div>
                <Link to="/seall" className="see">See All</Link>
                </div>
                  <Card playlists={props.playlists}/>

                  <div className="content-top">
                    <div className="content-head">
                    <h2>Trending Playlists</h2>
                    <p>Playlists we think you'll get hooked on.</p>
                    </div>
                <Link to="seall" className="see">See All</Link>
                </div>
                <Card playlists={props.trending} />
             
            </div>
        
        </>
    )  
}

const mapStateToProps = state => {
    return {
        songs:state.tracks.songs,
        songid:state.tracks.activeSongid,
        isPlaying:state.tracks.isPlaying,
        playlists:state.tracks.playlists,
        trending:state.tracks.trendingPlaylists,
        activePlaylist:state.tracks.activePlaylist
    }
}

const mapDispatchToProps = dispatch => {
    return {
        oninitSongs:() => dispatch(initSongs()),
        onSetSong:(currentSong,name,author,movie,audio,cover) => dispatch(setCurrent(currentSong,name,author,movie,audio,cover)),
        isplaying:(dec) => dispatch(isPlaying(dec)),
        setQueue:(song) => dispatch(addQueue(song)),
        oninitPlaylist:() => dispatch(initPlaylists()),
        onactivePlaylist:(songid) => dispatch(setActivePlaylist(songid))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(MainView);