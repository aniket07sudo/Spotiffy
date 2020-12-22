import * as actionTypes from '../actions/actions';
const initialState = {
    songs:null,
    queue:null,
    repeat:false,
    activePlaylist:null,
    playlists:null,
    trendingPlaylists:null,
    activeSongid:Number,
    activeSongtrack:null,
    activeSongCover:null,
    activeSongName:null,
    activeSongMovie:null,
    activeSongAuthor:null,
    isPlaying:false,
    currentTime:null,
    duration:null,
    loading:false,
    currentPlaylist:null
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
        case actionTypes.SET_CUSTOM:
            return {
                ...state,
                recommended:action.recommended,
                songs:action.songs
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
        case actionTypes.ADD_QUEUE:
            return {
                ...state,
                queue:action.queueSongs
            }
        case actionTypes.SET_PLAYLISTS:
            return {
                ...state,
                playlists:action.playlistSong,
                trendingPlaylists:action.trending
            }
        case actionTypes.SET_ACTIVE_PLAYLIST:
            return {
                ...state,
                activePlaylist:action.songid
            }
        case actionTypes.SET_REPEAT_ON:
            return {
                ...state,
                repeat:!state.repeat
            }
        case actionTypes.SET_CURRENT_PLAYLIST:
            return {
                ...state,
                currentPlaylist:action.data.songs,
                loading:!initialState.loading
            }
        case actionTypes.LOAD:
            return {
                ...state,
                loading:!initialState.loading
            }

        default: 
        return initialState
    }
}

export default reducer;