/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {
    useState,
    useEffect
} from 'react';
import MySwal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { MDBDataTable } from 'mdbreact';

const RadioCoverage = () => {
    const [tableradioCoverage, setTableRadioCoverage] = useState('')
    const [idRadioCoverage, setIdRadioCoverage] = useState('')
    const [provinsi, setProvinsi] = useState('')
    const [kota, setKota] = useState('')
    const [stasiun_id, setStasiunFm] = useState('')
    const [fm, setFm] = useState('')
    const [loading, setLoading] = useState(false)
    const [idProvinsi, setIdProvinsi] = useState(0)
    const [provinsiPilih, setProvinsiPilih] = useState('')
    const [kotaPilih, setKotaPilih] = useState('')
    const Swal = withReactContent(MySwal)
    const keyAPI = `5ZZHvtG7IvXmVDSCLTB73gd1XwqFjaWUiiTZrz1exj8pLIbFFm`
    const URL_API = `http://localhost:8000`

    // Setting the data table
    const dataTableRadioCoverage = radiocoverage => {
        let rowsData = []

        for (var index = 0; index < radiocoverage.length; index++) {
            let rowItem = {}
            rowItem["no"] = index + 1
            rowItem["provinsi"] = radiocoverage[index].provinsi
            rowItem["kota"] = radiocoverage[index].kota
            rowItem["stasiun_id"] = radiocoverage[index].stasiun_id
            rowItem["fm"] = radiocoverage[index].fm
            rowItem["action"] =
                <>
                    <button style={{ marginRight: "10px", width: "45%", height: "35px" }} onClick={event => getIdRadioCoverage(event)} data-toggle="modal" data-target="#editModalCoverage" className="btn btn-primary" type="button" id={radiocoverage[index].id} ><i className="mdi mdi-table-edit" style={{ marginRight: "10px" }} />Edit</button>
                    <button onClick={e => deleteRadioCoverage(e)} style={{ marginRight: "10px", width: "45%", height: "35px" }} className="btn btn-danger" type="button" id={radiocoverage[index].id} ><i className="mdi mdi-delete" style={{ marginRight: "10px" }} />Delete</button>
                </>
            rowsData.push(rowItem)
        }
        setTableRadioCoverage(rowsData)
    }

    const fetchRadioCoverage = async () => {
        try {
            const data = await fetch(`${URL_API}/radiocoverage`, {
                method: 'GET'
            })
            const resp = await data.json()
            dataTableRadioCoverage(resp.result)
        } catch (error) {
            console.log(error)
            alert(error)
        }
    }

    useEffect(() => {
        fetchRadioCoverage()
            .then(() => {
                setLoading(true)
            }).then(() => {
                getProvinsi()
            })

        if (idProvinsi) {
            getKota()
        }
    }, [idProvinsi])

    // Data radio coverage
    const dataRadioCoverage = (data) => {
        return {
            columns: [
                {
                    label: 'No',
                    field: 'no',
                    sort: 'asc'
                },
                {
                    label: 'Province',
                    field: 'provinsi',
                    sort: 'asc'
                },
                {
                    label: 'City',
                    field: 'kota',
                    sort: 'asc'
                },
                {
                    label: 'ID Station',
                    field: 'stasiun_id',
                    sort: 'asc'
                },
                {
                    label: 'FM',
                    field: 'fm',
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
            const fetchApi = await fetch(`${URL_API}/radiocoverage/store`, {
                method: 'POST',
                body: JSON.stringify({
                    provinsi,
                    kota,
                    stasiun_id,
                    fm
                }),
                headers: { 'Content-Type': 'application/json' }
            })
            const create = await fetchApi.json()
            console.log(create)
            if (create.success) {
                Swal.fire({
                    icon: 'success',
                    title: 'Succes Add Data Radio Coverage',
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
                    setProvinsi('')
                    setKotaPilih('')
                    setKota('')
                    setStasiunFm('')
                    setFm('')
                    fetchRadioCoverage().then(() => {
                        setLoading(true)
                    })
                    window.$('#addModalCoverage').modal('hide')
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

    // Get id radio Coverage
    const getIdRadioCoverage = async e => {
        try {
            const data = await fetch(`${URL_API}/radiocoverage/get/${e.target.id}`, {
                method: 'GET'
            })
            const resp = await data.json()
            setIdRadioCoverage(resp.data.id)
            setProvinsi(resp.data.provinsi)
            setKota(resp.data.kota)
            setStasiunFm(resp.data.stasiun_id)
            setFm(resp.data.fm)
        } catch (error) {
            console.log(error)
        }
    }

    // Handle edit
    const handleEdit = async e => {
        e.preventDefault();
        try {
            const updateJob = await fetch(`${URL_API}/radiocoverage/update/${idRadioCoverage}`, {
                method: 'PUT',
                body: JSON.stringify({
                    provinsi,
                    kota,
                    stasiun_id,
                    fm
                }),
                headers: { 'Content-Type': 'application/json' },
            })
            const update = await updateJob.json()
            if (update.success) {
                Swal.fire({
                    icon: 'success',
                    title: 'Succes Edit Data Radio Coverage',
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
                    setProvinsi('')
                    setKotaPilih('')
                    setKota('')
                    setStasiunFm('')
                    setFm('')
                    fetchRadioCoverage().then(() => {
                        setLoading(true)
                    })
                    window.$('#editModalCoverage').modal('hide')
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
    const deleteRadioCoverage = (e) => {
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
                    'Data radio coverage has been deleted.',
                    'success'
                ).then(async () => {
                    try {
                        const siswaDelete = await fetch(`${URL_API}/radiocoverage/delete/${id}`, {
                            method: 'DELETE'
                        })
                        await siswaDelete
                    } catch (error) {
                        console.log(error)
                    }
                }).then(function () {
                    fetchRadioCoverage().then(() => {
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
                setProvinsiPilih(resp.data)
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
                {/* Area Table Radio Coverage */}
                <div className="col-xl-6 col-lg-6">
                    <div className="card shadow mb-4">
                        {/* Card Header - Dropdown */}
                        <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                            <h6 className="m-0 font-weight-bold text-primary">Data Radio Coverage</h6>
                            <div className="dropdown no-arrow">
                                <a className="dropdown-toggle" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    <i className="fas fa-ellipsis-v fa-sm fa-fw text-gray-400" />
                                </a>
                                <div className="dropdown-menu dropdown-menu-right shadow animated--fade-in" aria-labelledby="dropdownMenuLink">
                                    <div className="dropdown-header">Action:</div>
                                    <a className="dropdown-item" data-toggle="modal" data-target="#addModalCoverage">
                                        <i className="mdi mdi-plus" style={{ marginRight: "10px", color: "green" }} />
                                                Add Modal
                                                </a>
                                    <a data-toggle="modal" data-target="#printModal" className="dropdown-item" >
                                        <i className="mdi mdi-file-pdf" style={{ color: "blue", marginRight: "10px" }} />Print Pdf
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
                                data={dataRadioCoverage(tableradioCoverage)}
                            />
                        </div>
                    </div>
                </div>

                {/* <!-- Add Modal --> */}
                <div className="modal fade" id="addModalCoverage" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
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
                                        <label htmlFor="exampleFormControlSelect2">Pilih Provinsi</label>
                                        <select
                                            className="form-control"
                                            id="exampleFormControlSelect2"
                                            style={{ color: "white" }}
                                            value={provinsi}
                                            onChange={e => setProvinsi(e.target.value)}
                                        >
                                            <option selected>Choose...</option>
                                            {provinsiPilih.length > 0 &&
                                                provinsiPilih.map((item) => {
                                                    return (
                                                        <option key={item.id} value={item.name}>{item.name}</option>
                                                    )
                                                })
                                            }
                                            {provinsiPilih.length === 0 &&
                                                <option disabled>Nothing in here</option>
                                            }
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="exampleFormControlSelect2">Pilih Provinsi Untuk Memilih Kota</label>
                                        <select
                                            className="form-control"
                                            id="exampleFormControlSelect2"
                                            style={{ color: "white" }}
                                            value={idProvinsi}
                                            onChange={e => setIdProvinsi(e.target.value)}
                                        >
                                            <option selected>Choose...</option>
                                            {provinsiPilih.length > 0 &&
                                                provinsiPilih.map((item) => {
                                                    return (
                                                        <option key={item.id} value={item.id}>{item.name}</option>
                                                    )
                                                })
                                            }
                                            {provinsiPilih.length === 0 &&
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
                                    <div className="form-group">
                                        <label htmlFor="exampleFormControlInput1">Stasiun Id</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="fm_channel"
                                            id="exampleFormControlInput1"
                                            placeholder="Just fill it"
                                            style={{ color: "white" }}
                                            value={stasiun_id}
                                            onChange={e => setStasiunFm(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="exampleFormControlInput1">FM Channel</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="fm_channel"
                                            id="exampleFormControlInput1"
                                            placeholder="95.5 FM"
                                            style={{ color: "white" }}
                                            value={fm}
                                            onChange={e => setFm(e.target.value)}
                                            required
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
                <div className="modal fade" id="editModalCoverage" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
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
                                        <label htmlFor="exampleFormControlSelect2">Pilih Provinsi</label>
                                        <select
                                            className="form-control"
                                            id="exampleFormControlSelect2"
                                            style={{ color: "white" }}
                                            value={provinsi}
                                            onChange={e => setProvinsi(e.target.value)}
                                        >
                                            <option selected>Choose...</option>
                                            {provinsiPilih.length > 0 &&
                                                provinsiPilih.map((item) => {
                                                    return (
                                                        <option key={item.id} value={item.name}>{item.name}</option>
                                                    )
                                                })
                                            }
                                            {provinsiPilih.length === 0 &&
                                                <option disabled>Nothing in here</option>
                                            }
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="exampleFormControlSelect2">Pilih Provinsi Untuk Memilih Kota</label>
                                        <select
                                            className="form-control"
                                            id="exampleFormControlSelect2"
                                            style={{ color: "white" }}
                                            value={idProvinsi}
                                            onChange={e => setIdProvinsi(e.target.value)}
                                        >
                                            <option selected>Choose...</option>
                                            {provinsiPilih.length > 0 &&
                                                provinsiPilih.map((item) => {
                                                    return (
                                                        <option key={item.id} value={item.id}>{item.name}</option>
                                                    )
                                                })
                                            }
                                            {provinsiPilih.length === 0 &&
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
                                    <div className="form-group">
                                        <label htmlFor="exampleFormControlInput1">Stasiun Id</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="fm_channel"
                                            id="exampleFormControlInput1"
                                            placeholder="Just fill it"
                                            style={{ color: "white" }}
                                            value={stasiun_id}
                                            onChange={e => setStasiunFm(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="exampleFormControlInput1">FM Channel</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="fm_channel"
                                            id="exampleFormControlInput1"
                                            placeholder="95.5 FM"
                                            style={{ color: "white" }}
                                            value={fm}
                                            onChange={e => setFm(e.target.value)}
                                            required
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

                {/* <!-- Print Modal --> */}
                <div className="modal fade" id="printModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Print Modal</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true" style={{ color: "white", marginRight: "10px" }}>×</span>
                                </button>
                            </div>
                            <form >
                                <div className="modal-body">

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

export default RadioCoverage