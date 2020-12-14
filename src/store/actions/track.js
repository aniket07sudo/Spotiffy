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



export const isPlaying = (dec) => {
    return {
        type:actionTypes.IS_PLAYING,
        dec:dec
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

export const pauseExplicit = () => {
    return {
        type:actionTypes.PAUSE_SONG
    }
}

export const playExplicit = () => {
    return {
        type:actionTypes.PLAY_SONG
    }
}

export const initSongs = () => {
    return dispatch => {
        axios.get("http://localhost:5000/songs").then(res => {
            dispatch(setSongs(res.data.songs))
        }).catch(err => {
            console.log(err);
        })
    }
}