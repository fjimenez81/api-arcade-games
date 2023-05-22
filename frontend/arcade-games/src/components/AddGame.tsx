import { useEffect, useState } from "react"
import { redirect, useParams } from "react-router-dom"

const URL_GAME = "http://localhost:5000/api/games/"

export default function AddGame() {

    const { id } = useParams()
    const [ btn, setBtn ] = useState("Add game")

    const [ data, setData ] = useState({
        title: "",
        content: "",
        year: "",
        region: "",
        manufacturer: "",
        front: "image_front",
        back: "image_back",
        publish: true
    })

    useEffect(() => {
        if (id) {
            setBtn("Update game")
            fetch(URL_GAME + `showgame/${id}`, {
                credentials: 'include',
            }).then(res => res.json()).then(msg => {
                setData(msg.game)
                
            })
        }
        
    }, [])

    const handleTitle = (e: React.FormEvent<HTMLInputElement>) => {
        setData({...data, title: e.currentTarget.value })
    }

    const handleContent = (e: React.FormEvent<HTMLTextAreaElement>) => {
        setData({...data, content: e.currentTarget.value })
    }

    const handleYear = (e: React.FormEvent<HTMLInputElement>) => {
        setData({...data, year: e.currentTarget.value })
    }

    const handleRegion = (e: React.FormEvent<HTMLInputElement>) => {
        setData({...data, region: e.currentTarget.value })
    }

    const handleManufacturer = (e: React.FormEvent<HTMLInputElement>) => {
        setData({...data, manufacturer: e.currentTarget.value })
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        const url = id ? `update/${id}` : "create"
        const method = id ? "PUT" : "POST"
        fetch(URL_GAME + url, {
			method: method,
			body: JSON.stringify(data),
			credentials: 'include',
			headers: {
				'Content-Type': 'application/json;charset=utf-8'
			},
		}).then(res => res.json()).then(msg => {
			console.log(msg);
            
		})
        

    }

    const removeGame = (e: React.FormEvent) => {
        e.preventDefault()
        const url = `removegame/${id}`
        fetch(URL_GAME + url, {
			method: "DELETE",
			credentials: 'include',
		}).then(res => res.json()).then(msg => {
			redirect("/")
            
		})
    }

    return  <>
                <form onSubmit={handleSubmit} className="w-[40%] mt-16">
                    <h1>{btn}</h1>
                    <div className="flex flex-col mb-4">
                        <label htmlFor="title">Title</label>
                        <input type="text" name="title" value={data.title}
                        className="border-2 border-black/40 p-2" onChange={handleTitle}/>
                    </div>
                    <div className="flex flex-col mb-4">
                        <label htmlFor="content">Content</label>
                        <textarea rows={10} name="content" value={data.content}
                        className="border-2 border-black/40 p-2" onChange={handleContent}/>
                    </div>
                    <div className="flex flex-col mb-4">
                        <label htmlFor="year">Year</label>
                        <input type="text" name="year" value={data.year}
                        className="border-2 border-black/40 p-2" onChange={handleYear}/>
                    </div>
                    <div className="flex flex-col mb-4">
                        <label htmlFor="region">Region</label>
                        <input type="text" name="region" value={data.region}
                        className="border-2 border-black/40 p-2" onChange={handleRegion}/>
                    </div>
                    <div className="flex flex-col mb-4">
                        <label htmlFor="manufacturer">Manufacturer</label>
                        <input type="text" name="manufacturer" value={data.manufacturer}
                        className="border-2 border-black/40 p-2" onChange={handleManufacturer}/>
                    </div>
                    <div className="flex w-full justify-center">
                        <input type="submit" value={btn}
                        className='w-[50%] px-18 py-4 text-black border-2 border-black/40 rounded-full active:bg-black/40 active:text-white' />
                    </div>
                    {
                        id &&
                        <div className="flex w-full justify-center">
                            <button onClick={removeGame}
                            className='w-[50%] px-18 py-4 bg-white text-black border-2 border-black/40 rounded-full active:bg-black/40 active:text-white mt-4'>Remove game</button>
                        </div>
                        
                    }
                </form>
            </>
}