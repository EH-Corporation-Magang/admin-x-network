/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {
    useState,
    useEffect
} from 'react';
import MySwal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { MDBDataTable } from 'mdbreact';

const DigitalAds = () => {
    const [tableAds, setTableAds] = useState('')
    const [idAds, setIdAds] = useState('')
    const [loading, setLoading] = useState(false)

    // this for add
    const [image, setImage] = useState('')
    const [title, setTitle] = useState('')
    const [subtitle, setSubtitle] = useState('')
    const [description, setDescription] = useState('')

    // this for edit
    const [imageEdit, setImageEdit] = useState('')

    const Swal = withReactContent(MySwal)
    const URL_API = `http://localhost:8000`

    // Setting the data table
    const dataTableAds = data => {
        let rowsData = []

        for (var index = 0; index < data.length; index++) {
            let rowItem = {}
            rowItem["no"] = index + 1
            rowItem["image"] = <img style={{ width: "100px", height: "100px", borderRadius: "0px" }} src={data[index].image} alt="tidak ada gambar" />
            rowItem["title"] = data[index].title
            rowItem["subtitle"] = data[index].subtitle
            rowItem["description"] = data[index].description
            rowItem["action"] =
                <>
                    <button onClick={event => getIdApps(event)} style={{ marginRight: "10px", width: "45%", height: "35px" }} data-toggle="modal" data-target="#editModal" className="btn btn-primary" type="button" id={data[index].id} ><i className="mdi mdi-table-edit" style={{ marginRight: "10px" }} />Edit</button>
                    <button onClick={event => deleteAds(event)} style={{ marginRight: "10px", width: "45%", height: "35px" }} className="btn btn-danger" type="button" id={data[index].id} ><i className="mdi mdi-delete" style={{ marginRight: "10px" }} />Delete</button>
                </>
            rowsData.push(rowItem)
        }
        setTableAds(rowsData)
    }

    const fetchAds = async () => {
        try {
            const data = await fetch(`${URL_API}/ads`, {
                method: 'GET'
            })
            const datapps = await data.json()
            dataTableAds(datapps.result)
        } catch (error) {
            console.log(error)
            alert(error)
        }
    }

    useEffect(() => {
        fetchAds().then(() => {
            setLoading(true)
        })
    }, [])

    // Data ads
    const dataAds = (data) => {
        return {
            columns: [
                {
                    label: 'No',
                    field: 'no',
                    sort: 'asc'
                },
                {
                    label: 'Image',
                    field: 'image',
                    sort: 'asc'
                },
                {
                    label: 'title',
                    field: 'title',
                    sort: 'asc'
                },
                {
                    label: 'subtitle',
                    field: 'subtitle',
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

    // handle submit add apps
    const handleSubmit = async e => {
        e.preventDefault();
        let formData = new FormData(e.target)
        try {
            const fetchApi = await fetch(`${URL_API}/ads/store`, {
                method: 'POST',
                body: formData
            })
            const create = await fetchApi.json()
            console.log(create)
            if (create.success) {
                Swal.fire({
                    icon: 'success',
                    title: 'Succes Add Data',
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
                    setImage('')
                    setDescription('')
                    setSubtitle('')
                    setTitle('')
                    fetchAds().then(() => {
                        setLoading(true)
                    });
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

    // Get id apps
    const getIdApps = async e => {
        try {
            const data = await fetch(`${URL_API}/ads/get/${e.target.id}`, {
                method: 'GET'
            })
            const result = await data.json()
            setIdAds(result.data.id)
            setTitle(result.data.title)
            setSubtitle(result.data.subtitle)
            setDescription(result.data.description)
        } catch (error) {
            console.log(error)
        }
    }

    // handle submit edit apps
    const handleEdit = async e => {
        e.preventDefault();
        let formData = new FormData(e.target)
        try {
            const fetchApi = await fetch(`${URL_API}/ads/update/${idAds}`, {
                method: 'POST',
                body: formData
            })
            const create = await fetchApi.json()
            console.log(create)
            if (create.success) {
                Swal.fire({
                    icon: 'success',
                    title: 'Succes Edit Data',
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
                    setImage('')
                    setDescription('')
                    setSubtitle('')
                    setTitle('')
                    fetchAds().then(() => {
                        setLoading(true)
                    });
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

    // Delete apps
    const deleteAds = (e) => {
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
                    'Data has been deleted.',
                    'success'
                ).then(async () => {
                    try {
                        const Delete = await fetch(`${URL_API}/ads/delete/${id}`, {
                            method: 'DELETE'
                        })
                        await Delete
                    } catch (error) {
                        console.log(error)
                    }
                }).then(function () {
                    fetchAds().then(() => {
                        setLoading(true)
                    });
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
                    <h3 className="page-title"> Digital Ads Menu </h3>
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><a href="dashboard">Dashboard</a></li>
                            <li className="breadcrumb-item active" aria-current="page">Digital Ads Menu</li>
                        </ol>
                    </nav>
                </div>
                {/* content */}
                <div className="row" style={{ marginBottom: "125px" }}>
                    {/* Area Table Apps */}
                    <div className="col-xl-12 col-lg-12">
                        <div className="card shadow mb-4">
                            {/* Card Header - Dropdown */}
                            <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                                <h6 className="m-0 font-weight-bold text-primary">Data How Digital Ads Work</h6>
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
                                    noBottomColumns={true}
                                    striped
                                    data={dataAds(tableAds)}
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
                                        <label htmlFor="exampleFormControlInput1">Title</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="input title fiture product 1"
                                            onChange={e => setTitle(e.target.value)}
                                            value={title}
                                            name="title"
                                            style={{ color: "white" }}
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="exampleFormControlInput1">Sub Title</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="input title fiture product 1"
                                            onChange={e => setSubtitle(e.target.value)}
                                            value={subtitle}
                                            name="subtitle"
                                            style={{ color: "white" }}
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="exampleFormControlTextarea1">Description</label>
                                        <textarea
                                            className="form-control"
                                            placeholder="input product description"
                                            onChange={e => setDescription(e.target.value)}
                                            value={description}
                                            name="description"
                                            style={{ color: "white" }}
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="exampleFormControlFile2">Image</label>
                                        <input
                                            type="file"
                                            name="image"
                                            className="form-control-file"
                                            value={image}
                                            onChange={e => setImage(e.target.value)}
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
                                        <label htmlFor="exampleFormControlInput1">Title</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="input title"
                                            onChange={e => setTitle(e.target.value)}
                                            value={title}
                                            name="title"
                                            style={{ color: "white" }}
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="exampleFormControlInput1">Sub Title</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="input sub title"
                                            onChange={e => setSubtitle(e.target.value)}
                                            value={subtitle}
                                            name="subtitle"
                                            style={{ color: "white" }}
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="exampleFormControlTextarea1">Description</label>
                                        <textarea
                                            className="form-control"
                                            placeholder="input description"
                                            onChange={e => setDescription(e.target.value)}
                                            value={description}
                                            name="description"
                                            style={{ color: "white" }}
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="exampleFormControlFile2">Image</label>
                                        <input
                                            type="file"
                                            name="image"
                                            className="form-control-file"
                                            value={imageEdit}
                                            onChange={e => setImageEdit(e.target.value)}
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

export default DigitalAds