/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {
    useState,
    useEffect
} from 'react';
import MySwal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { MDBDataTable } from 'mdbreact';

const UserMenu = () => {
    const [tableUser, setTableUser] = useState('')
    const [idUser, setUserId] = useState('')
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [gambaruser, setGambar] = useState('')
    const [loading, setLoading] = useState(false)
    const Swal = withReactContent(MySwal)
    const URL_API = `http://localhost:8000`

    useEffect(() => {
        fetchUser()
            .then(() => {
                setLoading(true)
            })
    }, [])

    // fetch data
    const fetchUser = async () => {
        try {
            const data = await fetch(`${URL_API}/user`, {
                method: 'GET'
            })
            const resp = await data.json()
            dataTableUser(resp.result)
        } catch (error) {
            console.log(error)
            alert(error)
        }
    }

    // Setting the data table
    const dataTableUser = user => {
        let rowsData = []

        for (var index = 0; index < user.length; index++) {
            let rowItem = {}
            rowItem["no"] = index + 1
            rowItem["username"] = user[index].username
            rowItem["email"] = user[index].email
            rowItem["action"] =
                <>
                    <button onClick={event => getIdUser(event)} style={{ marginRight: "10px", width: "45%", height: "35px" }} data-toggle="modal" data-target="#editModal" className="btn btn-primary" type="button" id={user[index].id} ><i className="mdi mdi-table-edit" style={{ marginRight: "10px" }} />Edit</button>
                    <button onClick={event => deleteUser(event)} style={{ marginRight: "10px", width: "45%", height: "35px" }} className="btn btn-danger" type="button" id={user[index].id} ><i className="mdi mdi-delete" style={{ marginRight: "10px" }} />Delete</button>
                </>
            rowsData.push(rowItem)
        }
        setTableUser(rowsData)
    }

    // Data user
    const dataUser = (data) => {
        return {
            columns: [
                {
                    label: 'No',
                    field: 'no',
                    sort: 'asc'
                },
                {
                    label: 'Username',
                    field: 'username',
                    sort: 'asc'
                },
                {
                    label: 'Email',
                    field: 'email',
                    sort: 'asc'
                },
                {
                    label: 'Action',
                    field: 'action',
                    sort: 'asc'
                },
            ],
            rows: data
        }
    }

    const handleSubmit = async e => {
        e.preventDefault()
        let formData = new FormData(e.target)
        try {
            const data = await fetch(`${URL_API}/user/store`, {
                method: 'POST',
                body: formData
            })
            const resp = await data.json()
            console.log(resp)
            if (resp.success) {
                Swal.fire({
                    icon: 'success',
                    title: 'Succes Edit Data Job',
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
                    setUsername('')
                    setEmail('')
                    setPassword('')
                    setGambar('')
                    fetchUser()
                        .then(() => {
                            setLoading(true)
                        })
                    window.$('#addModal').modal('hide')
                    Swal.fire({
                        title: 'Loading...',
                        timer: 1000,
                        didOpen: () => {
                            Swal.showLoading()
                        },
                    })
                })
            }

            if (!resp.success) {
                Swal.fire({
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

    const getIdUser = async e => {
        try {
            const data = await fetch(`${URL_API}/user/get/${e.target.id}`, {
                method: 'GET'
            })
            const resp = await data.json()
            console.log(resp.data)
            setUserId(resp.data.id)
            setUsername(resp.data.username)
            setEmail(resp.data.email)
        } catch (error) {
            console.log(error)
            alert(error)
        }
    }

    const handleEdit = async e => {
        e.preventDefault()
        try {
            const data = await fetch(`${URL_API}/userupdate/${idUser}`, {
                method: 'PUT',
                body: JSON.stringify({
                    username,
                    email,
                    password
                }),
                headers: { 'Content-Type': 'application/json' }
            })
            const resp = await data.json()
            console.log(resp)
            if (resp.success) {
                Swal.fire({
                    icon: 'success',
                    title: 'Succes Edit Data Job',
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
                    setUsername('')
                    setEmail('')
                    setPassword('')
                    fetchUser()
                        .then(() => {
                            setLoading(true)
                        })
                    window.$('#editModal').modal('hide')
                    Swal.fire({
                        title: 'Loading...',
                        timer: 1000,
                        didOpen: () => {
                            Swal.showLoading()
                        },
                    })
                })
            }
            if (!resp.success) {
                Swal.fire({
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

    // Delete user
    const deleteUser = (e) => {
        const id = e.target.id
        console.log(id)
        Swal.fire({
            title: 'Are you sure to delete this data?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire(
                    'Deleted!',
                    'Data user has been deleted.',
                    'success'
                ).then(async () => {
                    try {
                        const userDelete = await fetch(`${URL_API}/user/delete/${id}`, {
                            method: 'DELETE'
                        })
                        await userDelete
                    } catch (error) {
                        console.log(error)
                    }
                }).then(function () {
                    fetchUser()
                        .then(() => {
                            setLoading(true)
                        })
                    Swal.fire({
                        title: 'Loading...',
                        timer: 1000,
                        didOpen: () => {
                            Swal.showLoading()
                        },
                    })
                })
            }
        })
    }

    if (loading) {
        Swal.close()
        return (
            <>
                {/* header */}
                <div className="page-header">
                    <h3 className="page-title"> User Menu </h3>
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><a href="dashboard">Dashboard</a></li>
                            <li className="breadcrumb-item active" aria-current="page">User Menu</li>
                        </ol>
                    </nav>
                </div>
                {/* content */}
                <div className="row" style={{ marginBottom: "125px" }}>
                    {/* Area Table Job */}
                    <div className="col-xl-12 col-lg-12">
                        <div className="card shadow mb-4">
                            {/* Card Header - Dropdown */}
                            <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                                <h6 className="m-0 font-weight-bold text-primary">Data User</h6>
                                <div className="dropdown no-arrow">
                                    <a className="dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        <i className="fas fa-ellipsis-v fa-sm fa-fw text-gray-400" />
                                    </a>
                                    <div className="dropdown-menu dropdown-menu-right shadow animated--fade-in" aria-labelledby="dropdownMenuLink">
                                        <div className="dropdown-header">Action:</div>
                                        <a className="dropdown-item" href="#" data-toggle="modal" data-target="#addModal">
                                            <i className="mdi mdi-plus" style={{ marginRight: "10px", color: "green" }} />
                                                Add Modal
                                                </a>
                                    </div>
                                </div>
                            </div>
                            {/* Card Body */}
                            <div className="card-body">
                                <MDBDataTable
                                    style={{ color: "white" }}
                                    sortable={false}
                                    striped
                                    noBottomColumns={true}
                                    data={dataUser(tableUser)}
                                    responsive={true}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* <!-- Add Modal --> */}
                <div className="modal fade" id="addModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Add Modal</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true" style={{ color: "white", marginRight: "10px" }}>×</span>
                                </button>
                            </div>
                            <form onSubmit={e => handleSubmit(e)}>
                                <div className="modal-body">
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
                                            value={gambaruser}
                                            onChange={e => setGambar(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                    <button type="submit" className="btn btn-success" >Add Data</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

                {/* <!-- Edit Modal --> */}
                <div className="modal fade" id="editModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Edit Modal</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true" style={{ color: "white", marginRight: "10px" }}>×</span>
                                </button>
                            </div>
                            <form onSubmit={e => handleEdit(e)}>
                                <div className="modal-body">
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
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="username">Email</label>
                                        <input
                                            style={{
                                                borderRadius: "5px",
                                                padding: "10px"
                                            }}
                                            type="email"
                                            className="form-control"
                                            name="email"
                                            placeholder="enter your email"
                                            value={email}
                                            onChange={e => setEmail(e.target.value)}
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
                                        />
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                    <button type="submit" className="btn btn-primary" >Edit Data</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </>
        )
    } else {
        Swal.fire({
            title: 'Loading...',
            didOpen: () => {
                Swal.showLoading()
            },
        })
    }
    return (
        <p></p>
    )
}

export default UserMenu