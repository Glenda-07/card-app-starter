import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../services/api"

export default function Login() {
    const [ username, setUsername ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ busy, setBusy ] = useState(false);
    const [ error, setError ] = useState('');
    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();
        setBusy(true);
        setError("");

        try {
            const res = await login({ username, password });
            if (!res.ok) throw new Error(`HTTP ${res.status}`);
            const data = await res.json(); //data refers to token
            localStorage.setItem("token", data.token);
            navigate("/cards")
        } catch (error) {
            console.error("Login failed", error)
        } finally {
            setBusy(false)
        }
    }
    return (
        <main>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <input value={username} onChange={(e) => setUsername(e.target.value)} />
                <input value={password} onChange={(e) => setPassword(e.target.value)} type="password"/>
                <button disabled={busy} type="submit">{busy ? "Logging in..." : "Login"} </button>
                {error && <p style={{color: "red" }}>{error}</p>}
            </form>
        </main>
    )
}