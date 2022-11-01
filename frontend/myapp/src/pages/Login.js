
const Login = () => {
    
    const connect = async () => {
        try{
            window.location.href = "http://localhost:3001/auth/google"
        }catch(err){
            console.log(err);
        }
    }

  return (
    <>
        <button onClick={connect}>Log In With Google</button>
    </>
  )
    
}

export default Login;