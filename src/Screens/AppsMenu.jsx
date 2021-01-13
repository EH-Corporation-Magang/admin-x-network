/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {
    useState,
    useEffect
} from 'react';
import MySwal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { MDBDataTable } from 'mdbreact';

const AppsMenu = () => {
    const [tableApps, setTableApps] = useState('')
    const [idApps, setIdApps] = useState('')
    const [loading, setLoading] = useState('')

    // this for add
    const [icon, setIcon] = useState('')
    const [image, setImage] = useState('')
    const [deskripsi, setDeskripsi] = useState('')
    const [titlefiture1, setTitleFiture1] = useState('')
    const [fiture1, setFiture1] = useState('')
    const [titlefiture2, setTitleFiture2] = useState('')
    const [fiture2, setFiture2] = useState('')
    const [titlefiture3, setTitleFiture3] = useState('')
    const [fiture3, setFiture3] = useState('')
    const [titlefiture4, setTitleFiture4] = useState('')
    const [fiture4, setFiture4] = useState('')
    const [titlefiture5, setTitleFiture5] = useState('')
    const [fiture5, setFiture5] = useState('')
    const [titlefiture6, setTitleFiture6] = useState('')
    const [fiture6, setFiture6] = useState('')

    // this for edit
    const [iconEdit, setIconEdit] = useState('')
    const [imageEdit, setImageEdit] = useState('')

    const Swal = withReactContent(MySwal)
    const URL_API = `http://localhost:8000`

    // Setting the data table
    const dataTableApps = apps => {
        let rowsData = []

        for (var index = 0; index < apps.length; index++) {
            let rowItem = {}
            rowItem["no"] = index + 1
            rowItem["icon"] = <img style={{ width: "100px", height: "100px", borderRadius: "0px" }} src={apps[index].icon} alt="tidak ada gambar" />
            rowItem["imageproduct"] = <img style={{ width: "100px", height: "100px", borderRadius: "0px" }} src={apps[index].image} alt="tidak ada gambar" />
            rowItem["deskripsi"] = apps[index].description
            rowItem["fiture1"] = apps[index].fiture1
            rowItem["titlefiture1"] = apps[index].titlefiture1
            rowItem["fiture2"] = apps[index].fiture2
            rowItem["titlefiture2"] = apps[index].titlefiture2
            rowItem["fiture3"] = apps[index].fiture3
            rowItem["titlefiture3"] = apps[index].titlefiture3
            rowItem["fiture4"] = apps[index].fiture4
            rowItem["titlefiture4"] = apps[index].titlefiture4
            rowItem["fiture5"] = apps[index].fiture5
            rowItem["titlefiture5"] = apps[index].titlefiture5
            rowItem["fiture6"] = apps[index].fiture6
            rowItem["titlefiture6"] = apps[index].titlefiture6
            rowItem["action"] =
                <>
                    <button onClick={event => getIdApps(event)} style={{ marginRight: "10px", width: "45%", height: "35px" }} data-toggle="modal" data-target="#editModal" className="btn btn-primary" type="button" id={apps[index].id} ><i className="mdi mdi-table-edit" style={{ marginRight: "10px" }} />Edit</button>
                    <button onClick={event => deleteApps(event)} style={{ marginRight: "10px", width: "45%", height: "35px" }} className="btn btn-danger" type="button" id={apps[index].id} ><i className="mdi mdi-delete" style={{ marginRight: "10px" }} />Delete</button>
                </>
            rowsData.push(rowItem)
        }
        setTableApps(rowsData)
    }

    const fetchApps = async () => {
        try {
            const data = await fetch(`${URL_API}/product`, {
                method: 'GET'
            })
            const datapps = await data.json()
            dataTableApps(datapps.result)
        } catch (error) {
            console.log(error)
            alert(error)
        }
    }

    useEffect(() => {
        fetchApps().then(() => {
            setLoading(true)
        })
    }, [])

    // Data apps
    const dataApps = (data) => {
        return {
            columns: [
                {
                    label: 'No',
                    field: 'no',
                    sort: 'asc'
                },
                {
                    label: 'Icon Product',
                    field: 'icon',
                    sort: 'asc'
                },
                {
                    label: 'Image Product',
                    field: 'imageproduct',
                    sort: 'asc'
                },
                {
                    label: 'Description Product',
                    field: 'deskripsi',
                    sort: 'asc'
                },
                {
                    label: 'Fiture 1',
                    field: 'fiture1',
                    sort: 'asc'
                },
                {
                    label: 'Title Fiture 1',
                    field: 'titlefiture1',
                    sort: 'asc'
                },
                {
                    label: 'Fiture 2',
                    field: 'fiture2',
                    sort: 'asc'
                },
                {
                    label: 'Title Fiture 2',
                    field: 'titlefiture2',
                    sort: 'asc'
                },
                {
                    label: 'Fiture 3',
                    field: 'fiture3',
                    sort: 'asc'
                },
                {
                    label: 'Title Fiture 3',
                    field: 'titlefiture3',
                    sort: 'asc'
                },
                {
                    label: 'Fiture 4',
                    field: 'fiture4',
                    sort: 'asc'
                },
                {
                    label: 'Title Fiture 4',
                    field: 'titlefiture4',
                    sort: 'asc'
                },
                {
                    label: 'Fiture 5',
                    field: 'fiture5',
                    sort: 'asc'
                },
                {
                    label: 'Title Fiture 5',
                    field: 'titlefiture5',
                    sort: 'asc'
                },
                {
                    label: 'Fiture 6',
                    field: 'fiture6',
                    sort: 'asc'
                },
                {
                    label: 'Title Fiture 6',
                    field: 'titlefiture6',
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
            const fetchApi = await fetch(`${URL_API}/product/store`, {
                method: 'POST',
                body: formData
            })
            const create = await fetchApi.json()
            console.log(create)
            if (create.success) {
                Swal.fire({
                    icon: 'success',
                    title: 'Succes Add Data Product',
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
                    setIcon('')
                    setImage('')
                    setDeskripsi('')
                    setFiture1('')
                    setTitleFiture1('')
                    setFiture2('')
                    setTitleFiture2('')
                    setFiture3('')
                    setTitleFiture3('')
                    setFiture4('')
                    setTitleFiture4('')
                    setFiture5('')
                    setTitleFiture5('')
                    setFiture6('')
                    setTitleFiture6('')
                    fetchApps().then(() => {
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
            const data = await fetch(`${URL_API}/product/get/${e.target.id}`, {
                method: 'GET'
            })
            const result = await data.json()
            console.log(result.data)
            setIdApps(result.data.id)
            setDeskripsi(result.data.description)
            setFiture1(result.data.fiture1)
            setFiture2(result.data.fiture2)
            setFiture3(result.data.fiture3)
            setFiture4(result.data.fiture4)
            setFiture5(result.data.fiture5)
            setFiture6(result.data.fiture6)
            setTitleFiture1(result.data.titlefiture1)
            setTitleFiture2(result.data.titlefiture2)
            setTitleFiture3(result.data.titlefiture3)
            setTitleFiture4(result.data.titlefiture4)
            setTitleFiture5(result.data.titlefiture5)
            setTitleFiture6(result.data.titlefiture6)
            console.log(icon)
        } catch (error) {
            console.log(error)
        }
    }

    // handle submit edit apps
    const handleEdit = async e => {
        e.preventDefault();
        let formData = new FormData(e.target)
        try {
            const fetchApi = await fetch(`${URL_API}/product/update/${idApps}`, {
                method: 'POST',
                body: formData
            })
            const create = await fetchApi.json()
            console.log(create)
            if (create.success) {
                Swal.fire({
                    icon: 'success',
                    title: 'Succes Edit Data Product',
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
                    setIconEdit('')
                    setImageEdit('')
                    setDeskripsi('')
                    setFiture1('')
                    setTitleFiture1('')
                    setFiture2('')
                    setTitleFiture2('')
                    setFiture3('')
                    setTitleFiture3('')
                    setFiture4('')
                    setTitleFiture4('')
                    setFiture5('')
                    setTitleFiture5('')
                    setFiture6('')
                    setTitleFiture6('')
                    fetchApps().then(() => {
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
    const deleteApps = (e) => {
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
                    'Data Apps has been deleted.',
                    'success'
                ).then(async () => {
                    try {
                        const siswaDelete = await fetch(`${URL_API}/product/delete/${id}`, {
                            method: 'DELETE'
                        })
                        await siswaDelete
                    } catch (error) {
                        console.log(error)
                    }
                }).then(function () {
                    fetchApps().then(() => {
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
                    <h3 className="page-title"> Apps Menu </h3>
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><a href="dashboard">Dashboard</a></li>
                            <li className="breadcrumb-item active" aria-current="page">Apps Menu</li>
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
                                <h6 className="m-0 font-weight-bold text-primary">Data Aplication Product</h6>
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
                                    data={dataApps(tableApps)}
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
                                    <div className="warning">
                                        <p>
                                            <b>important notice :</b>
                                            <li>You can input the features below according to your needs</li>
                                            <li>If it is less than 6, please leave the input blank</li>
                                            <li>Maximum letters is 255</li>
                                        </p>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="exampleFormControlFile1">Icon</label>
                                        <input
                                            type="file"
                                            name="icon"
                                            className="form-control-file"
                                            value={icon}
                                            onChange={e => setIcon(e.target.value)}
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
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="exampleFormControlTextarea1">Product Description</label>
                                        <textarea
                                            className="form-control"
                                            placeholder="input product description"
                                            onChange={e => setDeskripsi(e.target.value)}
                                            value={deskripsi}
                                            name="description"
                                            style={{ color: "white" }}
                                            required
                                        />
                                    </div>

                                    {/* Fiture 1 */}
                                    <div className="form-group">
                                        <label htmlFor="exampleFormControlInput1">Title Feature Product 1</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="input title fiture product 1"
                                            onChange={e => setTitleFiture1(e.target.value)}
                                            value={titlefiture1}
                                            name="titlefiture1"
                                            style={{ color: "white" }}
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="exampleFormControlInput1">Feature Product 1</label>
                                        <textarea
                                            type="text"
                                            className="form-control"
                                            placeholder="input fiture product 1"
                                            onChange={e => setFiture1(e.target.value)}
                                            value={fiture1}
                                            name="fiture1"
                                            style={{ color: "white" }}
                                            required
                                        />
                                    </div>

                                    {/* Fiture 2 */}
                                    <div className="form-group">
                                        <label htmlFor="exampleFormControlInput1">Title Feature Product 2</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="input title fiture product 2"
                                            onChange={e => setTitleFiture2(e.target.value)}
                                            value={titlefiture2}
                                            name="titlefiture2"
                                            style={{ color: "white" }}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="exampleFormControlInput1">Feature Product 2 </label>
                                        <textarea
                                            className="form-control"
                                            placeholder="input fiture product 2"
                                            onChange={e => setFiture2(e.target.value)}
                                            value={fiture2}
                                            name="fiture2"
                                            style={{ color: "white" }}
                                        />
                                    </div>

                                    {/* Fiture 3 */}
                                    <div className="form-group">
                                        <label htmlFor="exampleFormControlInput1">Title Feature Product 3</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="input title fiture product 3"
                                            onChange={e => setTitleFiture3(e.target.value)}
                                            value={titlefiture3}
                                            name="titlefiture3"
                                            style={{ color: "white" }}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="exampleFormControlInput1">Feature Product 3 </label>
                                        <textarea
                                            className="form-control"
                                            placeholder="input fiture product 3"
                                            onChange={e => setFiture3(e.target.value)}
                                            value={fiture3}
                                            name="fiture3"
                                            style={{ color: "white" }}
                                        />
                                    </div>

                                    {/* Fiture 4 */}
                                    <div className="form-group">
                                        <label htmlFor="exampleFormControlInput1">Title Feature Product 4</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="input title fiture product 4"
                                            onChange={e => setTitleFiture4(e.target.value)}
                                            value={titlefiture4}
                                            name="titlefiture4"
                                            style={{ color: "white" }}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="exampleFormControlInput1">Feature Product 4 </label>
                                        <textarea
                                            className="form-control"
                                            placeholder="input fiture product 4"
                                            onChange={e => setFiture4(e.target.value)}
                                            value={fiture4}
                                            name="fiture4"
                                            style={{ color: "white" }}
                                        />
                                    </div>

                                    {/* Fiture 5 */}
                                    <div className="form-group">
                                        <label htmlFor="exampleFormControlInput1">Title Feature Product 5</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="input title fiture product 5"
                                            onChange={e => setTitleFiture5(e.target.value)}
                                            value={titlefiture5}
                                            name="titlefiture5"
                                            style={{ color: "white" }}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="exampleFormControlInput1">Feature Product 5 </label>
                                        <textarea
                                            className="form-control"
                                            placeholder="input fiture product 5"
                                            onChange={e => setFiture5(e.target.value)}
                                            value={fiture5}
                                            name="fiture5"
                                            style={{ color: "white" }}
                                        />
                                    </div>

                                    {/* Fiture 6 */}
                                    <div className="form-group">
                                        <label htmlFor="exampleFormControlInput1">Title Feature Product 6</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="input title fiture product 6"
                                            onChange={e => setTitleFiture6(e.target.value)}
                                            value={titlefiture6}
                                            name="titlefiture6"
                                            style={{ color: "white" }}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="exampleFormControlInput1">Feature Product 6 </label>
                                        <textarea
                                            className="form-control"
                                            placeholder="input fiture product 6"
                                            onChange={e => setFiture6(e.target.value)}
                                            value={fiture6}
                                            name="fiture6"
                                            style={{ color: "white" }}
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
                                    <div className="warning">
                                        <p>
                                            <b>important notice :</b>
                                            <li>You can input the features below according to your needs</li>
                                            <li>If it is less than 6, please leave the input blank</li>
                                            <li>Maximum letters is 255</li>
                                        </p>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="exampleFormControlFile1">Icon</label>
                                        <input
                                            type="file"
                                            name="icon"
                                            className="form-control-file"
                                            value={iconEdit}
                                            onChange={e => setIconEdit(e.target.value)}
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
                                    <div className="form-group">
                                        <label htmlFor="exampleFormControlTextarea1">Product Description</label>
                                        <textarea
                                            className="form-control"
                                            placeholder="input product description"
                                            onChange={e => setDeskripsi(e.target.value)}
                                            value={deskripsi}
                                            name="description"
                                            style={{ color: "white" }}
                                        />
                                    </div>

                                    {/* Fiture 1 */}
                                    <div className="form-group">
                                        <label htmlFor="exampleFormControlInput1">Title Feature Product 1</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="input title fiture product 1"
                                            onChange={e => setTitleFiture1(e.target.value)}
                                            value={titlefiture1}
                                            name="titlefiture1"
                                            style={{ color: "white" }}
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="exampleFormControlInput1">Feature Product 1</label>
                                        <textarea
                                            type="text"
                                            className="form-control"
                                            placeholder="input fiture product 1"
                                            onChange={e => setFiture1(e.target.value)}
                                            value={fiture1}
                                            name="fiture1"
                                            style={{ color: "white" }}
                                            required
                                        />
                                    </div>

                                    {/* Fiture 2 */}
                                    <div className="form-group">
                                        <label htmlFor="exampleFormControlInput1">Title Feature Product 2</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="input title fiture product 2"
                                            onChange={e => setTitleFiture2(e.target.value)}
                                            value={titlefiture2}
                                            name="titlefiture2"
                                            style={{ color: "white" }}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="exampleFormControlInput1">Feature Product 2 </label>
                                        <textarea
                                            className="form-control"
                                            placeholder="input fiture product 2"
                                            onChange={e => setFiture2(e.target.value)}
                                            value={fiture2}
                                            name="fiture2"
                                            style={{ color: "white" }}
                                        />
                                    </div>

                                    {/* Fiture 3 */}
                                    <div className="form-group">
                                        <label htmlFor="exampleFormControlInput1">Title Feature Product 3</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="input title fiture product 3"
                                            onChange={e => setTitleFiture3(e.target.value)}
                                            value={titlefiture3}
                                            name="titlefiture3"
                                            style={{ color: "white" }}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="exampleFormControlInput1">Feature Product 3 </label>
                                        <textarea
                                            className="form-control"
                                            placeholder="input fiture product 3"
                                            onChange={e => setFiture3(e.target.value)}
                                            value={fiture3}
                                            name="fiture3"
                                            style={{ color: "white" }}
                                        />
                                    </div>

                                    {/* Fiture 4 */}
                                    <div className="form-group">
                                        <label htmlFor="exampleFormControlInput1">Title Feature Product 4</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="input title fiture product 4"
                                            onChange={e => setTitleFiture4(e.target.value)}
                                            value={titlefiture4}
                                            name="titlefiture4"
                                            style={{ color: "white" }}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="exampleFormControlInput1">Feature Product 4 </label>
                                        <textarea
                                            className="form-control"
                                            placeholder="input fiture product 4"
                                            onChange={e => setFiture4(e.target.value)}
                                            value={fiture4}
                                            name="fiture4"
                                            style={{ color: "white" }}
                                        />
                                    </div>

                                    {/* Fiture 5 */}
                                    <div className="form-group">
                                        <label htmlFor="exampleFormControlInput1">Title Feature Product 5</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="input title fiture product 5"
                                            onChange={e => setTitleFiture5(e.target.value)}
                                            value={titlefiture5}
                                            name="titlefiture5"
                                            style={{ color: "white" }}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="exampleFormControlInput1">Feature Product 5 </label>
                                        <textarea
                                            className="form-control"
                                            placeholder="input fiture product 5"
                                            onChange={e => setFiture5(e.target.value)}
                                            value={fiture5}
                                            name="fiture5"
                                            style={{ color: "white" }}
                                        />
                                    </div>

                                    {/* Fiture 6 */}
                                    <div className="form-group">
                                        <label htmlFor="exampleFormControlInput1">Title Feature Product 6</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="input title fiture product 6"
                                            onChange={e => setTitleFiture6(e.target.value)}
                                            value={titlefiture6}
                                            name="titlefiture6"
                                            style={{ color: "white" }}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="exampleFormControlInput1">Feature Product 6 </label>
                                        <textarea
                                            className="form-control"
                                            placeholder="input fiture product 6"
                                            onChange={e => setFiture6(e.target.value)}
                                            value={fiture6}
                                            name="fiture6"
                                            style={{ color: "white" }}
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

export default AppsMenu