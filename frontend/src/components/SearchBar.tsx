import { FormEvent, useState } from "react"
import { useSearchContext } from "../context/SearchContext"
import { MdTravelExplore } from "react-icons/md"
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css';
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
    const navigate = useNavigate();
    const search = useSearchContext()

    const [destination, setDestination] = useState<string>(search.destination);
    const [checkIn, setCheckIn] = useState<Date>(search.checkIn);
    const [checkOut, setCheckOut] = useState<Date>(search.checkOut);
    const [adultCount, setAdultCount] = useState<number>(search.adultCount);
    const [childCount, setChildCount] = useState<number>(search.childCount);

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();
        search.saveSearchValues(
          destination,
          checkIn,
          checkOut,
          adultCount,
          childCount
        );
        navigate("/search");
      };
    const minDate = new Date()
    const maxDate = new Date()
    maxDate.setFullYear(maxDate.getFullYear() + 1)
    return (
        <form 
        onSubmit={handleSubmit} 
        className="-mt-8 p-3 bg-gradient-to-r from-yellow-500 via-yellow-500 to-yellow-600 rounded shadow-md grid grid-cols-2 lg:grid-cols-3 2xl:grid-cols-5 items-center gap-4">
            <div className="flex flex-row items-center flex-1 bg-white p-2">
            <MdTravelExplore size={20} className="mr-2" />
            <input 
            placeholder="Where are you going?" 
            className="text-md w-full focus:outline-none" 
            value={destination} 
            onChange={(event) => setDestination(event.target.value)}/>
            </div>

            <div className="flex bg-white px-2 py-1 gap-2">
                <label className="items-center flex">
                    Adults:
                    <input className="w-full p-1 focus:outline-none font-semibold" type='number'
                    min={1}
                    max={20}
                    value={adultCount}
                    onChange={(event) => setAdultCount(parseInt(event.target.value))} />
                </label>
                <label className="items-center flex">
                    Children:
                    <input className="w-full p-1 focus:outline-none font-semibold" type='number'
                    min={0}
                    max={20}
                    value={childCount}
                    onChange={(event) => setChildCount(parseInt(event.target.value))} />
                </label>
            </div>
            <div className="flex bg-white px-2 py-1 gap-2">
                <DatePicker 
                selected={checkIn} 
                onChange={(date)=> setCheckIn(date as Date)}
                selectsStart
                startDate={checkIn}
                endDate={checkOut}
                minDate={minDate}
                maxDate={maxDate}
                placeholderText="Check-in Date"
                className="min-w-full bg-white focus:outline-none"
                wrapperClassName="min-w-full"/>
            </div>
            <div className="flex bg-white px-2 py-1 gap-2">
                <DatePicker 
                selected={checkOut} 
                onChange={(date)=> setCheckOut(date as Date)}
                selectsStart
                startDate={checkIn}
                endDate={checkOut}
                minDate={minDate}
                maxDate={maxDate}
                placeholderText="Check-in Date"
                className="min-w-full bg-white focus:outline-none"
                wrapperClassName="min-w-full"/>
            </div>
            <div className="flex gap-1">
                <button className="w-2/3 bg-blue-600 text-white h-full p-2 text-xl opacity-90 hover:bg-blue-800 hover:text-base transition-transform transform hover:scale-90">
                    Search
                </button>
                <button className="w-2/3 bg-red-600 text-white h-full p-2 text-xl opacity-90 hover:bg-red-800 hover:text-base transition-transform transform hover:scale-90">
                    Clear
                </button>
            </div>
        </form>
    )
}

export default SearchBar