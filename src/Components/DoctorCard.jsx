import React from 'react';

function DoctorCard({ name, specialty, image }) {
    return (
        <div className="card" style={{ width: "18rem" }}>
            <img src={image} className="card-img-top" alt={`Dr. ${name}`} />
            <div className="card-body">
                <h5 className="card-title">{name}</h5>
                <p className="card-text">{specialty}</p>
            </div>
        </div>
    );
}

export default DoctorCard;