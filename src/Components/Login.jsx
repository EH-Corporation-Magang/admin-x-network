/* eslint-disable jsx-a11y/img-redundant-alt */
import React, {
    useState,
    useEffect
} from 'react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

function Login(props) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')
    const MySwal = withReactContent(Swal)

    const loginForm = async e => {
        e.preventDefault()
        let formData = new FormData(e.target)

        try {
            const fetchLogin = await fetch(`http://localhost:8000/login`, {
                method: 'POST',
                body: formData
            })
            const datalogin = await fetchLogin.json()
            console.log(datalogin)
            if (datalogin.success) {
                localStorage.setItem('username', datalogin.result.username)
                localStorage.setItem('gambaruser', datalogin.result.gambaruser)
                localStorage.setItem('token', datalogin.result.token)
                localStorage.setItem('iduser', datalogin.result.iduser)
                props.setData({
                    loggedIn: true,
                    user: datalogin.result.username
                })
                MySwal.fire({
                    title: 'Loading...',
                    timer: 1000,
                    didOpen: () => {
                        MySwal.showLoading()
                    }
                })
                props.history.push('/dashboard')
            } else {
                MySwal.fire({
                    icon: 'error',
                    title: 'There is an error!',
                    text: 'Email or password is not correct!'
                })
            }
        } catch (error) {
            console.log(error)
            alert(error)
        }
    }

    useEffect(() => {
        if (localStorage.getItem('token')) {
            props.history.push('/dashboard')
        }
    }, [props.history])

    return (
        <>
            {/* css for login */}
            <link href="https://fonts.googleapis.com/css?family=Karla:400,700&display=swap" rel="stylesheet" />
            <link rel="stylesheet" href="https://cdn.materialdesignicons.com/4.8.95/css/materialdesignicons.min.css" />
            <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" />
            <link rel="stylesheet" href="assets/css/login.css" />

            <div className="container-fluid">
                <div className="row">
                    <div className="col-sm-6 login-section-wrapper">
                        <div className="brand-wrapper">
                            <img src="assets/images/logox1.png" style={{ height: "40px" }} alt="logo" className="logo" />
                        </div>
                        <div className="login-wrapper my-auto">
                            <h1 className="login-title">Log in</h1>
                            <form onSubmit={loginForm}>
                                <div className="form-group">
                                    <label htmlFor="email">Email</label>
                                    <input
                                        style={{
                                            borderRadius: "5px",
                                            padding: "10px"
                                        }}
                                        type="email"
                                        name="email"
                                        id="email"
                                        className="form-control"
                                        placeholder="email@example.com"
                                        value={email}
                                        onChange={e => setEmail(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="form-group mb-4">
                                    <label htmlFor="password">Password</label>
                                    <input style={{
                                        borderRadius: "5px",
                                        padding: "10px"
                                    }}
                                        type="password"
                                        name="password"
                                        id="password"
                                        className="form-control"
                                        placeholder="enter your passsword"
                                        value={password}
                                        onChange={e => setPassword(e.target.value)}
                                        required
                                    />
                                </div>
                                <button type="submit" className="btn btn-block login-btn">
                                    Login
                                </button>
                            </form>
                        </div>
                    </div>
                    <div className="col-sm-6 px-0 d-none d-sm-block">
                        <img src="https://images.unsplash.com/photo-1557754897-ca12c5049d83?ixid=MXwxMjA3fDB8MHxzZWFyY2h8M3x8YWRtaW58ZW58MHx8MHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" alt="login image" className="login-img" />
                    </div>
                </div>
            </div>

            {/* script for login */}
            <script src="https://code.jquery.com/jquery-3.4.1.min.js"></script>
            <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js"></script>
            <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js"></script>
        </>
    )
}

export default Login