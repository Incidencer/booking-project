import { Link } from "react-router-dom"

const Footer = () => {
  return (
    <div className="bg-gradient-to-r from-cyan-900 via-cyan-900 to-sky-900 py-10">
        <div className="container mx-auto flex justify-between items-center">
            <span className="text-3xl text-white font-bold tracking-tight opacity-85 hover:opacity-100 hover:text-3.5xl transition-transform transform hover:scale-110">
              <Link to ='/'>BookingHotels89.com</Link>
            </span>
            <span className="text-white font-bold tracking-tight flex gap-4">
                <p className="cursor-pointer opacity-85 hover:opacity-100 hover:text-lg transition-transform transform hover:scale-110 ">Privacy Policy</p>
                <p className="cursor-pointer opacity-85 hover:opacity-100 hover:text-lg transition-transform transform hover:scale-110" >Terms of service</p>
                <p className="cursor-pointer opacity-85 hover:opacity-100 hover:text-lg transition-transform transform hover:scale-110" >About us</p>
            </span>
        </div>
    </div>
  )
}

export default Footer