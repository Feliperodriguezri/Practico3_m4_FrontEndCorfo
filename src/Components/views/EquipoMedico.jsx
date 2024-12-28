import React, { useState } from 'react';
import DoctorCard from '../DoctorCard';

function EquipoMedico() {
    const [filterSpecialty, setFilterSpecialty] = useState('');
    const doctors = [
        {
            name: "Dr. John Doe",
            specialty: "Cardiólogo",
            image: "https://via.placeholder.com/200x150/007bff/ffffff?text=Dr.Doe"
        },
        {
            name: "Dra. Jane Smith",
            specialty: "Pediatra",
            image: "https://via.placeholder.com/200x150/28a745/ffffff?text=Dr.Smith"
        },
        {
            name: "Dr. David Lee",
            specialty: "Dermatólogo",
            image: "https://via.placeholder.com/200x150/dc3545/ffffff?text=Dr.Lee"
        },
        {
            name: "Dra. Ana Flores",
            specialty: "Neuróloga",
            image: "https://via.placeholder.com/200x150/ffc107/000000?text=Dr.Flores"
        }
    ];

    const handleFilterChange = (event) => {
        setFilterSpecialty(event.target.value);
    };

    const filteredDoctors = filterSpecialty
        ? doctors.filter(doctor => doctor.specialty === filterSpecialty)
        : doctors;

    // Get Unique Specialties
    const uniqueSpecialties = ["Todas", ...new Set(doctors.map(doctor => doctor.specialty))];

    return (
        <div>
            <h1>Equipo Médico</h1>
            <div className="mb-3">
                <label htmlFor="specialtyFilter" className="form-label">Filtrar por Especialidad:</label>
                <select id="specialtyFilter" className="form-select" value={filterSpecialty} onChange={handleFilterChange}>
                    {uniqueSpecialties.map((specialty, index) => (
                        <option key={index} value={specialty}>
                            {specialty}
                        </option>
                    ))}
                </select>
            </div>
            <div className="row">
                {filteredDoctors.map((doctor, index) => (
                    <div key={index} className="col-md-4 mb-3">
                        <DoctorCard
                            name={doctor.name}
                            specialty={doctor.specialty}
                            image={doctor.image}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default EquipoMedico;