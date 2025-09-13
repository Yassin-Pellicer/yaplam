Building a traffic sign detection system was something I'd been wanting to tackle for a while. It was a chance to **combine modern detection techniques, experiment with real-time optimizations, and build something that could actually be useful** in real-world scenarios. I'd worked on simpler detection systems before like the MNIST number classifier I did at university, but that was just a proof of concept.

This time I wanted to build but a **pipeline** that could handle both images and video streams smoothly. In this post, I'll walk through the journey of creating my traffic sign detection system using **YOLO**, **TensorFlow**, and various optimization techniques, along with the challenges I faced and the solutions I found.

## Why a Two-Stage Approach?

I decided on a **two-stage detection pipeline** because it was my first project using YOLO and I wanted to learn how it works. I hadn't been much into computer vision and I didn't have a lot of experience with object detection, so I decided to mix what I already knew (building Convolutional Networks) and what I wanted to learn (YOLO). The first stage uses YOLO to quickly detect potential traffic signs in the frame, while the second stage uses a custom CNN classifier to identify exactly what type of sign it is.

The alternative would've been training YOLO to detect all 99 different traffic sign classes directly, but that would've required a much larger annotated dataset and likely resulted in lower accuracy for similar-looking signs (And also preparing such a dataset would have required a great amount of time, and the few existing datasets of image classification YOLO-ready weren't quite what i wanted). 

## Training the Classifier

The classification model was where I spent most of my time fine-tuning. Working with **99 different traffic sign classes** from the Spanish traffic dataset meant dealing with signs that can look very similar at low resolutions. Here's the architecture I settled on after lots of experimentation:
```python
num_classes = 99
data_augmentation = tf.keras.Sequential([
layers.RandomRotation(0.1),
layers.RandomZoom(0.1),
])model = models.Sequential([
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

## Real-Time Processing Challenges

Getting the system to run smoothly on video was where things got interesting. My first attempt processed frames sequentially, which resulted in painfully slow performance — maybe 5-10 FPS on a decent GPU. That's when I realized I needed to get creative with optimizations.

The breakthrough came from implementing **batch processing and multithreading**. Instead of classifying each detected sign individually, I collect all the crops from a frame and process them as a batch. This simple change alone gave me a 3-4x speedup because GPUs are much more efficient at processing batches than individual images.

I also added a producer-consumer pattern with threading to keep the GPU fed with data while handling the video I/O operations. The main thread reads frames and displays results, while worker threads handle the actual detection and classification. This keeps everything running smoothly without any stuttering.

## Dealing with Real-World Constraints

One thing that became clear early on was that lab accuracy doesn't always translate to real-world performance. Signs that the model classified perfectly on the test set would sometimes get misclassified in actual footage due to motion blur, poor lighting, or partial occlusions.

To handle this, I added confidence thresholds at both stages — YOLO needs to be confident enough that it's found a sign, and the classifier needs to be confident about what type of sign it is. I also filter out detections that are too small, as these are often false positives or signs too far away to classify reliably.

## Performance Optimizations

Beyond the algorithmic improvements, I implemented several technical optimizations to squeeze out more performance:

- **Mixed precision training**: Using float16 where possible significantly sped up both training and inference
- **TensorFlow JIT compilation**: This gave another 10-15% performance boost for the classifier
- **Optimized video decoding**: Using OpenCV's hardware acceleration features when available

## Some Results

[Traffic Sign Detection Video: Click Me! 👈🏻](https://www.youtube.com/watch?v=AQusYhU3np8)

## About the results

The video makes obvious some problems with the pipeline. As a means to keep the video from stopping while the inference was being done, I stuck to a producer/consumer threading model as I mentioned in the challenges section. This approach meant a fluid video (important for user experience) at the cost of some latency in the inference. This is why some detection boxes appear to "lag" behind the actual signs. Though it may seem like they're failing the detection, it's just that the sign has "moved" relative to the camera and the time of the inference.

The complete code is available on my GitHub, and I'm always happy to discuss improvements or answer questions about the implementation! 😄

