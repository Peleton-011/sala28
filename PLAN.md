# Sala 28

## Idea general

### La empresa 

Se trata de una página web para una empresa de eventos de emprendimiento diseñados para realmente cumplir la función de networking y demás. Muchos eventos de emprendimiento se centran demasiado en el tema social, dan bebidas, no hay tanto foco en el sentido más empresarial sino que acaban actuando casi como una red social para el emprendimiento. En lugar de eso, se trata de crear un espacio en el que puedan reunirse y hablar de temas de emprendimiento. 

Eventos con con enfoque en realmente aportar algo a todo el mundo, con ponencias y presentaciones de ideas hechas por emprendedores exitosos tanto como por individuos con ideas que quieren presentar. Los eventos podrían tener cierto grado de temática para que los participantes puedan hacerse a la idea de lo que se hablará y así elegir con más criterio a qué eventos quieren ir.

Eventos +24 años (Perfil serio y profesional, sin llegar a ser un evento de fiesta). Durarían de 1h a 2,5h. En un lugar tipo cafetería o sitio de eventos similar. 40 a 70 personas, aproximadamente, ni demasiadas ni muy pocas.

También se contempla que alguien con habilidades concretas a la temática del evento que vaya con la idea de aprender y encontrar trabajo con alguno de los emprendedores que se reunan.

En cada evento entre 2 a 5 personas hacen presentaciones. Para optar a eso hay que rellenar un formulario explicando el proyecto que quieres explicar o la experiencia que tienes que te "valide" para dar una presentación tipo ponencia.

Los participantes que no presenten también tienen que rellenar un formulario, para hacerse a la idea de cuanta gente vendrá y sacar información demográfica también.

La idea es que salgas 100% hayas conocido a alguien y aprendido algo.

Vestimenta razonable (business casual).

Precio de los eventos entorno a 10 a 20€.

### La web

- Página sencilla y minimalista.
- Formulario de contacto (tipo "optar" a participar) -> Tiene que revisarse luego (Postgres/Supabase para las solicitudes? Tal vez como es muy sencillo y se revisará manualmente puede subirse la solicitud a google drive o mandarse por email a una dirección dedicada a eso? Luego ya se hará una dashboard si hace falta).
- De momento no, pero que esté diseñada de modo que se puedan sacar analíticas más adelante.
- De momento no, pero que esté diseñada de modo que se pueda añadir pagos, tema bancario más adelante.
- Fondo tipo grain.
- Color scheme tipo Blanco/Negro o Vainilla/Marron, algo así. Que quede elegante, exclusivo, potente, moderno, minimalista, sofisticado, profesional, tipo club privado... Tal vez algún toque o detalle en carmesí
- Color scheme parametrizado, que pueda alternar qué color se usa en qué parte, para facilitar temas de modo oscuro y modo claro, etc...

### Objetivos de la Web

1. Explicar qué es S28
2. Transimitir el concepto de networking selectivo y curado, centrado en aportar el máximo valor.
3. Generar solicitudes de asistir
4. Construir BBDD de asistentes y asistentes potenciales para progresivamente poder orientar mejor los eventos 

Muy importante recoger los formularios y generar analytics

## Contenido

### Principal

#### Landing

- Logo de la empresa "S28" Gigante, en el centro
- Tipogradfia serifada, estrecha (Tipo Georgia con la relación de aspecto custom para que sea algo más estrecha y alta.).
- Al hacer scroll, la "S" y el "28" se separan horizontalmente y va apareciendo entre ambas el texto restante ("ala") hasta que queda "Sala 28" en el centro. 
- Al seguir haciendo scroll el texto queda como en el fondo. se vuelve menos opaco, o como grisáceo. Por ejemplo podría subir un poco. No está muy determinado, pero que quede intuitivamente claro que pasa al fondo.
- Ahí termina el landing como tal, al hacer scroll el contenido del resto de la web sube y pasa por delante del logo que ahora ha quedado en el fondo.

#### Introducción

- Valores, Visión, Misión.
- Cuál es la diferencia con otras salas de emprendimiento, etc.

#### Eventos 

Componente con la información de los eventos, con fotos, con el nombre del evento, la fecha, la ubicación, etc. Extensible y con parámetros opcionales (tipo que un evento sin fotos no rompa el componente). Tal vez usar nuxt-content?

#### Formulario

Con validación

- Nombre
- Edad/Fecha de nacimiento (mayor de 24, se revisará DNI)
- Profesión
- Linkedin?
- Proyecto/Interés profesional
Aquí se divide el formulario. Si se elige Proyecto se puede elegir presentarse a exponer, en cuyo caso se abre un apartado (tipo desplegable) para explicar el proyecto que se quiere exponer. Luego se valorará cada caso y se aceptarán o denegarán las solicitudes de exponer según se vea. Al menos si te presentas a exponer tienes que poner información de contacto sí o sí.

Los datos se mandarían a algún tipo de base de datos.

Los campos del formulario son susceptibles a revisiones.



#### Otros

- Testimonials de socios
- Mentores disponibles (plan anual)

### Secundario

- Enlace a Luma.com (Página donde publicar eventos de este tipo). 
- Redes sociales de la empresa

## Consideraciones

- El proyecto usa Nuxt
- El proyecto usa el modulo nuxt ui, al usarlo, que sea siempre con el estilo adaptado a las guías de estilo de la empresa. 

## A largo plazo (cuando ya esté publicada y demostrada la idea)

- Incorporar con Luma.com. un editor o una dashboard donde crear un evento y que se publique automáticamente a la web, a Luma.com y otros medios (por ejemplo que se mande por email a una lista de contactos).
- Que se pueda hacer un dashboard para ver las estadísticas de los eventos, y que se pueda subir las fotos de los eventos a la web.

## No propio a la web

- Hace falta una quote de cuanto costaría de publicar y mantener, según tráfico (se espera tráfico moderado, de momento)

