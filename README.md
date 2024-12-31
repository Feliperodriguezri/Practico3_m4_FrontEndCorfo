

nombre: Felipe Rodriguez
curso: frond end Corfo grupo 1
Practico 3 modulo 4

## Estructura del Proyecto

La aplicación está estructurada con los siguientes componentes principales:

-   `App.jsx`: Componente principal de la aplicación que configura el enrutamiento.
-   `components/`:
    -   `DoctorCard.jsx`: Componente para mostrar perfiles de médicos.
    -   `Navbar.jsx`: Barra de navegación para moverse entre las diferentes vistas.
    -   `views/`: Contiene las vistas principales de la aplicación.
        -   `Home.jsx`: Vista principal que muestra información del hospital y servicios.
        -   `EquipoMedico.jsx`: Vista para mostrar y filtrar perfiles del equipo médico.
        -   `Citas.jsx`: Vista para programar citas con validaciones de formulario.
-   `api.js`: Simula llamadas a la API para obtener datos (utilizando archivos json locales).
-   `data.json`: Contiene datos simulados para el equipo médico y servicios.
-  `servicios.json`: Contiene datos simulados de los servicios ofrecidos.

## Detalles de la Implementación

Esta aplicación cumple con los siguientes requisitos:

### 1. Implementación de Vistas Complejas con ReactJS

-   **Vista Principal (Home) (`Home.jsx`):** Muestra los servicios destacados e información del hospital, utiliza refs para un desplazamiento suave.
-   **Vista del Equipo Médico (`EquipoMedico.jsx`):** Muestra perfiles de médicos obtenidos a través de una llamada a la API, utiliza el componente `DoctorCard`, y permite filtrar por especialidad.
-   **Vista de Citas (`Citas.jsx`):** Implementa un formulario para reservar citas, con validaciones de entrada y enfocando el campo de nombre al montar el componente.

### 2. Optimización del DOM Virtual y Uso de Fragmentos

-   **DOM Virtual:** Se utiliza el DOM virtual de React para asegurar actualizaciones eficientes, actualizando solo los componentes modificados.
-   **Fragmentos:** Se usan `<React.Fragment>` (o la forma abreviada `<>`) en componentes como `Navbar` para agrupar elementos sin añadir nodos innecesarios al árbol DOM.

### 3. Uso de Referencias y Callbacks

-   **Referencias:** `useRef` se usa en `Citas.jsx` para enfocar el campo del nombre al montar el componente.
-   **Referencias de Callback:** `useRef` se usa en `Home.jsx` para gestionar el desplazamiento a diferentes secciones de servicio utilizando `scrollIntoView`.

### 4. Manejo de Datos con API REST Simulada

-   **Simulación de API REST:** Los datos del equipo médico y los servicios se obtienen de archivos de datos JSON utilizando una función `fetchData` simulada en `api.js`.
-   **Carga Asíncrona de Datos:** Se utiliza `async/await` en `EquipoMedico.jsx` y `Citas.jsx` para manejar la carga de datos de forma asíncrona, utilizando el Hook `useEffect` para disparar las búsquedas de datos cuando el componente se monta.

### 5. Optimización del Rendimiento y Uso del Profiler

-  **Optimización del Rendimiento:** El uso de `useMemo` en `Citas.jsx` evita renderizados innecesarios de las opciones del médico cuando se actualiza la especialidad. El DOM virtual de React y las prácticas eficientes de manejo de estado contribuyen al rendimiento.
-   **Uso del Profiler:** Este proyecto está diseñado para usarse junto con el React Profiler para el análisis del rendimiento.

### 6. Comprobación de Tipos con PropTypes

-   **PropTypes:** Cada componente (ej., `Navbar.jsx`, `DoctorCard.jsx`, `Home.jsx`, `EquipoMedico.jsx`, `Citas.jsx`) utiliza PropTypes para definir los tipos de props esperados y proporcionar errores en tiempo de ejecución en caso de que se pasen props incorrectas, asegurando la validez de los datos en toda la aplicación.

## Cómo Ejecutar la Aplicación

1.  Asegúrate de tener Node.js y npm (o yarn) instalados.
2.  Clona el repositorio.
3.  Navega al directorio del proyecto en tu terminal.
4.  Instala las dependencias utilizando `npm install` o `yarn install`.
5.  Inicia el servidor de desarrollo con `npm run dev` o `yarn start`.
6.  Abre tu navegador y navega en localhost

