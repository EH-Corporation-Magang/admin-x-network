/* eslint-disable react/jsx-no-target-blank */
import React from 'react';

function Footer() {
    return (
        <>
            <footer className="footer">
                <div className="d-sm-flex justify-content-center justify-content-sm-between">
                    <span className="text-muted d-block text-center text-sm-left d-sm-inline-block">
                        Copyright © xnetwork.id {(new Date().getFullYear())}
                    </span>
                </div>
            </footer>
        </>
    )
}

export default Footer