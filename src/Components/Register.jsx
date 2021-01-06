/* eslint-disable jsx-a11y/img-redundant-alt */
import React, {
    useState
} from 'react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

function Register(props) {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [image, setImage] = useState('')
    const MySwal = withReactContent(Swal)
    const URL_API = `http://localhost:8000`

    const registerForm = async e => {
        e.preventDefault()
        let formData = new FormData(e.target)
        try {
            const register = await fetch(`${URL_API}/register`, {
                method: 'POST',
                body: formData
            })
            const dataregister = await register.json()
            console.log(dataregister)
            if (dataregister.success) {
                setUsername('')
                setEmail('')
                setPassword('')
                setImage('')
                MySwal.fire({
                    icon: 'success',
                    title: 'Success Register',
                }).then(function () {
                    window.location.replace('/')
                })
            }

            if (!dataregister.success) {
                MySwal.fire({
                    icon: 'error',
                    title: 'There is an error!',
                    html:
                        '<ul> ' +
                        '<li><p style="color: red;">there are columns that have not been filled</p></li> ' +
                        '</ul > '
                })
            }
        } catch (error) {
            console.log(error)
            alert(error)
        }
    }

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
                            <h1 className="login-title">Register</h1>
                            <form onSubmit={registerForm}>
                                <div className="form-group">
                                    <label htmlFor="username">Username</label>
                                    <input
                                        style={{
                                            borderRadius: "5px",
                                            padding: "10px"
                                        }}
                                        type="text"
                                        className="form-control"
                                        name="username"
                                        placeholder="enter your username"
                                        value={username}
                                        onChange={e => setUsername(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="email">Email</label>
                                    <input
                                        style={{
                                            borderRadius: "5px",
                                            padding: "10px"
                                        }}
                                        type="email"
                                        name="email"
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
                                        className="form-control"
                                        placeholder="enter your passsword"
                                        value={password}
                                        onChange={e => setPassword(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="form-group mb-4">
                                    <label htmlFor="exampleFormControlFile1">Image User</label>
                                    <input
                                        type="file"
                                        name="gambar_user"
                                        className="form-control-file"
                                        id="exampleFormControlFile1"
                                        value={image}
                                        onChange={e => setImage(e.target.value)}
                                    />
                                </div>
                                <button type="submit" className="btn btn-block login-btn">
                                    Register
                                </button>
                            </form>
                            <p style={{ marginTop: "15%" }} className="login-wrapper-footer-text">Have an account? <a href="/" className="text-reset">Login here</a></p>
                        </div>
                    </div>
                    <div className="col-sm-6 px-0 d-none d-sm-block">
                        <img src="https://images.unsplash.com/photo-1557754897-ca12c5049d83?ixid=MXwxMjA3fDB8MHxzZWFyY2h8M3x8YWRtaW58ZW58MHx8MHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" alt="login image" className="login-img" />
                    </div>
                </div>
            </div>

            {/* script for register */}
            <script src="https://code.jquery.com/jquery-3.4.1.min.js"></script>
            <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js"></script>
            <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js"></script>
        </>
    )
}

export default Register