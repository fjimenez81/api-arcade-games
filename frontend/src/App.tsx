import React, { useEffect, useState,  } from 'react'
import './App.css'

import {
	Routes,
	Route,
	Link,
	useNavigate,
	useLocation,
	Navigate,
	Outlet,
  } from "react-router-dom";
import Home from './components/Home'
import Auth from './components/Auth'
import AddGame from './components/AddGame'

const URL_USER = "http://localhost:5000/api/user/"

function App() {
	const [firstView, setFirstView] = useState<boolean>(false)
	const [isLogin, setIsLogin] = useState<boolean>(false)

	useEffect(() => {
		fetch(`${URL_USER}loginstatus`, {
			credentials: 'include',
		}).then(res => res.json()).then(msg => {	
			if (msg.message !== "UNAUTHORIZED") {
				
			}
		})
	}, [])

	const handleLogOut = () => {
		fetch(`${URL_USER}logout`, {
			method: "POST",
			credentials: 'include',
		}).then(res => res.json()).then(msg => {
			if (msg.message === "LogOut!") {
				setIsLogin(false)
			}
		})
	}
	

	return (
		<>
			<header id="header" className='flex w-full py-8'>
				<nav className='absolute flex justify-end top-0 w-full p-8 border-b-black/40 border-b-2 text-white'>
					<h1 className='w-full text-white'>Arcade Games</h1>
					{
						!isLogin ?
						<ul className='flex w-full justify-end px-8'>
							<li className='mr-4 cursor-pointer'><Link to={"/"}>Home</Link></li>
							<li><Link to={"auth"}>Register</Link></li>
						</ul>
						:
						<ul className='flex w-full justify-end px-8'>
							<li className='mr-4 '><Link to={"/"} className="cursor-pointer">Home</Link></li>
							<li className='mr-4 '><Link to={"add-game"} className="cursor-pointer">Add game</Link></li>
							<li><Link onClick={handleLogOut} to={"/"} className="cursor-pointer">Log out</Link></li>
						</ul>
						
					}
				</nav>
			</header>
			<main id="main" className='flex w-full justify-center'>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="auth" element={<Auth setIsLogin={setIsLogin} />} />
				<Route path="add-game" element={<AddGame/>} />
				<Route path="add-game/:id" element={<AddGame/>} />
				

				{/* Using path="*"" means "match anything", so this route
						acts like a catch-all for URLs that we don't have explicit
						routes for. 
				<Route path="*" element={< />} />*/}
				
			</Routes>
			</main>
		</>
	)
}

export default App
