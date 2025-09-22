Exploring project options for image computing and artificial intelligence, and building on my previous project detecting traffic signs, I decided to create a **recognizer of LSE sign language gestures that can detect and classify in real-time thanks to AI** in real-world scenarios. The experience that the traffic sign recognizer provided made the process more streamlined. However, there were also challenges that I would like to explain in detail here. 

## Project structure

To take the necessary images for inference and training, I chose to use the OpenCV library in Python along with Google's "mediapipe" library. The first library allows the program to access the computer's webcam and capture the images being taken. The second library allows recognizing the key points of each image, which are then used to create the dataset.

Once the collection of points has been obtained, we have the dataset, which is then used to train a classification model based on neural networks with self-attention and LSTM (Long Short Term Memory) layers to classify the gestures into their respective classes.

Finally, a program has been developed to display the detections of the gestures detected by the model and the classifications made by the model, along with the probabilities of each class. In the following sections, we will go into more detail about each of these steps.

## Obtaining the dataset

Due to the lack of good datasets online, I decided to create my own dataset by collecting my own gestures using mediapipe. The dataset consists of 300 examples per class, with a total of up to 7 classes (including the "no-sign" class). The collection of these points was done through a small program that captured my gestures and saved them to a pickle file for later use.

The details of this program are very interesting, so I will explain them in detail:
- The program is launched with the class of the gesture to be captured. A total of 300 sequences of 20 frames each are captured, with a duration of one second each.
- Using mediapipe, the image is captured and the key points of the hand and face are extracted. These points must be **normalized** before being saved to the pickle file, so that there is an easy way to compare the gestures with no reference point.

Part of the code responsible for capturing the points is shown here:

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

## Training details

The training of this dataset, given its limited size, was done using a stencil model of neural networks with self-attention and LSTM layers specialized in capturing patterns over a second (which is precisely the type of input needed for the sign language recognizer).

It was necessary to apply **padding** to the data so that all of them have the same number of points, which we will see is 468 in our case (the sum of the x and y coordinates of the points of both hands and the face). 

This was done with the help of the TensorFlow library, which allows for efficient padding.

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
## Inference

The inference was carried out using a third script that took the frames captured by mediapipe and passed them to the sign language recognizer.

As an image (or several) is worth more than a thousand words, here is an example video where I try to ask "Hello, where is your house?"

<div style="background-color: black; display: flex; align-items: center; justify-content: center;">
  <video controls width="50%" ><source src="/source/hands.mp4"></video>
</div>

The full code is available on my GitHub, and I'm always happy to discuss improvements or answer questions about the implementation! 😄

