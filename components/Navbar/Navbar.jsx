import Link from "next/link";
import styles from "./../../styles/Navbar.module.scss"
const Navbar = ()=>{
    return <div className={styles["navbar-container"]}>
        <div className={styles["navbar-brand"]}>
            <Link href="/">workout</Link>
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
                <li><Link href="/profile">profile</Link></li>
            </ul>
        </div>
    </div>
}
export default Navbar;