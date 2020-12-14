import * as actionTypes from '../actions/actions';
const initialState = {
    songs:null,
    activeSongid:null,
    activeSongtrack:null,
    activeSongCover:null,
    activeSongName:null,
    activeSongMovie:null,
    activeSongAuthor:null,
    isPlaying:false,
    currentTime:null,
    duration:null
}

const reducer = (state = initialState,action) => {
    switch(action.type) {
        case actionTypes.PLAY_SONG:
            return {
                ...state
            }
        case actionTypes.PAUSE_SONG:
            return {
                ...state
            }
        case actionTypes.SET_SONGS:
            return {
                ...state,
                songs:action.songs
            }
        case actionTypes.SET_CURRENT:
            return {
                ...state,
                activeSongid:action.currentSong,
                activeSongName:action.name,
                activeSongAuthor:action.author,
                activeSongMovie:action.movie,
                activeSongtrack:action.audio,
                activeSongCover:action.cover,
                isPlaying:true
            }
        case actionTypes.IS_PLAYING:
            return {
                ...state,
                isPlaying:action.dec
            }
        case actionTypes.SET_CURRENT_TIME:
            return {
                ...state,
                currentTime:action.time
            }
        case actionTypes.SET_DURATION:
            return {
                ...state,
                duration:action.duration
            }
        case actionTypes.PAUSE_SONG:
            return {
                ...state,
                isPlaying:false
            }
        case actionTypes.PLAY_SONG:
            return {
                ...state,
                isPlaying:true
            }
          
        default: 
        return initialState
    }
}

export default reducer;