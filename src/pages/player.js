import React , { useRef} from 'react';
import {connect} from 'react-redux';
import {setCurrentTime} from '../store/actions/track';

function Player(props) {

    const dragHandler = (e) =>{ 
        props.audref.current.currentTime = e.target.value;
        props.setTime(e.target.value);
    }

    const volumeHandler = (e) => {
        console.log(e.target.value);
        props.audref.current.volume = e.target.value / 10 ;
      
    }
    
    return (
        <>
       
            {props.player ?  <input type="range" defaultValue={0} min={0} max={props.duration} value={props.current} onChange={dragHandler}/> :
            <input defaultValue={0} type="range"  onChange={volumeHandler} min={0.0} max={10.0}/>
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