/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {
    useState,
    useEffect
} from 'react';
import MySwal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { MDBDataTable } from 'mdbreact';

const CareerMenu = () => {
    const [tableJob, setTableJob] = useState('')
    const [idJob, setIdJob] = useState('')
    const [jobposition, setJobPosition] = useState('')
    const [joblocation, setJobLocation] = useState('')
    const [jobdescription, setJobDescription] = useState('')
    const [joblink, setJobLink] = useState('')
    const [loading, setLoading] = useState(false)
    const Swal = withReactContent(MySwal)
    const URL_API = `http://localhost:8000`

    const fetchJob = async () => {
        try {
            const fetchApiJob = await fetch(`${URL_API}/job`, {
                method: 'GET',
            })
            const jobdata = await fetchApiJob.json()
            dataTableJob(jobdata.result)
        } catch (error) {
            console.log('error')
            alert(error)
        }
    }

    useEffect(() => {
        fetchJob().then(() => {
            setLoading(true)
        });
    }, [])

    // Setting the data table
    const dataTableJob = job => {
        let rowsData = []

        for (var index = 0; index < job.length; index++) {
            let rowItem = {}
            rowItem["no"] = index + 1
            rowItem["job_position"] = job[index].job_position
            rowItem["job_location"] = job[index].job_location
            rowItem["job_description"] = job[index].job_description
            rowItem["job_link"] = job[index].job_link
            rowItem["action"] =
                <>
                    <button style={{ marginRight: "10px", width: "45%", height: "35px" }} onClick={event => getIdJob(event)} data-toggle="modal" data-target="#editModal" className="btn btn-primary" type="button" id={job[index].id} ><i className="mdi mdi-table-edit" style={{ marginRight: "10px" }} />Edit</button>
                    <button onClick={e => deleteJob(e)} style={{ marginRight: "10px", width: "45%", height: "35px" }} className="btn btn-danger" type="button" id={job[index].id} ><i className="mdi mdi-delete" style={{ marginRight: "10px" }} />Delete</button>
                </>
            rowsData.push(rowItem)
        }
        setTableJob(rowsData)
    }

    // Data job
    const dataJob = (data) => {
        return {
            columns: [
                {
                    label: 'No',
                    field: 'no',
                    sort: 'asc'
                },
                {
                    label: 'Job Position',
                    field: 'job_position',
                    sort: 'asc'
                },
                {
                    label: 'Job Location',
                    field: 'job_location',
                    sort: 'asc'
                },
                {
                    label: 'Job Description',
                    field: 'job_description',
                    sort: 'asc'
                },
                {
                    label: 'Job Link',
                    field: 'job_link',
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

    // handle submit add job
    const handleSubmit = async e => {
        e.preventDefault();
        try {
            const fetchApi = await fetch(`${URL_API}/job/store`, {
                method: 'POST',
                body: JSON.stringify({
                    jobposition,
                    jobdescription,
                    joblocation,
                    joblink
                }),
                headers: { 'Content-Type': 'application/json' }
            })
            const create = await fetchApi.json()
            console.log(create)
            if (create.success) {
                Swal.fire({
                    icon: 'success',
                    title: 'Succes Add Data Job',
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
                    setJobPosition('')
                    setJobLocation('')
                    setJobDescription('')
                    setJobLink('')
                    fetchJob().then(() => {
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

    // Get id job
    const getIdJob = async e => {
        try {
            const data = await fetch(`${URL_API}/job/get/${e.target.id}`, {
                method: 'GET'
            })
            const result = await data.json()
            setIdJob(result.data.id)
            setJobPosition(result.data.job_position)
            setJobLocation(result.data.job_location)
            setJobDescription(result.data.job_description)
            setJobLink(result.data.job_link)
        } catch (error) {
            console.log(error)
        }
    }

    const handleEdit = async e => {
        e.preventDefault();
        try {
            const updateJob = await fetch(`${URL_API}/job/update/${idJob}`, {
                method: 'PUT',
                body: JSON.stringify({
                    jobposition,
                    jobdescription,
                    joblocation,
                    joblink
                }),
                headers: { 'Content-Type': 'application/json' },
            })
            const update = await updateJob.json()
            if (update.success) {
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
                    setJobPosition('')
                    setJobLocation('')
                    setJobDescription('')
                    setJobLink('')
                    fetchJob().then(() => {
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
            console.log(error)
        }
    }

    // Delete job
    const deleteJob = (e) => {
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
                    'Data job has been deleted.',
                    'success'
                ).then(async () => {
                    try {
                        const careerDelete = await fetch(`${URL_API}/job/delete/${id}`, {
                            method: 'DELETE'
                        })
                        await careerDelete
                    } catch (error) {
                        console.log(error)
                    }
                }).then(function () {
                    fetchJob().then(() => {
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
                    <h3 className="page-title"> Career Menu </h3>
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><a href="dashboard">Dashboard</a></li>
                            <li className="breadcrumb-item active" aria-current="page">Career Menu</li>
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
                                <h6 className="m-0 font-weight-bold text-primary">Data Job Hiring</h6>
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
                                    data={dataJob(tableJob)}
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
                                        <label htmlFor="exampleFormControlInput1">Job Position</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="exampleFormControlInput1"
                                            placeholder="input job position"
                                            onChange={e => setJobPosition(e.target.value)}
                                            value={jobposition}
                                            name="jobposition"
                                            style={{ color: "white" }}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="exampleFormControlInput2">Job Location</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="exampleFormControlInput2"
                                            placeholder="input job location"
                                            onChange={e => setJobLocation(e.target.value)}
                                            value={joblocation}
                                            name="joblocation"
                                            style={{ color: "white" }}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="exampleFormControlInput3">Job Description</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="exampleFormControlInput3"
                                            placeholder="input job description"
                                            onChange={e => setJobDescription(e.target.value)}
                                            value={jobdescription}
                                            name="jobdescription"
                                            style={{ color: "white" }}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="exampleFormControlInput4">Job Link</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="exampleFormControlInput4"
                                            placeholder="input job link"
                                            onChange={e => setJobLink(e.target.value)}
                                            value={joblink}
                                            name="joblink"
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
                                    <div className="form-group">
                                        <label htmlFor="exampleFormControlInput1">Job Position</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="exampleFormControlInput1"
                                            placeholder="input job position"
                                            onChange={e => setJobPosition(e.target.value)}
                                            value={jobposition}
                                            name="jobposition"
                                            style={{ color: "white" }}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="exampleFormControlInput2">Job Location</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="exampleFormControlInput2"
                                            placeholder="input job location"
                                            onChange={e => setJobLocation(e.target.value)}
                                            value={joblocation}
                                            name="joblocation"
                                            style={{ color: "white" }}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="exampleFormControlInput3">Job Description</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="exampleFormControlInput3"
                                            placeholder="input job description"
                                            onChange={e => setJobDescription(e.target.value)}
                                            value={jobdescription}
                                            name="jobdescription"
                                            style={{ color: "white" }}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="exampleFormControlInput4">Job Link</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="exampleFormControlInput4"
                                            placeholder="input job link"
                                            onChange={e => setJobLink(e.target.value)}
                                            value={joblink}
                                            name="joblink"
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

export default CareerMenu