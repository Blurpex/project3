import { useState } from "react"

const Login = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [authenticate, setAuthenticate] = useState(null)

    const handleLogin = async (e) => {
        e.preventDefault()
    }

    return(
        <form onSubmit={handleLogin}>
            <label>username
                <input 
                    type="text" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    required
                />
            </label>
            <label>password
                <input 
                    type="password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    required
                />
            </label>
            { authenticate !== null && <p>{authenticate ? "Login successful!" : "Login unsucessful!"}</p> }
            <button type="submit">Login</button>
        </form>
    )
}

export default Login
