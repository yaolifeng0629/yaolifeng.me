import React from 'react';
import './loading.css';

export default function Loading() {
    return <div className='min-h-[calc(100vh-190px)] flex justify-center items-center'>
        <div className="cssload-container">
            <ul className="cssload-flex-container">
                <li>
                    <span className="cssload-loading cssload-one"></span>
                    <span className="cssload-loading cssload-two"></span>
                    <span className="cssload-loading-center"></span>
                </li>
            </ul>
        </div>
    </div >
}
