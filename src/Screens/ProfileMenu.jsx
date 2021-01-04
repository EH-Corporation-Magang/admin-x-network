import React from 'react';

const ProfileMenu = () => {
    return (
        <>
            <div className="page-header">
                <h3 className="page-title"> Profile </h3>
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><a href="dashboard">Dashboard</a></li>
                        <li className="breadcrumb-item active" aria-current="page">Profile Menu</li>
                    </ol>
                </nav>
            </div>
            <div className="row">
                <div className="col-md-6 grid-margin stretch-card">
                    <img src={localStorage.getItem('gambaruser')} alt="foto_user" style={{ width: "73%", borderRadius: "5%", marginLeft: "14%" }} />
                </div>
                <div className="col">
                    <div className="card" style={{ marginLeft: "-9%", marginRight: "13%" }}>
                        <div className="card-body">
                            <h4 className="card-title">Data Profile</h4>
                            <form className="forms-sample">
                                <div className="form-group">
                                    <label htmlFor="exampleInputUsername1">Username</label>
                                    <input type="text" className="form-control" id="exampleInputUsername1" placeholder="Username" style={{ color: "white" }} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="exampleInputEmail1">Email address</label>
                                    <input type="email" className="form-control" id="exampleInputEmail1" placeholder="Email" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="exampleInputPassword1">Password</label>
                                    <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" />
                                </div>
                                <div className="form-group mb-4">
                                    <label htmlFor="exampleFormControlFile1">Image User</label>
                                    <input
                                        type="file"
                                        name="gambar_user"
                                        className="form-control-file"
                                        id="exampleFormControlFile1"
                                    />
                                </div>
                                <button type="submit" className="btn btn-primary mr-2">Edit</button>
                            </form>
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}

export default ProfileMenu