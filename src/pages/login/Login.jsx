import React, { useContext, useState } from 'react'
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../../firebase';
import { AuthContext } from '../../context/AuthContext'
import { useNavigate } from 'react-router-dom';
import './login.scss'


const Login = () => {

    const [error, setError] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();
    const { dispatch } = useContext(AuthContext)

    const handleLogin = (e) => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            dispatch({type: "LOGIN", payload: user})
            navigate("/")
        })
        .catch((error) => {
            setError(true)
        });
    }

    return (
        <div className='login'>
            <div className="top">
                <div className="left"><img src={'signingraphic.jpg'} alt=""/></div>
                <div className="right">
                    <div className="heading">
                        <h2>Responsable Logistique</h2>
                        <span>Connectez-vous avec un e-mail et un mot de passe pour commencer!</span>
                    </div>
                    <form onSubmit={handleLogin}>
                        <input type="email" placeholder='email' onChange={e=>setEmail(e.target.value)} />
                        <input type="password" placeholder='mot de passe' onChange={e=>setPassword(e.target.value)} />
                        <button type="submit">Login</button>
                        { error && <span>Email ou mot de passe incorrect.</span> }
                    </form>
                </div>
            </div>
            <hr />
            <div className="bottom">
                <h2>Nous sommes Internationaux</h2>
                <div className="features">
                    <div className="feature">
                        <img src={'worldmap.jpg'} alt=""/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login