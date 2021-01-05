/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable jsx-a11y/alt-text */
import React, {
    useState,
    useEffect
} from 'react';
import ReactPaginate from 'react-paginate';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const Dashboard = () => {
    const [contact, setContact] = useState('')
    const [loading, setLoading] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)
    const [pageCount, setPageCount] = useState(1)
    const URL_API = `http://localhost:8000`
    const MySwal = withReactContent(Swal)

    const fetchContact = async () => {
        try {
            const data = await fetch(`${URL_API}/contact?page=${currentPage}`, {
                method: 'GET'
            })
            const datacontact = await data.json()
            console.log(datacontact)
            if (datacontact.success) {
                setContact(datacontact.result.data)
                setPageCount(datacontact.from)
                setLoading(true)
            }
        } catch (error) {
            console.log(error)
            alert(error)
        }
    }

    useEffect(() => {
        fetchContact()
    }, [])

    if (loading) {
        MySwal.close()
        return (
            <>
                <div className="page-header">
                    <h3 className="page-title"> Dashboard </h3>
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item active" aria-current="page">Dashboard</li>
                        </ol>
                    </nav>
                </div>
                <div className="row">
                    <div className="col-xl-3 col-sm-6 grid-margin stretch-card">
                        <div className="card">
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-9">
                                        <div className="d-flex align-items-center align-self-start">
                                            <h3 className="text-success mb-0">5</h3>
                                        </div>
                                    </div>
                                    <div className="col-3">
                                        <div className="icon icon-box-success ">
                                            <span className="mdi mdi-apps icon-item" />
                                        </div>
                                    </div>
                                </div>
                                <h6 className="text-muted font-weight-normal">Application Product</h6>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-3 col-sm-6 grid-margin stretch-card">
                        <div className="card">
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-9">
                                        <div className="d-flex align-items-center align-self-start">
                                            <h3 className="mb-0">$17.34</h3>
                                            <p className="text-success ml-2 mb-0 font-weight-medium">+11%</p>
                                        </div>
                                    </div>
                                    <div className="col-3">
                                        <div className="icon icon-box-success">
                                            <span className="mdi mdi-arrow-top-right icon-item" />
                                        </div>
                                    </div>
                                </div>
                                <h6 className="text-muted font-weight-normal">Revenue current</h6>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-3 col-sm-6 grid-margin stretch-card">
                        <div className="card">
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-9">
                                        <div className="d-flex align-items-center align-self-start">
                                            <h3 className="mb-0">$12.34</h3>
                                            <p className="text-danger ml-2 mb-0 font-weight-medium">-2.4%</p>
                                        </div>
                                    </div>
                                    <div className="col-3">
                                        <div className="icon icon-box-danger">
                                            <span className="mdi mdi-arrow-bottom-left icon-item" />
                                        </div>
                                    </div>
                                </div>
                                <h6 className="text-muted font-weight-normal">Daily Income</h6>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-3 col-sm-6 grid-margin stretch-card">
                        <div className="card">
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-9">
                                        <div className="d-flex align-items-center align-self-start">
                                            <h3 className="mb-0">$31.53</h3>
                                            <p className="text-success ml-2 mb-0 font-weight-medium">+3.5%</p>
                                        </div>
                                    </div>
                                    <div className="col-3">
                                        <div className="icon icon-box-success ">
                                            <span className="mdi mdi-arrow-top-right icon-item" />
                                        </div>
                                    </div>
                                </div>
                                <h6 className="text-muted font-weight-normal">Expense current</h6>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12 grid-margin stretch-card">
                        <div className="card">
                            <div className="card-body">
                                <div className="d-flex flex-row justify-content-between">
                                    <h4 className="card-title mb-1">People Who Contact Us</h4>
                                    <p className="breadcrumb-item mb-1"><a href="/contactmenu">See Detail...</a></p>
                                </div>
                                <div className="row">
                                    {
                                        contact.map((item) => {
                                            return (
                                                <div className="col-12">
                                                    <div className="preview-list">
                                                        <div className="preview-item border-bottom">
                                                            <div className="preview-thumbnail">
                                                                <div className="preview-icon bg-primary">
                                                                    <i className="mdi mdi-message" />
                                                                </div>
                                                            </div>
                                                            <div className="preview-item-content d-sm-flex flex-grow">
                                                                <div className="flex-grow">
                                                                    <h6 className="preview-subject">{item.email}</h6>
                                                                    <p className="text-muted mb-0">{item.message}</p>
                                                                </div>
                                                                <div className="mr-auto text-sm-right pt-2 pt-sm-0">
                                                                    <p className="text-muted">15 minutes ago</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    } else {
        MySwal.fire({
            title: 'Loading...',
            didOpen: () => {
                MySwal.showLoading()
            },
        })
    }
    return (
        <p></p>
    )
}

export default Dashboard