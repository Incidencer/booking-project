import { useForm } from "react-hook-form"
import { useMutation, useQueryClient } from "react-query";
import * as apiClient from '../api-client'
import { useAppContext } from "../context/AppContext";
import { Link, useNavigate } from "react-router-dom";


export type SignInFormData = {
    email: string;
    password: string;
}

const SignIn = () => {
    const { showToast } = useAppContext();
    const navigate = useNavigate()
    const { register, formState: { errors }, handleSubmit } = useForm<SignInFormData>()
    const queryClient = useQueryClient()

    const mutation = useMutation(apiClient.signIn, {
        onSuccess: async () => {
            showToast({message: 'Sign-in Successful', type: 'SUCCESS'})
            await queryClient.invalidateQueries('validateToken')
            navigate('/')
        }, onError: (error: Error) => {
            showToast({message: error.message, type: 'ERROR'})
        }
    });

    const onSumbit = handleSubmit((data)=>{
        mutation.mutate(data)
    })
  return (
    <form className="flex flex-col gap-5" onSubmit={onSumbit}>
        <h2 className="text-3xl font-bold">Sign in</h2>
        <label className="text-gray-700 text-sm font-bold flex-1">
            Email
            <input className="border rounded w-full py-1 px-2 font-normal"{...register('email', {required: 'This field is required'})}></input>
            {errors.email && (
              <span className="text-red-500">{errors.email.message}</span>
            )}
          </label>
        <label className="text-gray-700 text-sm font-bold flex-1">
            Password
            <input type="password" className="border rounded w-full py-1 px-2 font-normal"{...register('password', {required: 'This field is required', minLength: {
              value: 6,
              message: 'Password minimal 6 symbols'
            }})}></input>
            {errors.password && (
              <span className="text-red-500">{errors.password.message}</span>
            )}
          </label>
          <span className="flex items-center justify-between">
          <span className="text-sm"> You don't have an account? <Link className="underline hover:text-red-500" to='/register'>Create account an here</Link>
          </span>
            <button type='submit'
             className="bg-blue-600 text-white p-2 font-bold hover:bg-blue-500 text-xl">Log in</button>
          </span>
    </form>
  )
}

export default SignIn