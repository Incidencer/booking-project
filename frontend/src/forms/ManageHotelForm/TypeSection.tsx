import { useFormContext } from "react-hook-form";
import { hotelTypes } from "../../config/hotel-options-config";
import { HotelFormData } from "./ManagedHotelForm";


const TypeSection = () => {
    const { register, watch, formState: { errors } } = useFormContext<HotelFormData>();
    const typeWatch = watch('type')

    return (
        <div>
            <h2 className="text-2-xl font-bold mb-3">Select Type</h2>
            <div className="grid grid-cols-5 gap-2">
                {hotelTypes.map((type)=>(
                    <label className={
                        typeWatch === type ? 'cursor-pointer bg-gradient-to-bl from-cyan-300 via-sky-300 to-sky-300 text-sm rounded-full px-4 py-2' : 'cursor-pointer bg-gray-300 text-sm rounded-full px-4 py-2'
                    }>
                        <input type="radio" className="hidden" value={type} {...register('type', {required: 'This field is required'})}/>
                        <span>
                            {type}
                        </span>
                    </label>
                ))}
            </div>
            {errors.type && (
                <span className='text-red-500'>{errors.type.message}</span>
            )}
        </div>
    )
}

export default TypeSection