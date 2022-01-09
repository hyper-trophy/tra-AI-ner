
function ProfilePage(){
    return <div>Wrong Page - please make request to /profile/uid </div>
}
export async function getServerSideProps(context) {
      return {
        redirect: {
          permanent: false,
          destination: "/"
        }
      }
  }
export default ProfilePage;