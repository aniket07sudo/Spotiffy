import React, { useEffect } from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import axios from 'axios';
import {ReactComponent as Play} from '../Assets/play.svg';
import {ReactComponent as Pause} from '../Assets/pause.svg';
import {initSongs , setCurrent , isPlaying , addQueue , initPlaylists , setActivePlaylist} from '../store/actions/track';
import { Link } from 'react-router-dom';


function Card(props) {

    const linkHandler = (id) => {
        props.history.push(`/playlist/${id}`);
    }

    return(
        <>
        <div className="content-top">
                    <div className="content-head">
                    <h2>{props.head}</h2>
                    <p>{props.subHead}</p>
                    </div>
                <Link to="seall" className="see">See All</Link>
                </div>
        <div className="music-cards">
            {props.moreSongs ?   
            props.playlists && props.playlists.map(song => (
            <div  className={props.songid === song._id && props.isPlaying  ? "music-card card-active" : "music-card"} key={song._id}>
            <div className="music-card-content">
                <div className="music-img-container">
                    <div className="music-img">
                   
                    <img src={song.playCover ? song.playCover : song.cover} alt="image" />
                    </div>
                    {props.songid === song._id  && props.isPlaying ? 
                    <div className="music-img-btn">
                    <button onClick={() => props.isplaying(false)}><Pause /></button>
                </div> : 
                <div className="music-img-btn">
                    
                <div  onClick={() => { props.onSetSong(song._id,song.name,song.author,song.movie,song.audio,song.cover);props.onactivePlaylist(song._id) }}><Play /></div>
            </div>
                }
                </div>
            <div className="music-card-footer">
                <p>{song.name}</p>
                 <span>{song.author}</span>
            </div>
            </div>
        </div> 
            ))
            :  props.playlists && props.playlists.map(song  => (
          <div  className={props.songid === song._id && props.isPlaying || props.activePlaylist === song._id ? "music-card card-active" : "music-card"} key={song._id}>
            <div className="music-card-content">
                <div className="music-img-container">
                    <div className="music-img" onClick={() => linkHandler(song._id)}>
                   
                    <img src={song.playCover ? song.playCover : song.cover} alt="image" />
                    </div>
                    {props.songid === song._id || props.activePlaylist === song._id && props.isPlaying ? 
                    <div className="music-img-btn">
                    <button onClick={() => props.isplaying(false)}><Pause /></button>
                </div> : 
                <div className="music-img-btn">
                    
                <div  onClick={() => {  props.setQueue(song.songs);props.onSetSong(song.songs[0]._id,song.songs[0].name,song.songs[0].author,song.songs[0].movie,song.songs[0].audio,song.songs[0].cover);props.onactivePlaylist(song._id)  }}><Play /></div>
            </div>
                }
                </div>
            <div className="music-card-footer" onClick={() => linkHandler(song._id)}>
                <p>{song.name}</p>
                 <span>{song.author}</span>
            </div>
            </div>
        </div> 
    ))}
        
  
     </div>
     </>
    )
   
}


const mapStateToProps = state => {
    return {
        songs:state.tracks.songs,
        songid:state.tracks.activeSongid,
        isPlaying:state.tracks.isPlaying,
        // playlists:state.tracks.playlists,
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

export default connect(mapStateToProps,mapDispatchToProps)(withRouter(Card));