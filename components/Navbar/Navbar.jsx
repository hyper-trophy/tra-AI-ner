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

const Navbar = ()=>{
    return <div className={styles["navbar-container"]}>
        <div className={styles["navbar-brand"]}>
            <Link href="/">workout</Link>
        </div>
        <div className={styles["navbar-music-player"]}>
            <MusicPlayer />
        </div>
        <div className={styles["navbar-actions"]}>
            <ul>
                <li>
                    <Link href="/gym"><FitnessCenterIcon /></Link>
                </li>
                <li>
                    <Link href="/yoga"><SelfImprovementIcon /></Link>
                </li>
                <li>
                    <Link href="/timer"><TimerOutlinedIcon /></Link>
                </li>
                <li><Link href="/music"><MusicNoteOutlinedIcon /></Link></li>
                <li><Link href="/notepad"><NoteAltOutlinedIcon /></Link></li>
                <li><Link href="/profile"><AccountCircleOutlinedIcon /></Link></li>
                <li><Link href="/settings"><SettingsOutlinedIcon /></Link></li>
            </ul>
        </div>
    </div>
}
export default Navbar;