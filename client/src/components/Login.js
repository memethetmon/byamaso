import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

const AuthContext = React.createContext({
    isAuthenticated: false,
    setAuthenticated: () => {}
});

export default function Login(props) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isAuthenticated, setAuthenticated] = useState(false);
    const history = useHistory();

    const login = (e) => {
        e.preventDefault();
        const userData = {
            username: username,
            password: password
        }
        axios.post('/api/login', userData)
            .then(res => {
                setAuthenticated(res.status === 200);
                history.push('/properties-list');
            })
            .catch(err => alert("Login Unsuccessful!!!"));
    }

    return (
        <AuthContext.Provider value={{isAuthenticated, setAuthenticated}}>
            <form id="loginForm" onSubmit={login} method="post">
                <div className="form-group">
                    <label htmlFor="username" className="font-weight-bold">Username</label>
                    <input type="text" id="username" className="form-control" value={username} onChange={e => setUsername(e.target.value)}></input>
                </div>
                <div className="form-group">
                    <label htmlFor="password" className="font-weight-bold">Password</label>
                    <input type="password" id="password" className="form-control" value={password} onChange={e => setPassword(e.target.value)}></input>
                </div>
                <button type="submit" className="btn btn-outline-info btn-sm btn-block">Login</button>
            </form>
        </AuthContext.Provider>
    )
}

export function useAuth() {
    const context = React.useContext(AuthContext);
    if (context === undefined) {
      throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}