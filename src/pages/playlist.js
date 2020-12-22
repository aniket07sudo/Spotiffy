import React , {Component, useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import {ReactComponent as User} from '../Assets/user.svg';
import axios from 'axios';
import { ReactComponent as Play} from '../Assets/play.svg';
import {ReactComponent as Like} from '../Assets/translike.svg';
import {ReactComponent as Options} from '../Assets/options.svg';
import {ReactComponent as Clock} from '../Assets/clock.svg';
import Card from './card';
import { currentPlaylist } from '../store/actions/track';
import Loader from 'react-loader-spinner';
import {setLoad} from '../store/actions/track';
import {ReactComponent as Pause} from '../Assets/pause.svg';
import Menu from './dropdown';
import Backdrop from './backdrop';
import {ReactComponent as Down} from '../Assets/userarrow.svg';
import Item from './item';
import Divider from './divider';
import {initSongs , setCurrent , isPlaying , addQueue , initPlaylists , setActivePlaylist} from '../store/actions/track';


class Playlist extends Component {
    state = {
        songs:[],
        name:null,
        playCover:null,
        author:null,
        year:null,
        totalsong:null,
        totalduration:null,
        moreSongs:[],
        color:'',
        secondary:'',
        id:null,
        drop:false,
        navDrop:false
    }
    constructor(props) {
        super(props);
        this.navRef = React.createRef();
        this.navDiv = React.createRef();
        this.albumHeader = React.createRef();
        this.albumList = React.createRef();
        this.extraNav = React.createRef();
    }


    // componentWillReceiveProps(nextProps) {
    //     if(nextProps.location.pathname !== this.props.location.pathname) {
    //         console.log("Next Props");
          
    //         axios.get(`http://localhost:5000${this.props.location.pathname}`).then(res => {
             
    //         this.setState({songs:res.data.playlist.songs,name:res.data.playlist.name,playCover:res.data.playlist.playCover,author:res.data.playlist.author,year:res.data.playlist.year,totalsong:res.data.playlist.totalsong,totalduration:res.data.playlist.totalDuration,moreSongs:res.data.morePlaylist,id:res.data.playlist.id});
    //         console.log(res.data.playlist.id);
    //     }).catch(err => {
   
    //         console.log(err);
    //     })
    //     }
    // }
 componentDidMount() {
    this.navDiv.current.style.background = this.state.color;
    
    this.albumHeader.current.style.background = `linear-gradient(${this.state.color} 0% , black 190%`;
    this.albumList.current.style.background = `linear-gradient(to bottom , ${this.state.color} -141% , rgba(0,0,0,0))`;
        axios.get(`http://localhost:5000${this.props.location.pathname}`).then(res => {
          
            this.setState({songs:res.data.playlist.songs,name:res.data.playlist.name,playCover:res.data.playlist.playCover,author:res.data.playlist.author,year:res.data.playlist.year,totalsong:res.data.playlist.totalsong,totalduration:res.data.playlist.totalDuration,moreSongs:res.data.morePlaylist,id:res.data.playlist.id,color:res.data.playlist.color,secondary:res.data.playlist.secondary});
        }).catch(err => {
            console.log(err);
        })
     
 }
    change = () => {
     if(this.navRef.current.scrollTop > 350) {
        this.navDiv.current.style.background = this.state.secondary;
        this.extraNav.current.style.visibility = 'visible';
        } else {
            this.navDiv.current.style.background = this.state.color;
            this.extraNav.current.style.visibility = 'hidden';
        }
     }

     dropdownHandler = () => {
         this.setState(prevState => ({drop:!prevState.drop}));
     }
     navdropdownHandler = () => {
         this.setState(prevState => ({navDrop:!prevState.navDrop}));
     }
     formatTime = (time) => {
        return (
            Math.floor(time/60) + ":" + ("0" + Math.floor(time % 60)).slice(-2)
        )
    }

    render() {
    
    return(
        <>
        <div className="mainArea" ref={this.navDiv} style={{backgroundColor:this.state.color}} >
        <div className="main-head" >
            <div className="main-controls">
                <div className="navigation" onClick={this.props.history.goBack} ><FontAwesomeIcon  icon={faAngleLeft} className="nav-control" /></div>
                <div className="navigation" onClick={this.props.history.goForward}><FontAwesomeIcon icon={faAngleRight} className="nav-control" /></div>
                <div className="extra-nav" ref={this.extraNav}>
                { this.props.isPlaying && this.state.id === this.props.activePlaylist ? 
                                <span className="nav-play-btn" onClick={() => this.props.isplaying(false)}>
                                <button><Pause /></button>
                            </span> : 
                            <span className="nav-play-btn" onClick={() => {this.props.onactivePlaylist(this.state.id); this.props.onSetSong(this.state.songs[0]._id,this.state.songs[0].name,this.state.songs[0].author,this.state.songs[0].movie,this.state.songs[0].audio,this.state.songs[0].cover);this.props.setQueue(this.state.songs); this.props.isplaying(true)}}>
                            <button><Play /></button>
                        </span>
                            }
                {/* <div className="nav-play-btn"><button><Play /></button></div> */}
                <p>{this.state.name}</p>
                </div>
               
            </div>
            <div className="main-right">
                <button className="upgrade">
                    <span>UPGRADE</span>
                </button>
                <div className="user" onClick={this.navdropdownHandler}>
                    <div className="user-wrapper">
                        <User />
                    </div>
                        <span>Aniket</span>
                        <Down />
                        {this.state.navDrop ? <Menu>
                            <Item>Account</Item>
                            <Item border>Profile</Item>
                            <Item>Logout</Item>
                        </Menu> : null}
                        
                    </div>
                    {this.state.navDrop ? <Backdrop clicked={this.navdropdownHandler} show={this.state.navDrop} /> : null}
            </div>
        </div>
        </div>
        <div className="content-area" onScroll={this.change} ref={this.navRef}>
            <div className="album-header" ref={this.albumHeader} style={{background:`linear-gradient(${this.state.color} 0% , black 190%`}}>
            <img src={this.state.playCover} className="album-photo"/>
            <div className="album-details">
                <p>ALBUM</p>
                <span className="album-title">{this.state.name}</span>
                <div className="author-details">
                <p className="author-name">{this.state.author}</p><span className="author-year">{this.state.year}</span><span>{this.state.totalsong} songs, {this.state.totalduration} min</span>
                </div>
            </div>
            </div>
           <div className="album-list" ref={this.albumList} style={{background:`linear-gradient(to bottom , ${this.state.color} -141% , rgba(0,0,0,0))`}}>
                <div className="album-options">
                
                { this.props.isPlaying && this.state.id === this.props.activePlaylist ? 
                                <span className="btn-play" onClick={() => this.props.isplaying(false)}>
                                <button><Pause /></button>
                            </span> : 
                            <span className="btn-play" onClick={() => {this.props.onactivePlaylist(this.state.id); this.props.onSetSong(this.state.songs[0]._id,this.state.songs[0].name,this.state.songs[0].author,this.state.songs[0].movie,this.state.songs[0].audio,this.state.songs[0].cover);this.props.setQueue(this.state.songs); this.props.isplaying(true)}}>
                            <button><Play /></button>
                        </span>
                            }
                    {/* <div className="btn-play"><button><Play /></button></div> */}
                    <div className="btn-like"><button><Like /></button></div>
                    <div className="btn-options"><button><Options onClick={this.dropdownHandler} /></button> {this.state.drop ? 
                   <Menu>
                      <Item>Add to Queue</Item>
                      <Item border>Go to Artist Radio</Item>
                    <Item>Add to Playlist</Item>
                    <Item border>Add to Your Library</Item>
                    <Item border>Share</Item>
                    <Item>Open in Desktop App</Item>
                   </Menu>
                    : null}</div>
                    {this.state.drop ? <Backdrop clicked={this.dropdownHandler} show={this.state.drop} /> : null}
                </div>
                <div className="table">
                    <div className="table-head">
                        <p>#</p>
                        <span className="sub">TITLE</span>
                        <span className="clock"><Clock /></span>
                    </div>                  
                    {this.state.songs.map((song,i) => (
                     <div className={this.props.isPlaying && song._id === this.props.activeSongs || song._id === this.props.activeSongs ? "table-songs table-songs-active" : "table-songs"} key={song._id} onClick={() => {this.props.onSetSong(song._id,song.name,song.author,song.movie,song.audio,song.cover);this.props.onactivePlaylist(this.state.id);this.props.setQueue(this.state.songs)}}>
                     <span className="color-b3">{ this.props.isPlaying && song._id === this.props.activeSongs  ? <Loader className="loader"/> : i+1}</span>
                     <div className="table-song-title">
                         <span>{song.name}</span>
                         <span className="sub">{song.author}</span>
                     </div>
                     <span className="table-song-duration">{this.formatTime(song.duration)}</span>
                 </div>
                  ))}
                </div>
           </div>
           <div className="more">
                <h2>More By {this.state.author} </h2>
              
                <Card playlists={this.state.moreSongs} moreSongs="true"/>
           </div>
            </div>      
            
    </>
    )
        }
}

const mapStateToProps = state => {
    return {
        loading:state.tracks.loading,
        isPlaying:state.tracks.isPlaying,
        activePlaylist:state.tracks.activePlaylist,
        activeSongs:state.tracks.activeSongid
    }
}

const mapDispatchToProps = dispatch => {
    return {
        load:() => dispatch(setLoad()),
        onSetSong:(currentSong,name,author,movie,audio,cover) => dispatch(setCurrent(currentSong,name,author,movie,audio,cover)),
        setQueue:(song) => dispatch(addQueue(song)),
        isplaying:(dec) => dispatch(isPlaying(dec)),
        onactivePlaylist:(songid) => dispatch(setActivePlaylist(songid))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(withRouter(Playlist));