/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable jsx-a11y/alt-text */
import React from 'react';

const Dashboard = () => {
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
                                        <h3 className="mb-0">$12.34</h3>
                                        <p className="text-success ml-2 mb-0 font-weight-medium">+3.5%</p>
                                    </div>
                                </div>
                                <div className="col-3">
                                    <div className="icon icon-box-success ">
                                        <span className="mdi mdi-arrow-top-right icon-item" />
                                    </div>
                                </div>
                            </div>
                            <h6 className="text-muted font-weight-normal">Potential growth</h6>
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
        </>
    )
}

export default Dashboard