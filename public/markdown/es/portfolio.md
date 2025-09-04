Construir un portafolio es algo que eventualmente todos los desarrolladores deben enfrentar. Para mí, fue más que solo una forma de mostrar mi trabajo — fue una oportunidad para **aplicar herramientas modernas, experimentar con optimizaciones de rendimiento y admitir varios idiomas** para un público más amplio. Ya había construido portafolios más simples en el pasado, pero a menudo se sentían incompletos, inconsistentes o limitados.  

Esta vez, quería crear algo que no fuera solo una página estática, sino un **proyecto escalable y mantenible** que pudiera mejorar con el tiempo. En este post, compartiré el viaje de crear mi portafolio con **Next.js**, **Tailwind CSS** y **i18n**, junto con las lecciones que aprendí y las mejoras que hice sobre mis intentos anteriores.

## ¿Por qué Next.js?

Elegí **Next.js** porque une la flexibilidad de React con un conjunto de características integradas que hacen que el desarrollo sea más suave y los sitios web sean más rápidos. Una de las ventajas más grandes es **rutas basadas en archivos**, que mantiene la estructura del proyecto limpia y intuitiva. En lugar de configurar manualmente las rutas, simplemente podía crear un nuevo archivo dentro del directorio `app` y Next.js se encargaría del resto.  

Otra razón fue el equilibrio entre **Renderizado en el lado del servidor (SSR)** y **Generación de sitios web estáticos (SSG)**. Estas características me permitieron entregar contenido que se carga rápido y sigue siendo SEO-amigable, lo que es fundamental para un portafolio personal.  

Además, la capacidad de crear **Rutas de API** sin un backend separado me dio la libertad de extender el proyecto si alguna vez quería agregar características como el manejo de formularios, autenticación o lógica del lado del servidor. Juntas, estas herramientas hicieron que Next.js fuera la base perfecta para un **portafolio moderno, escalable y rápido**.

## Estilo con Tailwind CSS

Cuando se trató de estilizar, no quería regresar a los días de escribir CSS personalizado que rápidamente se volvía inmanejable. Eso fue donde **Tailwind CSS** entró en juego. Su **enfoque de utilidad primaria** me permitió estilizar componentes directamente en mi JSX sin cambiar entre archivos de marcado y CSS.  

Aquí está una versión simplificada de mi **sección de héroe** estilizada con Tailwind:  

```tsx
export default function Hero() {
  return (
    <section className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-indigo-500 to-purple-600">
      <h1 className="text-5xl font-bold mb-4">Hello, My name is... 👋</h1>
      <p className="text-lg max-w-xl">
        Welcome to my portfolio! I build modern web applications with Next.js, Tailwind, and more.
      </p>
      <a
        href="#projects"
        className="mt-6 px-6 py-3 bg-white text-indigo-600 font-semibold rounded-lg shadow-lg hover:bg-gray-100 transition"
      >
        View My Work
      </a>
    </section>
  );
}
```
## Soporte multilingüe con i18n

Una de las mejoras más importantes en comparación con mis portafolios anteriores fue agregar la internacionalización (i18n). En el pasado, mi portafolio solo estaba disponible en inglés, lo que limitaba quién podía interactuar con él. Esta vez, quería hacerlo accesible a una audiencia más amplia.

Organicé las traducciones dentro del directorio locales/, con archivos JSON para cada idioma (por ejemplo, en.json, es.json). Luego, utilicé el hook `useTranslations` para acceder a las traducciones en mis componentes. Aquí hay un ejemplo simplificado:

```json
{
  "greeting": "Hi, I’m Yplam 👋",
  "welcome": "Welcome to my portfolio! I build modern web applications with Next.js, Tailwind, and more.",
  "viewWork": "View My Work"
}
```

## Mejoras con respecto a portafolios anteriores

Al mirar hacia atrás, mis proyectos de portafolio anteriores tenían muchos problemas. **Agregar nuevas páginas era tedioso, el estilo era inconsistente y todo era difícil de escalar**. El código a menudo se convirtió en una mezcla de soluciones rápidas que no envejecían bien, y porque los sitios solo estaban en inglés, no estaba alcanzando a tantas personas como quería.

Este nuevo stack resolvió todos esos problemas. Agregar un nuevo blog es ahora tan simple como escribir un archivo de Markdown dentro del directorio markdown/. El estilo es consistente y fácil de manejar con el sistema de diseño de Tailwind. Y con i18n en su lugar, el sitio ya no está restringido a solo un idioma.

El resultado es un portafolio que se siente moderno, es fácil de mantener y será mucho más fácil de expandir a medida que continúe creciendo como desarrollador.

## Conclusión

Este proyecto fue más que solo un rediseño. **Fue una oportunidad para aplicar lo que he aprendido sobre desarrollo frontend moderno y crear algo de lo que pueda sentirme orgulloso**. Trabajar con Next.js, Tailwind y i18n me dio no solo beneficios técnicos de rendimiento, escalabilidad y accesibilidad, sino también una mayor apreciación por cómo estas herramientas pueden complementarse entre sí.

- Si estás pensando en construir o reconstruir tu portafolio, te recomiendo encarecidamente este stack:
- Next.js para rendimiento y flexibilidad
- Tailwind CSS para estilizar rápidamente y diseño responsivo
- i18n para apoyo multilingüe e inclusividad

Puedes ver la versión en vivo de mi portafolio aquí: 👉🏻 [yplam.netlify.app](https://yplam.netlify.app)

