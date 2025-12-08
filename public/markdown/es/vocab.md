Una aplicación de escritorio integral para aprender vocabulario alemán y francés, construida con Electron, React y TypeScript. VocaB proporciona una interfaz intuitiva para administrar vocabulario, realizar un seguimiento del progreso y practicar habilidades lingüísticas a través de ejercicios interactivos.

## Visión General del Proyecto

VocaB está diseñada para hacer que la adquisición del vocabulario sea sistemática y atractiva. La aplicación cuenta con un sistema de múltiple de diccionarios. Cada entrada de palabra incluye información gramatical detallada, ejemplos de uso y explicaciones contextuales para facilitar una comprensión más profunda.

La interfaz muestra un tablero de "Palabras del Momento" que muestra recomendaciones de vocabulario diarias, recientes agregados a tu diccionario personal, y estadísticas completas de seguimiento del progreso del aprendizaje. Con 68 palabras actualmente almacenadas en ambos diccionarios, la aplicación proporciona una base sólida para construir la competencia lingüística.

## Estructura del Proyecto

La aplicación sigue una arquitectura basada en TypeScript moderna, utilizando Vite para el desarrollo rápido y la reemplazación de módulos en caliente. El marco de Electron permite la implementación de aplicaciones de escritorio multiplataforma, asegurando que la aplicación se ejecute sin problemas en Windows, macOS y Linux.

## Características Principales

### Sistema de Diccionarios Multi-Lengua

La aplicación proporciona diccionarios dedicados para alemán y francés, cada uno de ellos contiene entradas de vocabulario cuidadosamente seleccionadas. Actualmente, el diccionario alemán contiene 49 palabras mientras que el diccionario francés contiene 19 palabras, formando un repositorio creciente de vocabulario esencial.

Cada entrada del diccionario se enriquece con información lingüística detallada:

- **Parte del Discurso**: Clasificación clara (verbo, nombre, adjetivo, etc.)
- **Género Gramatical**: Marcadores de género masculino/femenino para nombres
- **Indicadores de Número**: Información singular/plural
- **Traducciones al Español**: Equivalentes directos en español
- **Definiciones Detalladas**: Explicaciones contextuales en español
- **Ejemplos de Uso**: Ejemplos de oraciones reales con traducciones
- **Notas de Gramática**: Patrones de conjugación, declensiones y casos especiales

### Característica de la Palabra del Día

La aplicación destaca vocabulario destacado a través del sistema de "La Palabra del Día", que actualmente muestra:

**Alemán**: *Stuhl* (Silla/Chair)
- **Tipo**: nombre, masculino, singular
- **Definición**: "Asiento individual con respaldo, generalmente con cuatro patas"
- **Fecha Agregada**: 7 de diciembre de 2025

**Francés**: *Architecte* (Arquitecto/Doctor)  
- **Tipo**: nombre, masculino, singular
- **Definición**: "Profesional que diseña edificios y dirige su construcción"
- **Fecha Agregada**: 7 de diciembre de 2025

Este sistema de rotación anima al usuario a interactuar diariamente con nuevo vocabulario, lo que hace que el aprendizaje sea una costumbre consistente.

### Seguimiento Reciente del Vocabulario

La interfaz muestra palabras recientemente agregadas para una referencia rápida y revisión:

**Agregaciones Recientes en Alemán**:
- **Essen** (Comer/To eat) - verbo: "Ingerir alimentos"
- **Trinken** (Beber/To drink) - verbo: "Ingerir líquidos"
- **Spielen** (Jugar/To play) - verbo: "Realizar una actividad recreativa o de entretenimiento"

**Agregaciones Recientes en Francés**:
- **Professeur** (Profesor, Maestro/Teacher) - nombre: "Persona que se dedica profesionalmente a la enseñanza"
- **Médecin** (Médico, Doctor/Doctor) - nombre: "Profesional de la medicina que diagnostica y trata enfermedades"

### Arquitectura del Frontend

La aplicación utiliza patrones de React modernos y TypeScript para seguridad de tipo:

**React 18**: Utiliza las características más recientes de React, incluyendo rendering concurrente, empaquetado automático y mejoras en la renderización del lado del servidor. La arquitectura de los componentes sigue un diseño modular, lo que hace que la base de código sea mantenible y escalable.

**TypeScript**: Proporciona verificación de tipo en tiempo de compilación, reduciendo errores en tiempo de ejecución y mejorando la experiencia del desarrollador. Todos los componentes, utilidades y estructuras de datos están completamente tipificados, lo que asegura consistencia en toda la aplicación.

**Vite**: Proporciona reemplazación de módulos en caliente durante el desarrollo, con tiempos de compilación significativamente más rápidos que los tradicionales empaquetadores. El servidor de desarrollo se inicia instantáneamente, y los cambios reflejan en milisegundos.

**Tailwind CSS**: Implementa un enfoque de diseño de utilidad en primer lugar para el desarrollo de UI rápido. La configuración se integra perfectamente con la biblioteca de componentes, lo que asegura tokens de diseño consistentes en toda la aplicación.

**shadcn/ui**: Proporciona una colección de componentes de UI de alta calidad, accesibles y construidos sobre primitivos de Radix UI. Estos componentes son personalizables y siguen patrones de diseño modernos, lo que asegura una experiencia del usuario pulida.

### Capa de la Aplicación de Escritorio

**Electron Framework**: Envuelve la aplicación de React en un contenedor de escritorio nativo, proporcionando acceso a APIs de sistema mientras que mantiene las ventajas de la tecnología web. El proceso principal maneja operaciones de sistema de archivos, gestión de ventanas y comunicación entre procesos.

**electron-builder**: Maneja el proceso de empaquetado y distribución, generando instaladores para Windows (.exe), macOS (.dmg) y Linux (.AppImage/.deb) a partir de una sola base de código.

<div style="background-color: black; display: flex; align-items: center; justify-content: center;">
  <video controls width="100%" ><source src="/source/vocab.mp4"></video>
</div>

