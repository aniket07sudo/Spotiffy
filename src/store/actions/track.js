import * as actionTypes from './actions';
import axios from 'axios';

export const playSong = () => {
    return {
        type:actionTypes.PLAY_SONG
    }
}

export const pauseSong = () => {
    return {
        type:actionTypes.PAUSE_SONG
    }
}

export const setSongs = (songs) => {
    return {
        type:actionTypes.SET_SONGS,
        songs:songs
    }
}

export const setActivePlaylist = (songid) => {
    return {
        type:actionTypes.SET_ACTIVE_PLAYLIST,
        songid
    }
}

export const isPlaying = (dec) => {
    return {
        type:actionTypes.IS_PLAYING,
        dec:dec
    }
}

export const setRepeatOn = () => {
    return {
        type:actionTypes.SET_REPEAT_ON
    }
} 
 
export const setCurrent = (currSong,name,author,movie,audio,cover) => {
    return {
        type:actionTypes.SET_CURRENT,
        currentSong:currSong,
        name:name,
        author:author,
        movie:movie,
        audio:audio,
        cover:cover
    }
}

export const setCurrentTime = (time) => {
    return {
        type:actionTypes.SET_CURRENT_TIME,
        time
    }
}

export const setDuration = (duration) => {
    return {
        type:actionTypes.SET_DURATION,
        duration
    }
}

export const addQueue = (songs) => {
    return {
        type:actionTypes.ADD_QUEUE,
        queueSongs:songs
    }
}

export const playExplicit = () => {
    return {
        type:actionTypes.PLAY_SONG
    }
}

export const setCustom = (songs,recommended) => {
    return {
        type:actionTypes.SET_CUSTOM,
        recommended,
        songs
    }
}

export const setTrending = (song) => {
    return {
        type:actionTypes.SET_TRENDING,
        song
    }
}

export const pause = () => {
    return {
        type:actionTypes.PAUSE
    }
}

export const setPlaylists = (song,trending) => {
    return {
        type:actionTypes.SET_PLAYLISTS,
        playlistSong:song,
        trending
    }
}

export const setCurrentPlaylist = (data) => {
    return {
        type:actionTypes.SET_CURRENT_PLAYLIST,
        data
    }
}

export const setLoad = () => {
    return {
        type:actionTypes.LOAD
    }
}

export const initSongs = () => {
    return dispatch => {
   
        axios.get("http://localhost:5000/songs").then(res => {
            
            // dispatch(setCustom(res.data.songs,res.data.recommended));
            dispatch(setSongs(res.data.songs));

        }).catch(err => {
            console.log(err);
        })
    }
}

export const initPlaylists = () => {
    return dispatch => {
        axios.get("http://127.0.0.1:5000/playlist").then(res => {
            // dispatch(setPlaylists(res.data.data.recommended));
            dispatch(setPlaylists(res.data.data.recommended,res.data.data.trending))
        }).catch(err => {
            console.log(err);
        })
    }
}
