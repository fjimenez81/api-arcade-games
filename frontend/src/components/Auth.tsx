import { useState } from "react"
import LoginForm from "./LoginForm"
import SignUpForm from "./SignUpForm"

export default function Auth(props: any) {

	const { setIsLogin } = props
	const rexemail = /^[A-Za-z0-9_!#$%&'*+\/=?`{|}~^.-]+@[A-Za-z0-9.-]+$/gm
	const [firstView, setFirstView] = useState<boolean>(false)

	return  <>
				{
					!firstView ? 
					<LoginForm setFirstView={setFirstView} setIsLogin={setIsLogin} rexemail={rexemail}/>
					: <SignUpForm setFirstView={setFirstView} setIsLogin={setIsLogin} rexemail={rexemail}/>
				}
			</>
}