
import {useEffect, useState} from 'react'
import SearchBar from './SearchBar'






import React from 'react'

export default function Spotify() {
  
    const [token, setToken] = useState("")

    useEffect(() => {
        const hash = window.location.hash
        let token = window.localStorage.getItem("token")

        if(!token && hash) {
            token = hash.substring(1).split("&").find(elem => elem.startsWith("access_token")).split("=")[1]
            window.localStorage.setItem("token", token)
            setToken(token)
        }

        console.log(token)
    }, [])

    return (

        <div>

        </div>
    )


}



export const spotifyCredentials = {
    CLIENT_ID: process.env.REACT_APP_CLIENT_ID,
    REDIRECT_URI: "http://localhost:3000",
    AUTH_ENDPOINT: "https://accounts.spotify.com/authorize",
    RESPONSE_TYPE: "token"
}



export function handleLogin() {
    window.location.href = `${spotifyCredentials.AUTH_ENDPOINT}?client_id=${spotifyCredentials.CLIENT_ID}&redirect_uri=${spotifyCredentials.REDIRECT_URI}&response_type=${spotifyCredentials.RESPONSE_TYPE}`
  
}
