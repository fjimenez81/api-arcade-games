import { useState } from "react"
import LoginForm from "./LoginForm"
import SignUpForm from "./SignUpForm"

export default function Auth(props: any) {

	const { setIsLogin } = props
	const [firstView, setFirstView] = useState<boolean>(false)

	return <>
				{
						!firstView ? 
						<LoginForm setFirstView={setFirstView} setIsLogin={setIsLogin}/>
						: <SignUpForm setFirstView={setFirstView} setIsLogin={setIsLogin}/>
				}
			</>
}