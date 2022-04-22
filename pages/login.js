import React from 'react';
import { getProviders, signIn } from "next-auth/react";


 function Login({providers}) {
    return (
        <div className="flex flex-col items-center justify-center w-full min-h-screen bg-black">
          <img  className="mb-5 w-52" src="https://www.freepnglogos.com/uploads/spotify-logo-png/spotify-icon-marilyn-scott-0.png" alt="Spotify Logo" />
          
{Object.values(providers).map((provider) => (
              <div key={provider.name}>
 <button className="bg-[#18D860] text-black p-5 rounded-full"
            onClick={() => signIn(provider.id, { callbackUrl: "/" })}
 >
     Login with {provider.name}
     </button>
    </div>
           
          ))}
</div>
    );
};

export default Login;

export async function getServerSideProps() {
    const providers = await getProviders();
    return {
        props: {
            providers,
        },
    };
}