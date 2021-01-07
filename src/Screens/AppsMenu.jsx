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
    const [icon, setIcon] = useState('')
    const [image, setImage] = useState('')
    const [deskripsi, setDeskripsi] = useState('')
    const [iconfiture1, setIconFiture1] = useState('')
    const [fiture1, setFiture1] = useState('')
    const [iconfiture2, setIconFiture2] = useState('')
    const [fiture2, setFiture2] = useState('')
    const [iconfiture3, setIconFiture3] = useState('')
    const [fiture3, setFiture3] = useState('')
    const [iconfiture4, setIconFiture4] = useState('')
    const [fiture4, setFiture4] = useState('')
    const [iconfiture5, setIconFiture5] = useState('')
    const [fiture5, setFiture5] = useState('')
    const [iconfiture6, setIconFiture6] = useState('')
    const [fiture6, setFiture6] = useState('')
    const Swal = withReactContent(MySwal)
    const URL_API = `http://localhost:8000`

    // Setting the data table
    const dataTableApps = apps => {
        let rowsData = []

        for (var index = 0; index < apps.length; index++) {
            let rowItem = {}
            rowItem["no"] = index + 1
            rowItem["icon"] = <img style={{ width: "100px", height: "100px", borderRadius: "0px" }} src={apps[index].icon} alt="icon" />
            rowItem["imageproduct"] = <img style={{ width: "100px", height: "100px", borderRadius: "0px" }} src={apps[index].image} alt="imageproduct" />
            rowItem["deskripsi"] = apps[index].description
            rowItem["fiture1"] = apps[index].fiture1
            rowItem["iconfiture1"] = <img style={{ width: "100px", height: "100px", borderRadius: "0px" }} src={apps[index].icon_fiture1} alt="iconfiture1" />
            rowItem["fiture2"] = apps[index].fiture2
            rowItem["iconfiture2"] = <img style={{ width: "100px", height: "100px", borderRadius: "0px" }} src={apps[index].icon_fiture2} alt="iconfiture2" />
            rowItem["fiture3"] = apps[index].fiture3
            rowItem["iconfiture3"] = <img style={{ width: "100px", height: "100px", borderRadius: "0px" }} src={apps[index].icon_fiture3} alt="iconfiture3" />
            rowItem["fiture4"] = apps[index].fiture4
            rowItem["iconfiture4"] = <img style={{ width: "100px", height: "100px", borderRadius: "0px" }} src={apps[index].icon_fiture4} alt="iconfiture4" />
            rowItem["fiture5"] = apps[index].fiture5
            rowItem["iconfiture5"] = <img style={{ width: "100px", height: "100px", borderRadius: "0px" }} src={apps[index].icon_fiture5} alt="iconfiture5" />
            rowItem["fiture6"] = apps[index].fiture6
            rowItem["iconfiture6"] = <img style={{ width: "100px", height: "100px", borderRadius: "0px" }} src={apps[index].icon_fiture6} alt="iconfiture6" />
            rowItem["action"] =
                <>
                    <button style={{ marginRight: "10px", width: "45%", height: "35px" }} data-toggle="modal" data-target="#editModal" className="btn btn-primary" type="button" id={apps[index].id} ><i className="mdi mdi-table-edit" style={{ marginRight: "10px" }} />Edit</button>
                    <button style={{ marginRight: "10px", width: "45%", height: "35px" }} className="btn btn-danger" type="button" id={apps[index].id} ><i className="mdi mdi-delete" style={{ marginRight: "10px" }} />Delete</button>
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
                    label: 'Icon Fiture 1',
                    field: 'iconfiture1',
                    sort: 'asc'
                },
                {
                    label: 'Fiture 2',
                    field: 'fiture2',
                    sort: 'asc'
                },
                {
                    label: 'Icon Fiture 2',
                    field: 'iconfiture2',
                    sort: 'asc'
                },
                {
                    label: 'Fiture 3',
                    field: 'fiture3',
                    sort: 'asc'
                },
                {
                    label: 'Icon Fiture 3',
                    field: 'iconfiture3',
                    sort: 'asc'
                },
                {
                    label: 'Fiture 4',
                    field: 'fiture4',
                    sort: 'asc'
                },
                {
                    label: 'Icon Fiture 4',
                    field: 'iconfiture4',
                    sort: 'asc'
                },
                {
                    label: 'Fiture 5',
                    field: 'fiture5',
                    sort: 'asc'
                },
                {
                    label: 'Icon Fiture 5',
                    field: 'iconfiture5',
                    sort: 'asc'
                },
                {
                    label: 'Fiture 6',
                    field: 'fiture6',
                    sort: 'asc'
                },
                {
                    label: 'Icon Fiture 6',
                    field: 'iconfiture6',
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
                    setIconFiture1('')
                    setFiture2('')
                    setIconFiture2('')
                    setFiture3('')
                    setIconFiture3('')
                    setFiture4('')
                    setIconFiture4('')
                    setFiture5('')
                    setIconFiture5('')
                    setFiture6('')
                    setIconFiture6('')
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
                    {/* Area Table Siswa */}
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
                                    <div className="form-group">
                                        <label htmlFor="exampleFormControlInput1">Product Description</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="input job position"
                                            onChange={e => setDeskripsi(e.target.value)}
                                            value={deskripsi}
                                            name="description"
                                            style={{ color: "white" }}
                                        />
                                    </div>

                                    {/* Fiture 1 */}
                                    <div className="form-group">
                                        <label htmlFor="exampleFormControlInput1">Feature Product 1</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="input fiture product 1"
                                            onChange={e => setFiture1(e.target.value)}
                                            value={fiture1}
                                            name="fiture1"
                                            style={{ color: "white" }}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="exampleFormControlFile3">Icon Feature 1</label>
                                        <input
                                            type="file"
                                            name="iconfiture1"
                                            className="form-control-file"
                                            value={iconfiture1}
                                            onChange={e => setIconFiture1(e.target.value)}
                                        />
                                    </div>

                                    {/* Fiture 2 */}
                                    <div className="form-group">
                                        <label htmlFor="exampleFormControlInput1">Feature Product 2 </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="input fiture product 2"
                                            onChange={e => setFiture2(e.target.value)}
                                            value={fiture2}
                                            name="fiture2"
                                            style={{ color: "white" }}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="exampleFormControlFile3">Icon Feature 2</label>
                                        <input
                                            type="file"
                                            name="iconfiture2"
                                            className="form-control-file"
                                            value={iconfiture2}
                                            onChange={e => setIconFiture2(e.target.value)}
                                        />
                                    </div>

                                    {/* Fiture 3 */}
                                    <div className="form-group">
                                        <label htmlFor="exampleFormControlInput1">Feature Product 3 </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="input fiture product 3"
                                            onChange={e => setFiture3(e.target.value)}
                                            value={fiture3}
                                            name="fiture3"
                                            style={{ color: "white" }}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="exampleFormControlFile3">Icon Feature 3</label>
                                        <input
                                            type="file"
                                            name="iconfiture3"
                                            className="form-control-file"
                                            value={iconfiture3}
                                            onChange={e => setIconFiture3(e.target.value)}
                                        />
                                    </div>

                                    {/* Fiture 4 */}
                                    <div className="form-group">
                                        <label htmlFor="exampleFormControlInput1">Feature Product 4 </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="input fiture product 4"
                                            onChange={e => setFiture4(e.target.value)}
                                            value={fiture4}
                                            name="fiture4"
                                            style={{ color: "white" }}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="exampleFormControlFile3">Icon Feature 4</label>
                                        <input
                                            type="file"
                                            name="iconfiture4"
                                            className="form-control-file"
                                            value={iconfiture4}
                                            onChange={e => setIconFiture4(e.target.value)}
                                        />
                                    </div>

                                    {/* Fiture 5 */}
                                    <div className="form-group">
                                        <label htmlFor="exampleFormControlInput1">Feature Product 5 </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="input fiture product 5"
                                            onChange={e => setFiture5(e.target.value)}
                                            value={fiture5}
                                            name="fiture5"
                                            style={{ color: "white" }}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="exampleFormControlFile3">Icon Feature 5</label>
                                        <input
                                            type="file"
                                            name="iconfiture5"
                                            className="form-control-file"
                                            value={iconfiture5}
                                            onChange={e => setIconFiture5(e.target.value)}
                                        />
                                    </div>

                                    {/* Fiture 6 */}
                                    <div className="form-group">
                                        <label htmlFor="exampleFormControlInput1">Feature Product 6 </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="input fiture product 6"
                                            onChange={e => setFiture6(e.target.value)}
                                            value={fiture6}
                                            name="fiture6"
                                            style={{ color: "white" }}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="exampleFormControlFile3">Icon Feature 6</label>
                                        <input
                                            type="file"
                                            name="iconfiture6"
                                            className="form-control-file"
                                            value={iconfiture6}
                                            onChange={e => setIconFiture6(e.target.value)}
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