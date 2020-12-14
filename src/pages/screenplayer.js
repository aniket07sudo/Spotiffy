import React, { useRef , useEffect, Component} from 'react';

import {ReactComponent as Arrowup} from '../Assets/arrowup.svg';
import {ReactComponent as Heart} from '../Assets/heart.svg';
import {ReactComponent as Pip} from '../Assets/pip.svg';
import {ReactComponent as Play} from '../Assets/play.svg';
import {ReactComponent as Previous} from '../Assets/previous.svg';
import {ReactComponent as Shuffle} from '../Assets/shuffle.svg';
import {ReactComponent as Next} from '../Assets/next.svg';
import {ReactComponent as Repeat} from '../Assets/repeat.svg';
import {ReactComponent as Lyrics} from '../Assets/lyrics.svg';
import {ReactComponent as Queue} from '../Assets/queue.svg';
import {ReactComponent as Computer} from '../Assets/computer.svg';
import {ReactComponent as Pause} from '../Assets/pause.svg';
import {ReactComponent as Volume} from '../Assets/volume.svg';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import Player from './player';
import {isPlaying , setCurrentTime , setDuration} from '../store/actions/track';



class Screenplayer extends Component {

    constructor(props) {
        super(props);
        this.audioRef = React.createRef();
    }

         playSongHandler = () => {

         if(this.props.isPlaying) {
            this.audioRef.current.pause();
            this.props.isplaying(!this.props.isPlaying);
         } else {
            this.audioRef.current.play();
            this.props.isplaying(!this.props.isPlaying);
         }
       
    }
  
    
     timeUpdateHandler = (e) => {
        const current = e.target.currentTime;
        const duration = e.target.duration;
        
        this.props.currentSongTime(current);
        this.props.duration(duration);

    }
   
    formatTime = (time) => {
        return (
            Math.floor(time/60) + ":" + ("0" + Math.floor(time % 60)).slice(-2)
        )
    }
  
    render() {
      
    return(
        <div className="screenplayer">
        
            <div className="nowplaying">
                { this.props.songphoto ?
                <div className="song-info">
                    <div className="song-img-container">
                        <div className="song-img">
                         <img src={this.props.songphoto} alt="image"/> 
                        </div>
                        <div className="song-img-btn">
                            <button><Arrowup/></button>
                        </div>
                    </div>
                    <div className="song-txt-info">
                        <div className="song-name">
                        <Link>{this.props.songname}</Link>
                         
                        </div>
                        <div className="song-author">
                        <p>{this.props.songauthor}</p>
                        </div>
                    </div>
                </div> : <span className="select-song">Select a Song</span> }
                <div className="like-song">
                <button><Heart/></button>
                </div>
                <div className="pip">
                    <button><Pip /></button>
                </div>
            </div>
            <div className="player">
                <div className="player-controls">
                    <div className="player-nav-container">
                    <div className="player-nav">
                        <button><Shuffle /></button>
                        <button><Previous /></button>
                        <button className="play-btn" onClick={this.playSongHandler} onChangeCapture={this.playSongHandler}>{this.props.isPlaying  ? <Pause /> : <Play /> }</button>
                        <button><Next /></button>
                        <button><Repeat /></button>
                    </div>
                    <audio src={this.props.songtrack} ref={this.audioRef} autoPlay onTimeUpdate={this.timeUpdateHandler} onLoadedMetadata={this.timeUpdateHandler} />
                    </div>
                    <div className="player-progress">
                       <div className="playback-bar">
                           <div className="start-time">
                                {this.formatTime(this.props.currentTime)}
                           </div>
                           <Player player={true} audref={this.audioRef} current={this.props.currentTime} duration={this.props.durations}/>
                           <div className="end-time">
                                {this.formatTime(this.props.durations)}
                           </div>
                       </div>
                    </div>
                </div>
            </div>
            <div className="extra">
                <div className="extra-controls">
                    <button className="lyrics"><Lyrics /></button>
                    <button className="queue"><Queue/></button>
                    <button className="computer"><Computer /></button>
                    <button className="volume"><Volume/></button>
                    <div className="speaker-container">
                    <span className="speaker"></span>
                    <Player audref={this.audioRef}  volume={this.volumeHandler} />
                    </div>
                   
                </div>
            </div>
        </div>
        
    )
    }
    
}

const mapStateToProps = state => {
    return {
        currentSong: state.tracks.activeSongid,
        songname: state.tracks.activeSongName,
        songauthor: state.tracks.activeSongAuthor,
        songphoto: state.tracks.activeSongCover,
        songtrack: state.tracks.activeSongtrack,
        isPlaying: state.tracks.isPlaying,
        currentTime: state.tracks.currentTime,
        durations: state.tracks.duration
    };
}

const mapDispatchToProps = dispatch => {
    return {
        isplaying:(dec) => dispatch(isPlaying(dec)),
        currentSongTime:(ctime) => dispatch(setCurrentTime(ctime)),
        duration:(duration) => dispatch(setDuration(duration)) 
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Screenplayer);