# De Imagen a String Art: Construyendo un Algoritmo Greedy para Arte Lineal Circular

Crear arte digital a partir de fotografías siempre me ha fascinado, pero quería abordar algo único: **convertir imágenes en string art**. El desafío no era solo sobre procesamiento de imágenes, sino sobre desarrollar un algoritmo que pudiera conectar inteligentemente puntos alrededor de un círculo para recrear la esencia de una fotografía usando únicamente líneas rectas.

Este proyecto se convirtió en una exploración de **visión por computadora, algoritmos de optimización y programación creativa**. En este post, explicaré cómo construí un algoritmo greedy que transforma cualquier retrato en arte de hilo hipnotizante, junto con las decisiones técnicas y optimizaciones que lo hicieron funcionar.

## El Desafío: De Píxeles a Líneas

El string art tradicionalmente involucra envolver hilo alrededor de clavos colocados en el perímetro de un círculo. El artista crea una imagen conectando estratégicamente estos puntos con hilo, construyendo áreas más oscuras a través de líneas superpuestas. Mi objetivo era **automatizar este proceso digitalmente** mientras mantenía la estética orgánica y artesanal.

Los desafíos principales fueron:
- **Preprocesamiento de imagen**: Convertir fotos en imágenes circulares en escala de grises con alto contraste
- **Muestreo de puntos**: Colocar estratégicamente "clavos" alrededor del borde del círculo
- **Optimización de rutas**: Decidir qué conexiones crean el mejor resultado visual
- **Gestión de superposiciones**: Equilibrar la densidad de líneas sin crear ruido visual

## Preprocesamiento de Imagen: Estableciendo las Bases

El primer paso fue crear un pipeline robusto de procesamiento de imágenes. Necesitaba transformar cualquier imagen de entrada en un formato adecuado para la generación de string art:

```python
def circle_crop_grayscale(image_path, size=(500, 500), contrast=3.0):
    # Cargar y redimensionar a formato cuadrado
    img = Image.open(image_path).convert("L")
    img = img.resize(size, Image.Resampling.LANCZOS)
    
    # Aplicar mejora de contraste agresiva
    enhancer = ImageEnhance.Contrast(img)
    img = enhancer.enhance(contrast)
    
    # Crear máscara circular
    mask = Image.new("L", img.size, 0)
    draw = ImageDraw.Draw(mask)
    draw.ellipse((0, 0, img.size[0], img.size[1]), fill=255)
    
    # Aplicar máscara y normalizar valores
    arr = np.array(img, dtype=np.float32) / 255.0
    arr = 1.0 - arr  # Invertir: negro = 1, blanco = 0
```

La clave aquí fue **invertir los valores de intensidad** para que los píxeles negros (valor 1) representen áreas que necesitan más densidad de hilo, mientras que los píxeles blancos (valor 0) necesitan menos líneas. La mejora agresiva del contraste ayuda a crear resultados de string art más dramáticos.

## Colocación Estratégica de Puntos

En lugar de colocar aleatoriamente los puntos de conexión, los muestreé uniformemente alrededor del perímetro del círculo:

```python
def get_circunference_points(arr, num_points=250):
    h, w = arr.shape
    center = (w // 2, h // 2)
    radius = min(w, h) // 2 - 1
    
    points = []
    for theta in np.linspace(0, 2 * np.pi, num_points, endpoint=False):
        x = int(center[0] + radius * np.cos(theta))
        y = int(center[1] + radius * np.sin(theta))
        value = arr[y, x]
        points.append((x, y, value))
    
    return points
```

Este enfoque asegura una **distribución uniforme** alrededor del perímetro mientras captura la intensidad del píxel en cada punto. El número de puntos se convierte en un parámetro crucial: muy pocos y pierdes detalle, demasiados y el algoritmo se vuelve computacionalmente costoso.

## El Corazón: Selección Greedy de Líneas

El algoritmo principal usa un **enfoque greedy** para seleccionar la mejor línea en cada paso. Esta fue la parte más desafiante de hacer bien:

```python
def score(array, source, destination, canvas):
    linePoints = get_line(source[0], source[1], destination[0], destination[1])
    
    darkness_score = 0      # Cuánta oscuridad cubre esta línea
    overlap_penalty = 0     # Penalización por superponer líneas existentes
    valid_pixels = 0
    
    for point in linePoints:
        x, y = point[0], point[1]
        
        if not (0 <= y < array.shape[0] and 0 <= x < array.shape[1]):
            continue
            
        img_val = array[y, x] if not np.isnan(array[y, x]) else 0
        canvas_val = canvas[y, x]
        
        darkness_score += img_val
        overlap_penalty += canvas_val if canvas_val > 0 else 0
        valid_pixels += 1
    
    if valid_pixels == 0:
        return -1000
    
    final_score = (darkness_score - overlap_penalty * 0.025) / valid_pixels
    return final_score
```

La función de puntuación equilibra múltiples factores:
- **Cobertura de oscuridad**: Las líneas que pasan por áreas más oscuras de la imagen obtienen puntuaciones más altas
- **Penalización por superposición**: Reduce el atractivo de las líneas que cruzan las existentes
- **Normalización por longitud**: Previene el sesgo hacia líneas más largas o más cortas

## Actualizaciones Inteligentes del Lienzo

Cada vez que se dibuja una línea, actualizo un "lienzo" que rastrea la densidad de líneas. Esto evita que el algoritmo dibuje repetidamente sobre las mismas áreas:

```python
def updateCanvas(source, destination, canvas):
    linePoints = get_line(source[0], source[1], destination[0], destination[1])
    
    # Marcar píxeles de línea reales
    for point in linePoints:
        x, y = point[0], point[1]
        if 0 <= y < canvas.shape[0] and 0 <= x < canvas.shape[1]:
            canvas[y, x] = canvas[y, x] + 0.5
    
    # Añadir influencia a píxeles circundantes
    for point in linePoints:
        x, y = point[0], point[1]
        for dx in [-1, 0, 1]:
            for dy in [-1, 0, 1]:
                if dx == 0 and dy == 0:
                    continue
                nx, ny = x + dx, y + dy
                if 0 <= ny < canvas.shape[0] and 0 <= nx < canvas.shape[1]:
                    canvas[ny, nx] = canvas[ny, nx] + 0.2
```

Este **sistema de influencia graduado** significa que no solo los píxeles de línea reales se vuelven menos atractivos para futuras líneas, sino que los píxeles circundantes también reciben atractivo reducido. Esto crea una distribución de líneas más natural.

## El Bucle Principal del Algoritmo

El algoritmo greedy conecta puntos uno por uno, siempre eligiendo la siguiente conexión con mayor puntuación:

```python
def greedy_lineart(points, img_route, size=(500, 500), lines=400):
    arr, img = circle_crop_grayscale(img_route, size=size, return_image=True)
    nodes = get_circunference_points(arr, num_points=points)
    canvas = np.full((size[1], size[0]), np.float32(0.0))
    
    done = set()
    solution = [(nodes[0][0], nodes[0][1])]
    
    while len(solution) < lines + 1:
        edgeDict = {}
        for node in nodes:
            edge = (solution[-1], node)
            if frozenset(edge) in done or node == solution[-1]:
                continue
            if math.dist(node[:2], solution[-1]) < 100:  # Saltar puntos cercanos
                continue
            edgeDict[edge] = score(arr, solution[-1], node, canvas)
            
        best_edge = max(edgeDict, key=edgeDict.get)
        canvas = updateCanvas(best_edge[0], best_edge[1], canvas)
        solution.append((best_edge[1][0], best_edge[1][1]))
        done.add(frozenset(best_edge))
     
    return solution
```

El algoritmo mantiene un conjunto de conexiones usadas y aplica una restricción de distancia mínima para prevenir líneas triviales cortas entre puntos adyacentes.

## Lecciones Aprendidas y Mejoras Futuras

Construir este generador de string art me enseñó varias lecciones valiosas:

**Diseño de Algoritmos**: El enfoque greedy funciona bien para este problema, pero descubrí que **la optimización local a veces puede perderse soluciones globalmente mejores**. Un enfoque más sofisticado podría usar templado simulado o algoritmos genéticos.

**Ajuste de Parámetros**: El equilibrio entre mejora de contraste, penalizaciones por superposición y densidad de puntos requiere calibración cuidadosa para diferentes tipos de imagen. Los retratos necesitan configuraciones diferentes a los paisajes o imágenes abstractas.

**Optimización de Rendimiento**: Con 250 puntos, hay más de 31,000 conexiones posibles para evaluar en cada paso. Las versiones futuras podrían beneficiarse de **indexación espacial** o **poda heurística** para reducir el tiempo de computación.

**Calidad Visual**: Aunque el algoritmo actual produce resultados convincentes, agregar **consideraciones estéticas** como distribución de ángulos de línea o simetría podría mejorar el atractivo visual.

## Reflexiones Finales

Este proyecto fue más que solo un ejercicio de procesamiento de imágenes: fue **un viaje hacia la creatividad algorítmica**. La intersección de matemáticas, ciencias de la computación y arte creó desafíos únicos que me empujaron a pensar diferente sobre problemas de optimización.

El algoritmo greedy de string art demuestra cómo **reglas simples pueden crear patrones complejos y hermosos**. Aunque siempre hay espacio para mejoras, la implementación actual transforma exitosamente fotografías en string art convincente que captura la esencia de la imagen original.

El aspecto más gratificante fue ver cómo el algoritmo "descubre" las características importantes de una cara u objeto, enfatizando ojos, sombras y contornos a través de sus elecciones de líneas: casi como observar a un artista trabajar, pero a través del lente de la creatividad computacional.

Puedes experimentar con diferentes parámetros para crear varios efectos artísticos:
- **Más puntos** (300-400) para mayor detalle
- **Mayor contraste** (4.0-5.0) para resultados más dramáticos  
- **Más líneas** (3000-5000) para texturas más densas y ricas
- **Diferentes tamaños** para varias resoluciones de salida

*El link al repositorio puedes encontrarlo en mi [GitHub](https://github.com/Yassin-Pellicer/Miscellaneous/tree/master/python/stringart), ¡Pruébalo con tus propios retratos y ve cómo el algoritmo interpreta las características únicas de cada rostro!*