import React, {Component, useEffect,useRef, useState} from 'react';
// import {ReactComponent as Back} from '../Assets/back.svg';
// import {ReactComponent as Forward} from '../Assets/forward.svg';
import {ReactComponent as User} from '../Assets/user.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import card1 from '../Assets/card-1.jpg';
import card2 from '../Assets/card-2.jfif';
import { connect } from 'react-redux';
import card3 from '../Assets/card-3.jpg';
import {ReactComponent as Play} from '../Assets/play.svg';
import {ReactComponent as Pause} from '../Assets/pause.svg';

import { Link } from 'react-router-dom';
import {initSongs , setCurrent , isPlaying , pauseExplicit , playExplicit } from '../store/actions/track';


function MainView(props) {

  
    useEffect(() => {
        props.oninitSongs();
      
    },[]);
    const mainRef = useRef(null);
    const change = () => {
        console.log(mainRef.current.scrollTop);
    }

    
    return(
        <>
        <div className="mainArea nav-active">
            <div className="main-head">
                <div className="main-controls">
                    <div ><FontAwesomeIcon icon={faAngleLeft} className="nav-control" /></div>
                    <div><FontAwesomeIcon icon={faAngleRight} className="nav-control" /></div>
                </div>
                <div className="main-right">
                    <button className="upgrade">
                        <span>UPGRADE</span>
                    </button>
                    <div className="user">
                        <User />
                    </div>
                </div>
            </div>
            </div>
            <div className="content-area" onScroll={change} ref={mainRef} >
                <div className="content-top">
                <h2>Recently Played</h2>
                <Link className="see">See All</Link>
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
                                <div className="music-img-btn" onClick={() => props.isplaying(false)}>
                                <button><Pause /></button>
                            </div> : 
                            <div className="music-img-btn" onClick={() => props.onSetSong(song._id,song.name,song.author,song.movie,song.audio,song.cover)}>
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
                ))}
                    
                  
                </div>      
                <div className="content-top">
                    <div className="content-head">
                    <h2>Shows to try</h2>
                    <p>Podcasts we think you'll get hooked on.</p>
                    </div>
                <Link className="see">See All</Link>
                </div>
                 <div className="music-cards">
                    <div className="music-card">
                        <div className="music-card-content">
                            <div className="music-img-container">
                                <div className="music-img">
                                <img src={card3} alt="image" />
                                </div>
                                <div className="music-img-btn">
                                    <button><Play /></button>
                                </div>
                            </div>
                        <div className="music-card-footer">
                            <p>Global Top 50</p>
                            <span>Your daily update of the most played tracks right now.</span>
                        </div>
                        </div>
                    </div>
                    <div className="music-card">
                        <div className="music-card-content">
                            <div className="music-img-container">
                                <div className="music-img">
                                <img src={card1} alt="image" />
                                </div>
                                <div className="music-img-btn">
                                    <button><Play /></button>
                                </div>
                            </div>
                        <div className="music-card-footer">
                            <p>Global Top 50</p>
                            <span>Your daily update of the most played tracks right now.</span>
                        </div>
                        </div>
                    </div>
                    
                </div> 
            </div>
        
        </>
    )  
}

const mapStateToProps = state => {
    return {
        songs:state.tracks.songs,
        songid:state.tracks.activeSongid,
        isPlaying:state.tracks.isPlaying
    }
}

const mapDispatchToProps = dispatch => {
    return {
        oninitSongs:() => dispatch(initSongs()),
        onSetSong:(currentSong,name,author,movie,audio,cover) => dispatch(setCurrent(currentSong,name,author,movie,audio,cover)),
        isplaying:(dec) => dispatch(isPlaying(dec)),
        pauseSong:() => dispatch(pauseExplicit()),
        playSong:() => dispatch(playExplicit())
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(MainView);