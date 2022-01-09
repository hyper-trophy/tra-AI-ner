import Layout from "../../components/layout"
import { useRouter } from 'next/router'
import firebaseAdmin from "./../../firebase-admin/firebase-admin.main";
import styles from "./../../styles/ProfileUID.module.scss";

import CalendarHeatmap from 'react-calendar-heatmap';
import 'react-calendar-heatmap/dist/styles.css';



function ProfilePage(props){
    
    const router = useRouter()
    const { uid } = router.query
    console.log(props)
    if(!props.userFoundStatus) return <div>User not found</div>
    
    return <Layout>
        <div style={{color:"#000"}} className={styles["profileContainer"]}>
        <div class={styles["card"]} >
        <div class={styles["img"]} >
        <img src={"https://avatars.githubusercontent.com/u/48829314?v=4"} />
        </div>
        <div class={styles["infos"]} >
        <div class={styles["name"]} >
            <h2>{props.userData.displayName}</h2>
            <h4>@{props.userData.email.split("@")[0]}</h4>
        </div>
        <p class={styles["text"]} >
        Your body can stand almost anything. It’s your mind that you have to convince.
        </p>
        <ul class={styles["stats"]} >
            <li>
            <h3>15</h3>
            <h4>Views</h4>
            </li>
            <li>
            <h3>3</h3>
            <h4>Followers</h4>
            </li>
        </ul>
        <div class={styles["links"]} >
            <button class={styles["follow"]} >Follow</button>
            {/* <button class={styles["view"]} >View profile</button> */}
        </div>
        </div>
    </div>

    <div style={{maxWidth: "480px", textAlign: "center", margin: "0 auto"}}>
        
        <CalendarHeatmap
                startDate={new Date('2016-01-01')}
                endDate={new Date('2016-06-01')}
                values={[
                    { date: '2016-01-01', count: 12 },
                    { date: '2016-01-22', count: 122 },
                    { date: '2016-01-30', count: 38 },
                    // ...and so on
                ]}
                
                />
        </div>
    
        </div>
    </Layout>
}

export async function getServerSideProps(context) {
    console.log(firebaseAdmin)
    var db = firebaseAdmin.firestore();
    console.log(db+" => DB")
    var doc = await db.collection("users").doc(context.params.uid).get();
    // console.log(doc)
    if (!doc.exists) {
        return {
            props: {
                userFoundStatus:false,
                userData:{}
            }, // will be passed to the page component as props
          }
      } else {
        console.log('Document data:', doc.data());
        return {
            props: {
                userFoundStatus:true,
                userData:doc.data()
            }, // will be passed to the page component as props
          }
      }
    // ref.once("value", function(snapshot) {
    // console.log(snapshot.val());
    // });
    // console.log(context.params.uid)
    // const res = await fetch(`https://...`)
    // const data = null
  
    // if (!data) {
    //   return {
    //     notFound: true,
    //   }
    // }
  
    
  }


export default ProfilePage;