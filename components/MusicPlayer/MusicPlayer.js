import React from "react"
import styles from "./../../styles/MusicPlayer.module.scss";


import PlayCircleFilledWhiteOutlinedIcon from '@mui/icons-material/PlayCircleFilledWhiteOutlined';
import PauseCircleOutlineOutlinedIcon from '@mui/icons-material/PauseCircleOutlineOutlined';
import SkipNextOutlinedIcon from '@mui/icons-material/SkipNextOutlined';
import SkipPreviousOutlinedIcon from '@mui/icons-material/SkipPreviousOutlined';
// const ComfortFit = require("")
// const audioTune = new Audio('./../../public/lib/comfort_fit.mp3');
class MusicPlayer extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            status:true
        }
    }
    render(){
        return (<div className={styles["player-container"]}>
            <div className={styles["player-main-container"]}>
                <div className={styles["player-title"]}>

                    <marquee>Circular Box Shadow CSS</marquee>
                </div>                
                <audio src={"https://files.freemusicarchive.org/storage-freemusicarchive-org/music/Creative_Commons/Comfort_Fit/Forget_And_Remember/Comfort_Fit_-_03_-_Sorry.mp3?download=1&name=Comfort%20Fit%20-%20Sorry.mp3"} controls />
{/* 
                <div className={styles["player-actions"]}>
                    <div className={styles["player-actions-previous"]}> <SkipPreviousOutlinedIcon /> </div>
                    <div className={styles["player-actions-pause-play"]} onClick={()=>{
                        this.setState(prev=>{
                            return {status:!prev.status}
                        })
                    }}> 
                        {this.state.status === true ? <PlayCircleFilledWhiteOutlinedIcon /> : <PauseCircleOutlineOutlinedIcon />}
                    </div>
                    <div className={styles["player-actions-previous"]}> <SkipNextOutlinedIcon /> </div>
                </div> */}
            </div>
        </div>);
    }
}
export default MusicPlayer