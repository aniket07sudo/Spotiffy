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
import {isPlaying , setCurrentTime , setDuration , setCurrent , setRepeatOn} from '../store/actions/track';

class Screenplayer extends Component {

    constructor(props) {
        super(props);
        this.audioRef = React.createRef();
    }

    componentWillReceiveProps(props) {
      
        if(!props.isPlaying) {
            this.audioRef.current.pause();
     } else {
            this.audioRef.current.play();
         }
    }

    playSongHandler = () => {
    if(this.props.isPlaying) {
    this.audioRef.current.pause();
    this.props.isplaying(!this.props.isPlaying);
    } else if(!this.props.isPlaying){
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

    endHandler =  () => {
        let currentIndex = this.props.songs.findIndex((song) => song._id === this.props.currentSong);
        let tempSong = this.props.songs[(currentIndex + 1) % this.props.songs.length];
            this.props.setSong(tempSong._id,tempSong.name,tempSong.author,tempSong.movie,tempSong.audio,tempSong.cover);
    }
    skipTrackHandler = async (direction) => {
        if(!this.props.queue) {
            let currentIndex = this.props.songs.findIndex((song) => song._id === this.props.currentSong);
       
        if(direction == 'skip-forward') {
            let tempSong = this.props.songs[(currentIndex + 1) % this.props.songs.length];
            await this.props.setSong(tempSong._id,tempSong.name,tempSong.author,tempSong.movie,tempSong.audio,tempSong.cover);
        }
        if(direction == 'skip-back') {
            if((currentIndex - 1) % this.props.songs.length === -1) {
                let tempSong = this.props.songs[this.props.songs.length - 1];
           await this.props.setSong(tempSong._id,tempSong.name,tempSong.author,tempSong.movie,tempSong.audio,tempSong.cover);
            return ;
            }
            let tempSong = this.props.songs[(currentIndex - 1) % this.props.songs.length];
            this.props.setSong(tempSong._id,tempSong.name,tempSong.author,tempSong.movie,tempSong.audio,tempSong.cover);
        }
        } else {
            if(!this.props.queue) return this.endHandler();
        let currentIndex = this.props.queue.findIndex((song) => song._id === this.props.currentSong);
      
       
        if(direction == 'skip-forward') {
           
            let tempSong = this.props.queue[(currentIndex + 1) % this.props.queue.length];
            await this.props.setSong(tempSong._id,tempSong.name,tempSong.author,tempSong.movie,tempSong.audio,tempSong.cover);
        }
        if(direction == 'skip-back') {
            if((currentIndex - 1) % this.props.queue.length === -1) {
                let tempSong = this.props.queue[this.props.queue.length - 1];
           await this.props.setSong(tempSong._id,tempSong.name,tempSong.author,tempSong.movie,tempSong.audio,tempSong.cover);
            return ;
            }
            let tempSong = this.props.queue[(currentIndex - 1) % this.props.queue.length];
            this.props.setSong(tempSong._id,tempSong.name,tempSong.author,tempSong.movie,tempSong.audio,tempSong.cover);
        }
        }
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
                        <Link to={this.props.songname}>{this.props.songname}</Link>
                         
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
                        <button><Previous onClick={() => this.skipTrackHandler('skip-back')}/></button>
                        {this.playSongHandler}
                        <button className="play-btn" onClick={this.playSongHandler} onChangeCapture={this.playSongHandler}>{this.props.isPlaying  ?  <Pause  /> : <Play /> }</button>
                        
                        <button><Next onClick={() => this.skipTrackHandler('skip-forward')}/></button>
                        <button><Repeat onClick={this.props.setRepeat}/></button>
                    </div>
                    <audio src={this.props.songtrack} ref={this.audioRef} autoPlay preload="true" onTimeUpdate={this.timeUpdateHandler} onLoadedMetadata={this.timeUpdateHandler} onEnded={this.endHandler} />
                    {/* <Audio isPlaying={this.props.isPlaying} songtrack={this.props.songtrack}/> */}
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
        songs:state.tracks.songs,
        currentSong: state.tracks.activeSongid,
        songname: state.tracks.activeSongName,
        songauthor: state.tracks.activeSongAuthor,
        songphoto: state.tracks.activeSongCover,
        songtrack: state.tracks.activeSongtrack,
        isPlaying: state.tracks.isPlaying,
        currentTime: state.tracks.currentTime,
        durations: state.tracks.duration,
        genre:state.tracks.genre,
        queue:state.tracks.queue,
        pause:state.tracks.pause
    };
}

const mapDispatchToProps = dispatch => {
    return {
        isplaying:(dec) => dispatch(isPlaying(dec)),
        currentSongTime:(ctime) => dispatch(setCurrentTime(ctime)),
        duration:(duration) => dispatch(setDuration(duration)),
        setSong:(currSong,name,author,movie,audio,cover) => dispatch(setCurrent(currSong,name,author,movie,audio,cover)),
        setRepeat:() => dispatch(setRepeatOn())
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Screenplayer);