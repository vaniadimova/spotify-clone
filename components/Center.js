import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { shuffle } from "lodash";
import { ChevronDownIcon } from "@heroicons/react/outline";
import { useRecoilState, useRecoilValue } from "recoil";
import { playlistIdState, playlistState} from "../atoms/playlistAtom";
import  useSpotify  from "../hooks/useSpotify";
import {  signOut } from "next-auth/react";
import Songs from "./Songs";


const colors = [ 
    "from-indigo-500",
    "from-purple-500",
    "from-pink-500",
    "from-red-500",
    "from-orange-500",
    "from-yellow-500",
    "from-green-500",
    "from-blue-500",
    "from-teal-500",
    "from-gray-500",
]

function Center() {
    const { data: session} = useSession();
    const spotifyApi = useSpotify();
    const [color, setColor] = useState(null);
    const playlistId = useRecoilValue(playlistIdState);
    const [playlist, setPlaylist] = useRecoilState(playlistState);
  

useEffect(() => {
    setColor(shuffle(colors).pop());
}, [playlistId]);

useEffect(() =>{
    spotifyApi
    .getPlaylist(playlistId)
    .then((data) => {
        setPlaylist(data.body);
    })
    .catch((err )=> console.log('Someting went wrong',err));
}, [spotifyApi, playlistId]);
console.log(playlist);

    return (
        <div className="flex-grow h-screen overflow-y-scroll scrollbar-hide">
          <header className="absolute top-5 right-8">
                <div  className="flex items-center p-1 pr-2 space-x-3 text-white bg-black rounded-full cursor-pointer opacity-90 hover:opacity-80"
                onClick={signOut}
                >
                    <img className="w-10 h-10 rounded-full " 
                    src={session?.user.image} 
                    alt="user"
                    />
                    <h2>{session?.user.name}</h2>
                    <ChevronDownIcon className="w-5 h-5" />
                </div>
            </header>
            
            <section 
            className={`flex items-end space-x-7 bg-gradient-to-b to-black  ${color} h-80 p-8 text-white `}>
               <img 
               className="shadow-2xl w-44 h-44"
                src={playlist?.images?.[0]?.url} 
                alt="playlist"  />
               <div>
                   <p>PLAYLIST NAME</p>
                   <h1 className="text-2xl font-bold md:text-3xl xl:text-5xl">
                       {playlist?.name}
                       </h1>
                       </div>
             </section>
             
            <div className="text-white">
                <p>Tracks</p>
                <Songs />
            </div>
        </div>
    );
}

export default Center;


