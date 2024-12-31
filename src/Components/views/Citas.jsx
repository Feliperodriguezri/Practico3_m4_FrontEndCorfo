import React, { useState, useEffect, useRef, useMemo } from 'react';
import PropTypes from 'prop-types'; // Importamos PropTypes
import fetchData from '../../api';

function Citas() {
    const [nombre, setNombre] = useState('');
    const [fecha, setFecha] = useState('');
    const [hora, setHora] = useState('');
    const [especialidad, setEspecialidad] = useState('');
    const [medico, setMedico] = useState('');
    const [errors, setErrors] = useState({});
    const [medicosPorEspecialidad, setMedicosPorEspecialidad] = useState({});
    const [servicios, setServicios] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const nombreInputRef = useRef(null);

    useEffect(() => {
        const loadData = async () => {
            setLoading(true);
            setError(null);
            try {
                const equipoMedicoData = await fetchData('equipoMedico');
                const serviciosData = await fetchData('servicios');

                // Optimización: Preprocesar doctores en un mapa por especialidad
                const doctorsBySpecialityMap = equipoMedicoData.reduce((acc, doctor) => {
                    acc[doctor.especialidad] = acc[doctor.especialidad] || [];
                    acc[doctor.especialidad].push(doctor.nombre);
                    return acc;
                }, {});

                const medicosMap = {};
                serviciosData.forEach(servicio => {
                    medicosMap[servicio.nombre] = doctorsBySpecialityMap[servicio.nombre] || [];
                });

                setMedicosPorEspecialidad(medicosMap);
                setServicios(serviciosData);

            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        loadData();

        if (nombreInputRef.current) {
            nombreInputRef.current.focus();
        }
    }, []);



    const validateForm = () => {
        let newErrors = {};
        if (!nombre) newErrors.nombre = 'El nombre es requerido';
        if (!fecha) newErrors.fecha = 'La fecha es requerida';
        if (!hora) {
            newErrors.hora = 'La hora es requerida';
        } else if (!/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/.test(hora)) {
            newErrors.hora = 'Formato de hora inválido (HH:MM)';
        }
        if (!especialidad) newErrors.especialidad = 'La especialidad es requerida';
        if (!medico) newErrors.medico = 'El médico es requerido';


        if (fecha) {
            const selectedDate = new Date(fecha);
            const today = new Date();
            today.setHours(0, 0, 0, 0);

            if (selectedDate < today) {
                newErrors.fecha = 'La fecha no puede ser anterior a hoy.';
            }
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (validateForm()) {
            console.log('Formulario válido:', { nombre, fecha, hora, especialidad, medico });
            alert('Cita agendada exitosamente!');
            setNombre('');
            setFecha('');
            setHora('');
            setEspecialidad('');
            setMedico('');
            setErrors({});
        } else {
            console.log('Formulario inválido, revisa los errores.');
        }
    };

    const handleEspecialidadChange = (event) => {
        setEspecialidad(event.target.value);
        setMedico('');
    }

    const medicosOptions = useMemo(() => {
        return medicosPorEspecialidad[especialidad]?.map((med, index) => (
            <option key={index} value={med}>{med}</option>
        ));
    }, [medicosPorEspecialidad, especialidad]);


    if (loading) {
        return <p>Cargando formulario de citas...</p>
    }
    if (error) {
        return <p>Error al cargar formulario de citas: {error.message}</p>
    }


    return (
        <div className="container">
            <h1>Agendar Cita</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="nombre" className="form-label">Nombre del Paciente:</label>
                    <input
                        type="text"
                        id="nombre"
                        className={`form-control ${errors.nombre ? 'is-invalid' : ''}`}
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                        ref={nombreInputRef}
                    />
                    {errors.nombre && <div className="invalid-feedback">{errors.nombre}</div>}
                </div>
                <div className="mb-3">
                    <label htmlFor="fecha" className="form-label">Fecha de la Cita:</label>
                    <input
                        type="date"
                        id="fecha"
                        className={`form-control ${errors.fecha ? 'is-invalid' : ''}`}
                        value={fecha}
                        onChange={(e) => setFecha(e.target.value)}
                    />
                    {errors.fecha && <div className="invalid-feedback">{errors.fecha}</div>}
                </div>
                <div className="mb-3">
                    <label htmlFor="hora" className="form-label">Hora de la Cita:</label>
                    <input
                        type="text"
                        id="hora"
                        className={`form-control ${errors.hora ? 'is-invalid' : ''}`}
                        value={hora}
                        onChange={(e) => setHora(e.target.value)}
                        placeholder="HH:MM"
                    />
                    {errors.hora && <div className="invalid-feedback">{errors.hora}</div>}
                </div>
                <div className="mb-3">
                    <label htmlFor="especialidad" className="form-label">Especialidad:</label>
                    <select
                        id="especialidad"
                        className={`form-select ${errors.especialidad ? 'is-invalid' : ''}`}
                        value={especialidad}
                        onChange={handleEspecialidadChange}
                    >
                        <option value="">Selecciona una especialidad</option>
                        {servicios.map((esp, index) => (
                            <option key={index} value={esp.nombre}>{esp.nombre}</option>
                        ))}
                    </select>
                    {errors.especialidad && <div className="invalid-feedback">{errors.especialidad}</div>}
                </div>

                <div className="mb-3">
                    <label htmlFor="medico" className="form-label">Médico:</label>
                    <select
                        id="medico"
                        className={`form-select ${errors.medico ? 'is-invalid' : ''}`}
                        value={medico}
                        onChange={(e) => setMedico(e.target.value)}
                        disabled={!especialidad}
                    >
                        <option value="">Selecciona un médico</option>
                        {medicosOptions}
                    </select>
                    {errors.medico && <div className="invalid-feedback">{errors.medico}</div>}
                </div>

                <button type="submit" className="btn btn-primary">Agendar Cita</button>
            </form>
        </div>
    );
}

// Definimos los PropTypes para el componente Citas. En este caso, el componente no recibe props del padre, entonces esta definición está vacía.
Citas.propTypes = {};


export default Citas;