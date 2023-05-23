import { useState } from "react";
import { useNavigate } from "react-router-dom";


export default function LoginForm(props: any) {

	const { setIsLogin, setFirstView, rexemail } = props
	const navigate = useNavigate();

	const [data, setData] = useState({
		email: "",
		password: ""
	})

	const [ placeEmail, setPlaceEmail ] = useState("")
	const [ placePass, setPlacePass ] = useState("")
	const [ showPass, setShowPass ] = useState("password")

	const handleEmail = (e: React.FormEvent<HTMLInputElement>) => {
		console.log(typeof e.currentTarget.value);

		setData({ ...data, email: e.currentTarget.value })
	}

	const handlePassword = (e: React.FormEvent<HTMLInputElement>) => {
		setData({ ...data, password: e.currentTarget.value })
	}

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		const check_email = rexemail.test(data.email)
		if (data.password.length > 7 && check_email) {
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
					navigate("/")
				}
			})
		} else {
			if (data.password.length < 8) {
				setData({...data, password: ""})
				setPlacePass("Must have more than 7 chararters")
				setTimeout(() => {
					setPlacePass("")
				}, 2000)
			}
			if (!check_email) {
				setData({...data, email: ""})
				setPlaceEmail("Type a valid email")
				setTimeout(() => {
					setPlaceEmail("")
				}, 2000)
				
			}
			
		}

	}

	const changeInit = () => {
		setFirstView(true)
	}

	const handleShowPass = () => {
		if (showPass === "password") {
			setShowPass("text")
		} else {
			setShowPass("password")
		}
	}

    return  <div className=''>
				<div className="w-full flex justify-center">
					<h2 className="text-white text-[40px]">Sign in</h2>
				</div>
				<form className='flex flex-col w-full text-black p-16 rounded-lg bg-black/70' onSubmit={handleSubmit}>
					<label htmlFor="email" className='mb-2 text-white'>
						Email
					</label>
					<input type="text" name='email'
							value={data.email}
							onChange={handleEmail}
							className='mb-4 text-black p-1 placeholder:text-red-600 placeholder:text-[10px]'
							placeholder={placeEmail} />
						<label htmlFor="password" className='mb-2 flex justify-between items-center text-white'>
							Password
							<i onClick={handleShowPass} className="fa fa-eye cursor-pointer"></i>
						</label>
					<input type={showPass} name='password'
							value={data.password}
							onChange={handlePassword}
							className='mb-4 text-black p-1 placeholder:text-red-600 placeholder:text-[10px]'
							placeholder={placePass} />
					<input type="submit" value="Sign in"
							className='px-18 py-4 text-white border-2 border-white
									rounded-full active:bg-black/40 active:text-white
									bg-transparent' />
				</form>
				<div className="w-full flex justify-center">
					<button className="bg-transparent text-white" onClick={changeInit}>Sign up</button>
				</div>
    		</div>
}