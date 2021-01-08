/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable jsx-a11y/alt-text */
import React, {
    useState,
    useEffect
} from 'react';
import ReactPaginate from 'react-paginate';
import CountUp from 'react-countup';
import MySwal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const Dashboard = () => {
    const [contact, setContact] = useState('')
    const [pageCount, setPageCount] = useState(0)
    const [loading, setLoading] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)
    const [jumlahContact, setJumlahContact] = useState(0)
    const [jumlahJob, setJumlahJob] = useState(0)
    const [jumlahProduct, setJumlahProduct] = useState(0)
    const Swal = withReactContent(MySwal)
    const URL_API = `http://localhost:8000`

    useEffect(() => {
        if (currentPage) {
            fetchContact().then(() => {
                setLoading(true)
            })
        }
    }, [currentPage])

    const fetchContact = async () => {
        try {
            const data = await fetch(`${URL_API}/contact?page=${currentPage}`, {
                method: 'GET'
            })
            const datacontact = await data.json()
            if (datacontact.success) {
                setPageCount(datacontact.from)
                setContact(datacontact.result.data)
            }
        } catch (error) {
            console.log(error)
            alert(error)
        }
    }

    const handlePageChange = (selectedObject) => {
        setCurrentPage(selectedObject.selected + 1)
        fetchContact()
    }

    const getAmountContact = async () => {
        const datacontact = await fetch(`${URL_API}/contact/count`, {
            method: 'GET'
        })
        const contact = await datacontact.json()
        setJumlahContact(contact.result)
    }

    const getAmountJob = async () => {
        const datajob = await fetch(`${URL_API}/job`, {
            method: 'GET'
        })
        const job = await datajob.json()
        setJumlahJob(job.result.length)
    }

    const getAmoutApps = async () => {
        const dataapps = await fetch(`${URL_API}/product`, {
            method: 'GET'
        })
        const apps = await dataapps.json()
        setJumlahProduct(apps.result.length)
    }

    useEffect(() => {
        getAmountContact()
            .then(() => {
                getAmountJob()
            }).then(() => {
                getAmoutApps()
            })
    }, [])


    if (loading) {
        Swal.close()
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
                                            <h3 className="text-success mb-0"><CountUp end={jumlahProduct} duration={5} /></h3>
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
                                            <h3 className="text-primary mb-0"><CountUp end={jumlahContact} duration={5} /></h3>
                                        </div>
                                    </div>
                                    <div className="col-3">
                                        <div className="icon icon-box-primary">
                                            <span className="mdi mdi-wechat icon-item" />
                                        </div>
                                    </div>
                                </div>
                                <h6 className="text-muted font-weight-normal">Contact Message</h6>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-3 col-sm-6 grid-margin stretch-card">
                        <div className="card">
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-9">
                                        <div className="d-flex align-items-center align-self-start">
                                            <h3 className="text-warning mb-0"><CountUp end={jumlahJob} duration={5} /></h3>
                                        </div>
                                    </div>
                                    <div className="col-3">
                                        <div className="icon icon-box-warning">
                                            <span className="mdi mdi-briefcase icon-item" />
                                        </div>
                                    </div>
                                </div>
                                <h6 className="text-muted font-weight-normal">Available Work</h6>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-3 col-sm-6 grid-margin stretch-card">
                        <div className="card">
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-9">
                                        <div className="d-flex align-items-center align-self-start">
                                            <h3 className="text-danger mb-0">11</h3>
                                        </div>
                                    </div>
                                    <div className="col-3">
                                        <div className="icon icon-box-danger ">
                                            <span className="mdi mdi-radio icon-item" />
                                        </div>
                                    </div>
                                </div>
                                <h6 className="text-muted font-weight-normal">Radio Channel</h6>
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
                                    {contact.length > 0 &&
                                        contact.map((item) => {
                                            return (
                                                <div className="col-12" key={item.id}>
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
                                                                    <p className="text-muted">{item.created_at.slice(0, 19).replace('T', ' ')}</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }
                                    {contact.length === 0 &&
                                        <div style={{ marginTop: "7%", marginBottom: "4%", marginLeft: "40%" }}>No One People Contact Us</div>
                                    }
                                </div>
                            </div>
                            {loading ? (
                                <ReactPaginate
                                    pageCount={pageCount}
                                    onPageChange={handlePageChange}
                                    containerClassName={'paginate'}
                                    previousLinkClassName={'previous'}
                                    breakClassName={'break'}
                                    nextLinkClassName={'next'}
                                    pageClassName={'page'}
                                    disabledClassName={'disabled'}
                                    activeClassName={'activepaginate'}
                                />
                            ) : (
                                    <div></div>
                                )}
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

export default Dashboard