Construir un sistema de detección de señales de tráfico era algo que había querido abordar desde hace tiempo. Era una oportunidad para **combinar técnicas modernas de detección, experimentar con optimizaciones en tiempo real y crear algo que realmente pudiera ser útil** en escenarios del mundo real. Había trabajado antes en sistemas de detección más simples, como el clasificador de números MNIST que hice en la universidad, pero eso solo era una prueba de concepto.

Esta vez quería construir un **pipeline** que pudiera manejar imágenes y secuencias de video de manera fluida. En esta publicación, voy a explicar el proceso de creación de mi sistema de detección de señales de tráfico usando **YOLO**, **TensorFlow** y varias técnicas de optimización, junto con los desafíos que enfrenté y las soluciones que encontré.

## ¿Por qué un enfoque de dos etapas?

Decidí usar un **pipeline de detección de dos etapas** porque era mi primer proyecto usando YOLO y quería aprender cómo funciona. No había trabajado mucho en visión por computadora y no tenía mucha experiencia con detección de objetos, así que decidí mezclar lo que ya sabía (construir Redes Neuronales Convolucionales) con lo que quería aprender (YOLO). La primera etapa usa YOLO para detectar rápidamente posibles señales de tráfico en el cuadro, mientras que la segunda etapa usa un clasificador CNN personalizado para identificar exactamente qué tipo de señal es.

La alternativa habría sido entrenar YOLO para detectar directamente las 99 clases diferentes de señales de tráfico, pero eso habría requerido un conjunto de datos anotados mucho más grande y probablemente resultaría en una menor precisión para señales que se parecen entre sí (además, preparar un conjunto de datos así habría requerido mucho tiempo, y los pocos conjuntos de datos existentes listos para YOLO no eran exactamente lo que quería).

## Entrenamiento del clasificador

El modelo de clasificación fue en el que pasé la mayor parte del tiempo afinando. Trabajar con **99 clases diferentes de señales de tráfico** del conjunto de datos español significaba lidiar con señales que pueden parecer muy similares en resoluciones bajas. Aquí está la arquitectura en la que me quedé después de mucha experimentación:

```python
num_classes = 99
data_augmentation = tf.keras.Sequential([
    layers.RandomRotation(0.1),
    layers.RandomZoom(0.1),
])

model = models.Sequential([
    layers.InputLayer(input_shape=(128, 128, 3)),
    layers.Rescaling(1./255),
    data_augmentation,
    layers.Conv2D(32, 3, activation='relu'),
    layers.MaxPooling2D(2),
    layers.Conv2D(64, 3, activation='relu'),
    layers.MaxPooling2D(2),
    layers.Conv2D(128, 3, activation='relu'),
    layers.MaxPooling2D(2),
    layers.Flatten(),
    layers.Dense(256, activation='relu'),
    layers.Dropout(0.5),
    layers.Dense(num_classes, activation='softmax')
])
```

## Retos del tiempo real

Hacer que el sistema funcione de manera fluida en video fue lo más interesante. Mi primer intento procesaba los cuadros secuencialmente, lo que resultaba en un rendimiento muy lento, tal vez 5-10 FPS incluso en una GPU decente. Ahí fue cuando me di cuenta de que necesitaba ser creativo con las optimizaciones.

El avance vino al implementar procesamiento por lotes y multihilo. En lugar de clasificar cada señal detectada individualmente, recolecto todos los recortes de un cuadro y los proceso como un lote. Este simple cambio por sí solo me dio una mejora de 3-4x en velocidad, porque las GPUs son mucho más eficientes procesando lotes que imágenes individuales.

También añadí un patrón productor-consumidor con hilos para mantener la GPU ocupada mientras manejaba las operaciones de entrada/salida de video. El hilo principal lee los cuadros y muestra los resultados, mientras que los hilos de trabajo manejan la detección y clasificación real. Esto mantiene todo funcionando sin interrupciones.

## Restricciones del mundo real 

Algo que quedó claro desde el principio es que la precisión en laboratorio no siempre se traduce en un buen desempeño en el mundo real. Señales que el modelo clasificaba perfectamente en el conjunto de prueba a veces se mal clasificaban en video real debido a desenfoque de movimiento, poca luz u oclusiones parciales.

Para manejar esto, añadí umbrales de confianza en ambas etapas: YOLO debe estar suficientemente seguro de haber encontrado una señal, y el clasificador debe estar seguro del tipo de señal. También filtro detecciones demasiado pequeñas, ya que suelen ser falsos positivos o señales demasiado lejanas para clasificarlas de manera fiable.

## Mejoras de rendimiento

Más allá de las mejoras algorítmicas, implementé varias optimizaciones técnicas para exprimir más rendimiento:

- **Entrenamiento de precisión mixta**: Usar float16 cuando es posible aceleró significativamente tanto el entrenamiento como la inferencia.

- **Compilación JIT de TensorFlow**: Esto dio un 10-15% de mejora adicional en el rendimiento del clasificador.


## Algunos resultados

<div style="background-color: black; display: flex; align-items: center; justify-content: center;">
  <video controls width="90%" ><source src="/source/traffic_detection.mp4"></video>
</div>

## Sobre los resultados

El video deja claros algunos problemas del pipeline. Para evitar que el video se detuviera mientras se realizaba la inferencia, usé el modelo de hilos productor/consumidor que mencioné en la sección de desafíos. Este enfoque permitió un video fluido (importante para la experiencia del usuario) a costa de algo de latencia en la inferencia. Por eso algunas cajas de detección parecen “retrasadas” respecto a las señales reales. Aunque pueda parecer que la detección falla, simplemente la señal se ha “movido” en relación a la cámara y al tiempo de la inferencia.

El código completo está disponible en mi GitHub, y siempre estoy feliz de discutir mejoras o responder preguntas sobre la implementación! 😄



