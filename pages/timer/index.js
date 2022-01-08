import Layout from "../../components/layout"

function TimerPage(){
    return <Layout>
        <div style={{color:"#000"}}>
            Timer Page
        </div>
    </Layout>
}

export async function getStaticProps(context) {
    return {
      props: {}, // will be passed to the page component as props
    }
  }
export default TimerPage