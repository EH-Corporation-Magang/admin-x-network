/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {
    useState,
    useEffect
} from 'react';
import MySwal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { MDBDataTable } from 'mdbreact';
import RadioCoverage from './RadioCoverage';


const RadioMenu = () => {
    const [tableRadio, setTableRadio] = useState('')
    const [idRadio, setIdRadio] = useState('')
    const [fm_channel, setFmChannel] = useState('')
    const [kota, setKota] = useState('')
    const [loading, setLoading] = useState(false)
    const [idProvinsi, setIdProvinsi] = useState(0)
    const [provinsi, setProvinsi] = useState('')
    const [kotaPilih, setKotaPilih] = useState('')
    const Swal = withReactContent(MySwal)
    const keyAPI = `5ZZHvtG7IvXmVDSCLTB73gd1XwqFjaWUiiTZrz1exj8pLIbFFm`
    const URL_API = `http://localhost:8000`

    // Setting the data table
    const dataTableRadio = radio => {
        let rowsData = []

        for (var index = 0; index < radio.length; index++) {
            let rowItem = {}
            rowItem["no"] = index + 1
            rowItem["fm"] = radio[index].fm_channel
            rowItem["kota"] = radio[index].kota
            rowItem["action"] =
                <>
                    <button style={{ marginRight: "10px", width: "45%", height: "35px" }} onClick={event => getIdRadio(event)} data-toggle="modal" data-target="#editModal" className="btn btn-primary" type="button" id={radio[index].id} ><i className="mdi mdi-table-edit" style={{ marginRight: "10px" }} />Edit</button>
                    <button onClick={e => deleteRadio(e)} style={{ marginRight: "10px", width: "45%", height: "35px" }} className="btn btn-danger" type="button" id={radio[index].id} ><i className="mdi mdi-delete" style={{ marginRight: "10px" }} />Delete</button>
                </>
            rowsData.push(rowItem)
        }
        setTableRadio(rowsData)
    }

    const fetchRadio = async () => {
        try {
            const data = await fetch(`${URL_API}/radio`, {
                method: 'GET'
            })
            const resp = await data.json()
            dataTableRadio(resp.result)
        } catch (error) {
            console.log(error)
            alert(error)
        }
    }

    useEffect(() => {
        fetchRadio()
            .then(() => {
                setLoading(true)
            }).then(() => {
                getProvinsi()
            })

        if (idProvinsi) {
            getKota()
        }
    }, [idProvinsi])

    // Data radio
    const dataRadio = (data) => {
        return {
            columns: [
                {
                    label: 'No',
                    field: 'no',
                    sort: 'asc'
                },
                {
                    label: 'FM Channel',
                    field: 'fm',
                    sort: 'asc'
                },
                {
                    label: 'City',
                    field: 'kota',
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

    // handle submit add radio
    const handleSubmit = async e => {
        e.preventDefault();
        try {
            const fetchApi = await fetch(`${URL_API}/radio/store`, {
                method: 'POST',
                body: JSON.stringify({
                    fm_channel,
                    kota
                }),
                headers: { 'Content-Type': 'application/json' }
            })
            const create = await fetchApi.json()
            console.log(create)
            if (create.success) {
                Swal.fire({
                    icon: 'success',
                    title: 'Succes Add Data Radio',
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
                    setFmChannel('')
                    setKota('')
                    setIdProvinsi('')
                    fetchRadio().then(() => {
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
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'There is an error!',
                html:
                    '<ul> ' +
                    '<li><p style="color: red;">there are columns that have not been filled</p></li> ' +
                    '</ul > '
            })
            console.log(error)
        }
    }

    // Get id radio
    const getIdRadio = async e => {
        try {
            const data = await fetch(`${URL_API}/radio/get/${e.target.id}`, {
                method: 'GET'
            })
            const resp = await data.json()
            setIdRadio(resp.data.id)
            setFmChannel(resp.data.fm_channel)
            setKota(resp.data.kota)
        } catch (error) {
            console.log(error)
        }
    }

    // Handle edit
    const handleEdit = async e => {
        e.preventDefault();
        try {
            const updateJob = await fetch(`${URL_API}/radio/update/${idRadio}`, {
                method: 'PUT',
                body: JSON.stringify({
                    fm_channel,
                    kota
                }),
                headers: { 'Content-Type': 'application/json' },
            })
            const update = await updateJob.json()
            if (update.success) {
                Swal.fire({
                    icon: 'success',
                    title: 'Succes Edit Data Radio',
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
                    setFmChannel('')
                    setKota('')
                    setIdProvinsi('')
                    fetchRadio().then(() => {
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
        } catch (error) {
            console.log(error)
        }
    }

    // Delete radio
    const deleteRadio = (e) => {
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
                    'Data radio has been deleted.',
                    'success'
                ).then(async () => {
                    try {
                        const siswaDelete = await fetch(`${URL_API}/radio/delete/${id}`, {
                            method: 'DELETE'
                        })
                        await siswaDelete
                    } catch (error) {
                        console.log(error)
                    }
                }).then(function () {
                    fetchRadio().then(() => {
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

    const getProvinsi = async () => {
        try {
            const data = await fetch(`https://x.rajaapi.com/MeP7c5ne${keyAPI}/m/wilayah/provinsi`, {
                method: 'GET'
            })
            const resp = await data.json()
            console.log(resp.data)
            if (resp.success) {
                setProvinsi(resp.data)
            }
        } catch (error) {
            console.log(error)
            alert(error)
        }
    }

    const getKota = async () => {
        try {
            const data = await fetch(`https://x.rajaapi.com/MeP7c5ne${keyAPI}/m/wilayah/kabupaten?idpropinsi=${idProvinsi}`, {
                method: 'GET'
            })
            const resp = await data.json()
            console.log(resp.data)
            if (resp.success) {
                setKotaPilih(resp.data)
            }
        } catch (error) {
            console.log(error)
            alert(error)
        }
    }

    if (loading) {
        Swal.close()
        return (
            <>
                {/* header */}
                <div className="page-header">
                    <h3 className="page-title"> Radio Menu </h3>
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><a href="dashboard">Dashboard</a></li>
                            <li className="breadcrumb-item active" aria-current="page">Radio Menu</li>
                        </ol>
                    </nav>
                </div>
                {/* content */}
                <div className="row" style={{ marginBottom: "125px" }}>
                    {/* Area Table Radio */}
                    <div className="col-xl-6 col-lg-6">
                        <div className="card shadow mb-4">
                            {/* Card Header - Dropdown */}
                            <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                                <h6 className="m-0 font-weight-bold text-primary">Data Radio</h6>
                                <div className="dropdown no-arrow">
                                    <a className="dropdown-toggle" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        <i className="fas fa-ellipsis-v fa-sm fa-fw text-gray-400" />
                                    </a>
                                    <div className="dropdown-menu dropdown-menu-right shadow animated--fade-in" aria-labelledby="dropdownMenuLink">
                                        <div className="dropdown-header">Action:</div>
                                        <a className="dropdown-item" data-toggle="modal" data-target="#addModal">
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
                                    responsive={true}
                                    data={dataRadio(tableRadio)}
                                />
                            </div>
                        </div>
                    </div>
                    {/* Area Table Radio Coverage */}
                    <RadioCoverage />
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
                                        <label htmlFor="exampleFormControlInput1">FM Channel</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="fm_channel"
                                            id="exampleFormControlInput1"
                                            placeholder="95.5 FM"
                                            style={{ color: "white" }}
                                            value={fm_channel}
                                            onChange={e => setFmChannel(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="exampleFormControlSelect2">Pilih Provinsi</label>
                                        <select
                                            className="form-control"
                                            id="exampleFormControlSelect2"
                                            style={{ color: "white" }}
                                            value={idProvinsi}
                                            onChange={e => setIdProvinsi(e.target.value)}
                                        >
                                            <option selected>Choose...</option>
                                            {provinsi.length > 0 &&
                                                provinsi.map((item) => {
                                                    return (
                                                        <option key={item.id} value={item.id}>{item.name}</option>
                                                    )
                                                })
                                            }
                                            {provinsi.length === 0 &&
                                                <option disabled>Nothing in here</option>
                                            }
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="exampleFormControlSelect3">Pilih Kota</label>
                                        <select
                                            className="form-control"
                                            name="kota"
                                            id="exampleFormControlSelect3"
                                            style={{ color: "white" }}
                                            value={kota}
                                            onChange={e => setKota(e.target.value)}
                                        >
                                            <option selected>Choose...</option>
                                            {kotaPilih.length > 0 &&
                                                kotaPilih.map((item) => {
                                                    return (
                                                        <option key={item.id} value={item.name}>{item.name}</option>
                                                    )
                                                })
                                            }
                                            {kotaPilih.length === 0 &&
                                                <option disabled>Nothing in here</option>
                                            }
                                        </select>
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                    <button type="submit" className="btn btn-success">Add Data</button>
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
                                        <label htmlFor="exampleFormControlInput1">FM Channel</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="fm_channel"
                                            id="exampleFormControlInput1"
                                            placeholder="95.5 FM"
                                            style={{ color: "white" }}
                                            value={fm_channel}
                                            onChange={e => setFmChannel(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="exampleFormControlSelect2">Pilih Provinsi</label>
                                        <select
                                            className="form-control"
                                            id="exampleFormControlSelect2"
                                            style={{ color: "white" }}
                                            value={idProvinsi}
                                            onChange={e => setIdProvinsi(e.target.value)}
                                        >
                                            <option selected>Choose...</option>
                                            {provinsi.length > 0 &&
                                                provinsi.map((item) => {
                                                    return (
                                                        <option key={item.id} value={item.id}>{item.name}</option>
                                                    )
                                                })
                                            }
                                            {provinsi.length === 0 &&
                                                <option disabled>Nothing in here</option>
                                            }
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="exampleFormControlSelect3">Pilih Kota</label>
                                        <select
                                            className="form-control"
                                            name="kota"
                                            id="exampleFormControlSelect3"
                                            style={{ color: "white" }}
                                            value={kota}
                                            onChange={e => setKota(e.target.value)}
                                        >
                                            <option selected>Choose...</option>
                                            {kotaPilih.length > 0 &&
                                                kotaPilih.map((item) => {
                                                    return (
                                                        <option key={item.id} value={item.name}>{item.name}</option>
                                                    )
                                                })
                                            }
                                            {kotaPilih.length === 0 &&
                                                <option disabled>Nothing in here</option>
                                            }
                                        </select>
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

export default RadioMenu