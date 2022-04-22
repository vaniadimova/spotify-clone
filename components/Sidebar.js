import { useEffect, useState } from "react";
import { HomeIcon,SearchIcon,LibraryIcon, PlusCircleIcon,HeartIcon, RssIcon} from "@heroicons/react/outline";
import {  useSession } from "next-auth/react";
import { useRecoilState } from "recoil";
import {playlistIdState} from '../atoms/playlistAtom'
import useSpotify from "../hooks/useSpotify";

function Sidebar() {
    const spotifyApi = useSpotify();
    const { data: session, status } = useSession();
    const [playlists, setPlaylists] = useState([]);
    const [playlistId, setPlaylistId] = useRecoilState(playlistIdState);
    
useEffect(() => {
    if (spotifyApi.getAccessToken()) {
        spotifyApi.getUserPlaylists().then((data )=> {
            setPlaylists(data.body.items);
        });
    }
    }, [session, spotifyApi]);

 return (
<div className="h-screen p-5 overflow-scroll text-sm text-gray-500 border border-r border-gray-900 scrollbar-hide lg:text-sm-r sm:max-w-[12rem ] lr:max-w-[15rem] hidden md:inline-flex">
<div className="space-y-4">

<button  className="flex items-center space-x-2 hover:text-white"><HomeIcon className="w-5 h-5"/><p>Home</p></button>
<button className="flex items-center space-x-2 hover:text-white"><SearchIcon className="w-5 h-5" /><p>Search</p></button>
<button className="flex items-center space-x-2 hover:text-white"><LibraryIcon className="w-5 h-5" /><p>Your Library</p></button>
<hr className="border-t-[0.1px] border-gray-900" />
      
<button  className="flex items-center space-x-2 hover:text-white"><PlusCircleIcon className="w-5 h-5"/><p>Create Playlist</p></button>
<button className="flex items-center space-x-2 hover:text-white"><HeartIcon className="w-5 h-5" /><p>Liked Songs</p></button>
<button className="flex items-center space-x-2 hover:text-white"><RssIcon className="w-5 h-5" /><p>Your Episodes</p></button>

<hr className="border-t-[0.1px] border-gray-900" />

{/*Playlists*/}

{playlists.map((playlist) => (
    <p 
    key={playlist.id} 
    onClick={() => setPlaylistId(playlist.id)}
    className="cursor-pointer hover:text-white"> 
    {playlist.name}
    </p>   
))}
    </div>
</div>
);
}

export default Sidebar


