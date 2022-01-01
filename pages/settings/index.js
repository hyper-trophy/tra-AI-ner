import Link from "next/link";
import Layout from "../../components/layout"
import styles from "./../../styles/Settings.module.scss";

function SettingsPage(){
    return <Layout>
        <div className={styles["settings-parent-container"]}>
            <div className={styles["settings-container"]}>
                <div className={styles["settings-groups"]}>
                    <div className={styles["settings-group-header"]}><Link href="/settings/">Accounts</Link></div>
                    <div className={styles["settings-group-header"]}><Link href="/settings/gym">gym</Link></div>
                    <div className={styles["settings-group-header"]}><Link href="/settings/yoga">yoga</Link></div>
                    <div className={styles["settings-group-header"]}><Link href="/settings/timer">timer</Link></div>
                    <div className={styles["settings-group-header"]}><Link href="/settings/music">music</Link></div>
                    <div className={styles["settings-group-header"]}><Link href="/settings/notepad">notepad</Link></div>
                </div>
                <div className={styles["settings-groups-content"]}>

                </div>
            </div>
        </div>
    </Layout>
}
export default SettingsPage