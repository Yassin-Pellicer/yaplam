Explorando opciones de proyecto de imagen por computador e inteligencia artificial, y partiendo de mi anterior proyecto de detección de señales de tráfico, decidí esta vez hacer un **reconocedor de gestos de lenguaje de signos del LSE que pudiera detectar y clasificar en tiempo real gracias a la inteligencia artificial** en escenarios del mundo real. La experiencia que me ofreció el reconocedor de señales de tráfico hizo más llevadero el proceso. Sin embargo, también se han afrontado retos que me gustaría explicaros por aquí en detalle 😃. 

## Estructura del proyecto

Para tomar las imágenes necesarias tanto para la inferencia como para el entrenamiento opté por utilizar la librería de OpenCV de Python junto con la librería de Google "mediapipe". La primera librería permite al programa acceder a la webcam del ordenador y capturar las imágenes que son captadas. La segunda librería permite reconocer de cada imagen los puntos clave tanto de la mano como de la cara, los cuales posteriormente se utilizarían para crear el dataset.

Una vez obtenida la colección de puntos ya tendríamos el dataset, con el cual se entrenaría un modelo de clasificación basado en redes neuronales con self-attention y capas LSTM (Long Short Term Memory) para clasificar los gestos en sus respectivas clases.

Por último, se ha desarrollado un programa que se encargue de mostrar en tiempo real las detecciones de los gestos detectados por el modelo y las clasificaciones realizadas por el mismo, junto con las probabilidades de cada clase. En las próximas secciones entraremos en más detalle con respecto a cada una de estas etapas.

## Obtención del dataset

A falta de buenos resultados de datasets por internet, opté por crear un dataset yo mismo recopilando la información de mis propios gestos mediante mediapipe. El dataset consta de 300 ejemplos por cada clase, con un total en el momento de redacción de este post de hasta 7 clases (incluyendo la clase "no-signo"). La obtención de estos puntos se ha hecho gracias a un pequeño programa que se encargaba de capturar mis gestos y guardarlos en un archivo pickle para su posterior uso.

Los detalles de este programita me parecen muy interesantes, así que los voy a explicar en detalle:
- El programa se lanza con la clase de la que se quieren capturar los gestos. Se graban, en total, 300 secuencias de 20 frames cada una por duración de un segundo.
- Mediante mediapipe se captura la imagen y se extraen los puntos clave de la mano y la cara. Estos puntos deben **normalizarse** antes de ser guardados en el archivo "pickle", ya que de lo contrario no habría manera fácil de comparar los gestos los unos a los otros sin una referencia común.

Parte del código responsable de capturar los puntos lo vemos aquí: 

```python
def process_landmarks(frame, results_hand, results_face):
    total_points = []
    h, w, _ = frame.shape

    # Face landmarks
    if results_face.multi_face_landmarks:
        for face_landmarks in results_face.multi_face_landmarks:
            for idx in lm.ALL:
                if idx < len(face_landmarks.landmark):
                    pt = face_landmarks.landmark[idx]
                    cx, cy = int(pt.x * w), int(pt.y * h)
                    cv2.circle(frame, (cx, cy), 2, (0, 255, 0), -1)
                    total_points.append((cx, cy))

    # Hand landmarks (both hands)
    if results_hand.multi_hand_landmarks:
        for hand_landmarks in results_hand.multi_hand_landmarks:
            mp.solutions.drawing_utils.draw_landmarks(
                frame, hand_landmarks, mp.solutions.hands.HAND_CONNECTIONS
            )
            total_points.extend([
                (int(l.x * w), int(l.y * h)) for l in hand_landmarks.landmark
            ])

    return total_points

```

## Detalles del entrenamiento

El entrenamiento de este dataset, dado que es de tamaño limitado por ahora, se ha hecho mediante un sencillo modelo de redes neuronales con self-attention y capas LSTM especializadas en captar patrones a lo largo de una secuencia (que es precisamente el tipo de entrada que se necesita para el reconocedor de gestos).

Se ha tenido que aplicar un **padding** a los datos para que todos cuenten con el mismo número puntos, que vemos que, en nuestro caso, serían 468 como máximo (la suma de las coordenadas x e y de los puntos de las dos manos y la cara). 

Esto se hizo con la ayuda de la librería de TensorFlow que permite hacer padding de manera eficiente.

```python
inputs = Input(shape=(20, 468))

x = Bidirectional(LSTM(128, return_sequences=True))(inputs)
x = Bidirectional(LSTM(128, return_sequences=True))(x)

# Multi-head self-attention
attn = MultiHeadAttention(num_heads=4, key_dim=32)(x, x)
x = LayerNormalization()(x + attn)  # residual connection + layer norm

x = GlobalAveragePooling1D()(x)
x = Dense(256, activation="relu")(x)
x = Dropout(0.7)(x)
x = Dense(128, activation="relu")(x)
outputs = Dense(y_onehot.shape[1], activation="softmax")(x)

model = Model(inputs, outputs)

model.compile(
    optimizer=tf.keras.optimizers.Adam(learning_rate=1e-4),
    loss="categorical_crossentropy",
    metrics=["accuracy"]
)
```
## Inferencia

La inferencia se ha llevado a cabo mediante un tercer script que tomaba los frames capturados por mediapipe y los pasaba al reconocedor de gestos de lenguaje de signos.

Como una imagen (o varias) vale más que mil palabras, aquí os dejo un vídeo de ejemplo donde intento preguntar "Hola, ¿dónde está tu casa?"

<div style="background-color: black; display: flex; align-items: center; justify-content: center;">
  <video controls width="50%" ><source src="/source/hands.mp4"></video>
</div>

El código completo está disponible en mi GitHub, y siempre estoy feliz de discutir mejoras o responder preguntas sobre la implementación! 😄



