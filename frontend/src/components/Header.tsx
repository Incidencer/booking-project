import { Link } from 'react-router-dom'
import { useAppContext } from '../context/AppContext'
import SignOutButton from './SignOutButton'

const Header = () => {

  const {isLoggedIn} = useAppContext()

  return (
    <div className="bg-gradient-to-r from-cyan-900 via-cyan-900 to-sky-900 py-6">
        <div className="container mx-auto flex justify-between">
            <span className="text-3xl text-white font-bold tracking-tight opacity-90 hover:text-3.5xl transition-transform transform hover:scale-110">
                <Link to='/'>BookingHotels89.com</Link>
            </span>
            <span className='flex space-x-2'>
            {isLoggedIn ? <>
            <Link to='/my-bookings' className='flex items-center text-white px-3 font-bold hover:bg-blue-600 bg-gradient-to-bl from-emerald-300 via-pink-100 to-teal-100 text-transparent bg-clip-text opacity-90 hover:text-lg transition-transform transform hover:scale-110'>My bookings</Link>
            <Link to='/my-hotels' className='flex items-center text-white px-3 font-bold hover:bg-blue-600 bg-gradient-to-bl from-emerald-300 via-pink-100 to-teal-100 text-transparent bg-clip-text opacity-90 hover:text-lg transition-transform transform hover:scale-110'>My hotels</Link>
            <SignOutButton/>
            </> : <Link to='/sign-in' className='flex items-center bg-white text-blue-600 px-3 font-bold hover:bg-gray-100 hover:text-green-500 opacity-90 hover:text-lg transition-transform transform hover:scale-110'>Sign in</Link>
                } 
            </span>
        </div>
    </div>
  )
}

export default Header