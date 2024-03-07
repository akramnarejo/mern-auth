import { useSelector } from 'react-redux'

const Home = () => {
  const userInfo = useSelector(state => state.user.userInfo);
  return (
    <div>
      <h1>Home Page</h1>
      <p>User Info</p>
      <p>Username: {userInfo?.username}</p>
      <p>Email: {userInfo?.email}</p>
    </div>
  )
}

export default Home