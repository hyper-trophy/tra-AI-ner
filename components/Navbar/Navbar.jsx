import {useContext, useState, useEffect} from "react";

import Link from "next/link";
import MusicPlayer from "../MusicPlayer/MusicPlayer";
import styles from "./../../styles/Navbar.module.scss";
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import SelfImprovementIcon from '@mui/icons-material/SelfImprovement';
import TimerOutlinedIcon from '@mui/icons-material/TimerOutlined';
import MusicNoteOutlinedIcon from '@mui/icons-material/MusicNoteOutlined';
import NoteAltOutlinedIcon from '@mui/icons-material/NoteAltOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import AppContext from "../../contexts/contexts";

const Navbar = ()=>{

    let contextValue = useContext(AppContext);
    console.log(contextValue)

    let [navbarState, setNavbarState] = useState({isLoggedIn:contextValue.appState.isLoggedIn})


    // Added this for subscribing for contextUpdate on Global AppState
    useEffect(() => {
        console.log("App State")
        setNavbarState({isLoggedIn: contextValue.appState.isLoggedIn})
    }, [contextValue.appState])



    return <div className={styles["navbar-container"]}>
        <div className={styles["navbar-brand"]}>
            <Link href="/">workout</Link>
        </div>
        <div className={styles["navbar-music-player"]}>
            {/* <MusicPlayer /> */}
        </div>
        <div className={styles["navbar-actions"]}>
            <ul>
                <li>
                    <Link href="/gym">gym</Link>
                </li>
                <li>
                    <Link href="/yoga">yoga</Link>
                </li>
                <li>
                    <Link href="/timer">timer</Link>
                </li>
                <li><Link href="/music">music</Link></li>
                <li><Link href="/notepad">notepad</Link></li>
                <li> {contextValue.appState.isLoggedIn == true ? <Link href="/profile">{contextValue.appState.userState.email.split("@")[0]}</Link> : <Link href="/login">Log In</Link> }  </li>
                {contextValue.appState.isLoggedIn == true ? <li onClick={()=>{
                    contextValue.appState.userLogout()
                }}>Logout</li> : "" }
                
                {/* <li><Link href="/settings"><SettingsOutlinedIcon /></Link></li> */}
            </ul>
        </div>
    </div>
}
export default Navbar;