import { useState } from "react";

export default function LoginForm(props: any) {

	const { setIsLogin, setFirstView } = props

	const [data, setData] = useState({
		email: "",
		password: ""
	})

	const handleEmail = (e: React.FormEvent<HTMLInputElement>) => {
		console.log(typeof e.currentTarget.value);

		setData({ ...data, email: e.currentTarget.value })
	}

	const handlePassword = (e: React.FormEvent<HTMLInputElement>) => {
		setData({ ...data, password: e.currentTarget.value })
	}

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		fetch("http://localhost:5000/api/user/login", {
			method: "POST",
			body: JSON.stringify(data),
			credentials: 'include',
			headers: {
				'Content-Type': 'application/json;charset=utf-8'
			},
		}).then(res => res.json()).then(msg => {
			if (msg.message !== "UNAUTHORIZED") {
				setIsLogin(true)
			}
		})

	}

	const changeInit = () => {
		setFirstView(true)
	}

    return <div className=''>
				<div className="w-full flex justify-center">
					<h2 className="text-black text-[40px]">Sign in</h2>
				</div>
				<form className='flex flex-col w-full text-black border-2 border-black/40 p-16 rounded-lg' onSubmit={handleSubmit}>
					<label htmlFor="email" className='mb-2'>
						Email
					</label>
					<input type="text" name='email' onChange={handleEmail} className='mb-4 text-black border-2 border-black/40 p-1' />
					<label htmlFor="password" className='mb-2'>
						Password
					</label>
					<input type="text" name='password' onChange={handlePassword} className='mb-4 text-black border-2 border-black/40 p-1' />
					<input type="submit" value="Sign in" className='px-18 py-4 text-black border-2 border-black/40 rounded-full active:bg-black/40 active:text-white' />
				</form>
				<div className="w-full flex justify-center">
					<button className="bg-white" onClick={changeInit}>Sign up</button>
				</div>
    		</div>
}