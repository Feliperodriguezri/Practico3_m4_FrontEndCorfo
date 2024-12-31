import React, { useRef } from 'react';
import PropTypes from 'prop-types';  // Importamos PropTypes

function Home() {
    const cardiologiaRef = useRef(null);
    const pediatriaRef = useRef(null);
    const dermatologiaRef = useRef(null);
    const neurologiaRef = useRef(null);

    const serviciosDestacados = [
        {
            titulo: "Cardiología",
            descripcion: "Diagnóstico y tratamiento de enfermedades del corazón.",
            ref: cardiologiaRef
        },
        {
            titulo: "Pediatría",
            descripcion: "Atención médica para niños y adolescentes.",
            ref: pediatriaRef
        },
        {
            titulo: "Dermatología",
            descripcion: "Diagnóstico y tratamiento de enfermedades de la piel.",
            ref: dermatologiaRef
        },
        {
            titulo: "Neurología",
            descripcion: "Diagnóstico y tratamiento de enfermedades del sistema nervioso.",
            ref: neurologiaRef
        }
    ];

    const scrollToSection = (ref) => {
        ref.current.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <div className="container">
            <h1>Bienvenido al Hospital</h1>

            <h2>Servicios Destacados</h2>
            <div className="d-flex mb-3">
                {serviciosDestacados.map((servicio, index) => (
                    <button key={index} className="btn btn-outline-primary me-2" onClick={() => scrollToSection(servicio.ref)} >
                        Ir a {servicio.titulo}
                    </button>
                ))}
            </div>

            <div className="row">
                {serviciosDestacados.map((servicio, index) => (
                    <div key={index} className="col-md-4 mb-3" ref={servicio.ref}>
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">{servicio.titulo}</h5>
                                <p className="card-text">{servicio.descripcion}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <h2>Información del Hospital</h2>
            <p>
                Somos un hospital dedicado a brindar atención médica de alta calidad a nuestra comunidad. Contamos con un equipo de profesionales comprometidos y tecnología de vanguardia para ofrecer los mejores servicios.
            </p>
        </div>
    );
}

// Definimos los PropTypes para el componente Home. Al igual que los demás, no recibe props directamente desde un componente padre.
Home.propTypes = {};

export default Home;