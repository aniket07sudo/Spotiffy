import React , { useRef} from 'react';
import {connect} from 'react-redux';
import {setCurrentTime} from '../store/actions/track';

function Player(props) {
    const volumeRef = useRef(null);
    const dragHandler = (e) =>{ 
        props.audref.current.currentTime = e.target.value;
        props.setTime(e.target.value);
    }

    const volumeHandler = (e) => {
        
        props.audref.current.volume =e.target.value / 10 ;
        
    }
    return (
        <>
            {props.player ?  <input type="range" min={0} max={props.duration ? props.duration : ''} value={props.current ? props.current : ''} onChange={dragHandler}/> :
            <input type="range" ref={volumeRef} defaultValue={10} onChange={volumeHandler} min={0} max={10}/>
            }
   </>
    )
}

const mapStateToProps = state => {
    return {
        current:state.tracks.currentTime
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setTime:(time) => dispatch(setCurrentTime(time))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Player);