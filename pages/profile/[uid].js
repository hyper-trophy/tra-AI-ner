import Layout from "../../components/layout"
import { useRouter } from 'next/router'
function ProfilePage(){
    
    const router = useRouter()
    const { pid } = router.query
  
    return <Layout>
        <div style={{color:"#000"}}>
            Profile Page - {pid}
        </div>
    </Layout>
}
export default ProfilePage;