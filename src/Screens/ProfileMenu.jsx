import React, {
    useState,
    useEffect
} from 'react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const ProfileMenu = () => {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [gambar_user, setImage] = useState('')
    const [iduser, setIdUser] = useState('')
    const MySwal = withReactContent(Swal)

    const getIdUser = async () => {
        try {
            const data = await fetch(`http://localhost:8000/user/get/${localStorage.getItem('iduser')}`, {
                method: 'GET'
            })
            const datauser = await data.json()
            console.log(datauser.data)
            setUsername(datauser.data.username)
            setEmail(datauser.data.email)
            setIdUser(datauser.data.id)
        } catch (error) {
            console.log(error)
            alert(error)
        }
    }

    const handleEdit = async e => {
        e.preventDefault()
        try {
            const updateUser = await fetch(`http://localhost:8000/user/update/${iduser}`, {
                method: 'PUT',
                body: JSON.stringify({
                    username,
                    email,
                    password,
                    gambar_user
                }),
                headers: { 'Content-Type': 'application/json' },
            })
            const update = await updateUser.json()
            console.log(update)
            if (update.success) {
                MySwal.fire({
                    icon: 'success',
                    title: 'Succes Edit Data User',
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 1000,
                    timerProgressBar: true,
                    didOpen: (toast) => {
                        toast.addEventListener('mouseenter', Swal.stopTimer)
                        toast.addEventListener('mouseleave', Swal.resumeTimer)
                    }
                }).then(function () {
                    getIdUser()
                    console.log(getIdUser())
                    MySwal.fire({
                        title: 'Loading...',
                        timer: 1000,
                        didOpen: () => {
                            MySwal.showLoading()
                        },
                    })
                })
            }
        } catch (error) {
            console.log(error)
            alert(error)
        }
    }

    useEffect(() => {
        getIdUser()
    }, [])

    return (
        <>
            <div className="page-header">
                <h3 className="page-title"> Profile </h3>
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><a href="dashboard">Dashboard</a></li>
                        <li className="breadcrumb-item active" aria-current="page">Profile Menu</li>
                    </ol>
                </nav>
            </div>
            <div className="row">
                <div className="col-md-6 grid-margin stretch-card">
                    <img src={localStorage.getItem('gambaruser')} alt="foto_user" style={{ width: "73%", borderRadius: "5%", marginLeft: "14%" }} />
                </div>
                <div className="col">
                    <div className="card" style={{ marginLeft: "-9%", marginRight: "13%" }}>
                        <div className="card-body">
                            <h4 className="card-title">Data Profile</h4>
                            <form className="forms-sample" onSubmit={e => handleEdit(e)}>
                                <div className="form-group">
                                    <label htmlFor="exampleInputUsername1">Username</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="exampleInputUsername1"
                                        placeholder="Username"
                                        style={{ color: "white" }}
                                        value={username}
                                        onChange={e => setUsername(e.target.value)}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="exampleInputEmail1">Email address</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        id="exampleInputEmail1"
                                        placeholder="Email"
                                        style={{ color: "white" }}
                                        value={email}
                                        onChange={e => setEmail(e.target.value)}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="exampleInputPassword1">Password</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        id="exampleInputPassword1"
                                        placeholder="Password"
                                        style={{ color: "white" }}
                                        value={password}
                                        onChange={e => setPassword(e.target.value)}
                                    />
                                </div>
                                <div className="form-group mb-4">
                                    <label htmlFor="exampleFormControlFile1">Image User</label>
                                    <input
                                        type="file"
                                        name="gambar_user"
                                        className="form-control-file"
                                        id="exampleFormControlFile1"
                                        value={gambar_user}
                                        onChange={e => setImage(e.target.value)}
                                    />
                                </div>
                                <button type="submit" className="btn btn-primary mr-2">Edit</button>
                            </form>
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}

export default ProfileMenu