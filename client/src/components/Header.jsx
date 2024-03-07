import {Link} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import { logout } from '../../redux/slices/user'
const Header = () => {
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn)
    const dispatch = useDispatch()
    return (
        <div className='bg-slate-200'>
          <div className='flex justify-between items-center max-w-6xl mx-auto p-3'>
            <Link to='/'>
              <h1 className='font-bold'>Auth App</h1>
            </Link>
            <ul className='flex gap-4'>
              <Link to='/'>
                <li>Home</li>
              </Link>
              <Link to='/about'>
                <li>About</li>
              </Link>
              {
                isLoggedIn ? (<Link to='/sign-in'>
                <li onClick={() => dispatch(logout())}>Log out</li>
              </Link>) : (<Link to='/sign-in'>
                <li>Sign In</li>
              </Link>)
              }
            </ul>
          </div>
        </div>
      );
}

export default Header