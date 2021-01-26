import React, {
    useState,
    useEffect
} from 'react';
import MySwal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { MDBDataTable } from 'mdbreact';

const ContactMenu = () => {
    const [tableContact, setTableContact] = useState('')
    const [loading, setLoading] = useState(false)
    const Swal = withReactContent(MySwal)
    const URL_API = `http://localhost:8000`

    useEffect(() => {
        fetchContact().then(() => {
            setLoading(true)
        })
    }, [])

    const fetchContact = async () => {
        try {
            const fetchApiContact = await fetch(`${URL_API}/contact/all`, {
                method: 'GET'
            })
            const contactdata = await fetchApiContact.json()
            dataTableContact(contactdata.result)
            console.log(contactdata.result)
        } catch (error) {
            console.log(error)
            alert(error)
        }
    }

    // Setting the data table
    const dataTableContact = contact => {
        let rowsData = []

        for (var index = 0; index < contact.length; index++) {
            let rowItem = {}
            rowItem["no"] = index + 1
            rowItem["name"] = contact[index].name
            rowItem["email"] = contact[index].email
            rowItem["message_user"] = contact[index].message
            rowItem["created_at"] = contact[index].created_at.slice(0, 19).replace('T', ' ')
            rowItem["action"] =
                <>
                    <button onClick={deleteContact} style={{ marginRight: "10px", width: "85%", height: "35px" }} className="btn btn-danger" type="button" id={contact[index].id} ><i className="mdi mdi-delete" style={{ marginRight: "5px" }} />Delete</button>
                </>
            rowsData.push(rowItem)
            console.log(rowItem)
        }
        setTableContact(rowsData)
    }

    // Data contact
    const dataContact = (data) => {
        return {
            columns: [
                {
                    label: 'No',
                    field: 'no',
                    sort: 'asc'
                },
                {
                    label: 'Name',
                    field: 'name',
                    sort: 'asc'
                },
                {
                    label: 'Email',
                    field: 'email',
                    sort: 'asc'
                },
                {
                    label: 'Message',
                    field: 'message_user',
                    sort: 'asc'
                },
                {
                    label: 'Created At',
                    field: 'created_at',
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

    // Delete contact
    const deleteContact = (e) => {
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
                    'Data Siswa has been deleted.',
                    'success'
                ).then(async () => {
                    try {
                        const contactDelete = await fetch(`${URL_API}/contact/delete/${id}`, {
                            method: 'DELETE'
                        })
                        await contactDelete
                    } catch (error) {
                        console.log(error)
                    }
                }).then(function () {
                    fetchContact().then(() => {
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
                    <h3 className="page-title"> Contact Menu </h3>
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><a href="dashboard">Dashboard</a></li>
                            <li className="breadcrumb-item active" aria-current="page">Contact Menu</li>
                        </ol>
                    </nav>
                </div>
                {/* content */}
                <div className="row" style={{ marginBottom: "125px" }}>
                    {/* Area Table Contact */}
                    <div className="col-xl-12 col-lg-12">
                        <div className="card shadow mb-4">
                            {/* Card Header - Dropdown */}
                            <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                                <h6 className="m-0 font-weight-bold text-primary">Data Contact</h6>
                            </div>
                            {/* Card Body */}
                            <div className="card-body">
                                <MDBDataTable
                                    style={{ color: "white" }}
                                    sortable={false}
                                    striped
                                    data={dataContact(tableContact)}
                                    responsive={true}
                                    noBottomColumns={true}
                                />
                            </div>
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

export default ContactMenu