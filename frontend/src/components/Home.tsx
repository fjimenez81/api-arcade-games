import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { IGame } from "../interfaces"

const URL_GAME = "http://localhost:5000/api/games/"

export default function Home() {

    const [ listGames, setListGames ] = useState<IGame[]>([])

    useEffect(() => {
        fetch(`${URL_GAME}publish-games`, {
			credentials: 'include',
		}).then(res => res.json()).then(res => {
			setListGames(res.games)
            
		})
    },[])

    return  <div className="w-full flex justify-center">
                <div className="grid grid-cols-3 gap-3 w-[80%]">
                    {
                        listGames.length > 0 && listGames.map(game => (
                            <Link to={`add-game/${game.id}`} key={game.id}>
                                <ul  className="p-4 text-white bg-black/70 rounded-lg">
                                    <li><h2 className="text-[24px]">{game.title}</h2></li>
                                    <li><span className="text-[14px]">{game.content}</span></li>
                                    <li>Year: {game.year}</li>
                                    <li>Manufacturer: {game.manufacturer}</li>
                                </ul>
                            </Link>
                            
                        ))
                    }
                </div>
                
            </div>
}