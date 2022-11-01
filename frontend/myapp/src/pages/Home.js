import { useState, useEffect } from 'react';
import { useSearchParams, useLocation } from 'react-router-dom';

export default function Home() {
    const [token, setToken] = useState(null);
    const [secret, setSecret] = useState(""); 
    const location = useLocation();
    console.log(location);

    useEffect(() => {
        const setTokenFromUrl = async () => {
            const tokenValue = location.search.split("=")[1];
            //console.log(tokenValue);
            setToken(tokenValue);
            localStorage.setItem("token", tokenValue);
        }
        setTokenFromUrl();
    }, [location.search]);

    useEffect(() => {
        const getSecret = async () => {
            try{
                if(token){
                    const token = localStorage.getItem('token');
                    const res = await fetch('http://localhost:3001/secret', {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `${localStorage.getItem('token')}`
                        }
                    });
                    const data = await res.json();
                    setSecret(data.msg);
                }
            }catch(err){
                console.log(err);
            }
        }
        getSecret();
    }, [token]);

    return (
        <div>
            <h1>Secret Message</h1>
            {secret ? <p>The super secret message is: { secret } </p> : <p>Log in to see the secret message</p>}
        </div>
    );
}




