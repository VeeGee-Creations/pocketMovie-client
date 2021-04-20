import React, {useState} from 'react';

export default function LoginView(props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        props.onLoggedIn(username);
        console.log(username, password);
    };

    const handleRegister = () => {
        props.onRegister(false);
    };

    return (
        <form>
            <label>
                Username:
                <input type="text" value={username} onChange={e => setUsername(e.target.value)}/>
            </label>
            <label>
                Password:
                <input type="text" value={password} onChange={e => setPassword(e.target.value)}/>
            </label>
            <button type="submit" onClick={handleSubmit}>Login</button>
            <button type="button" onClick= {handleRegister}>Register</button>
        </form>
    )
}