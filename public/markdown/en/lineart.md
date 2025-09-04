Creating digital art from photographs has always fascinated me, but I wanted to tackle something unique: **converting images into string art**. The challenge wasn't just about image processing — it was about developing an algorithm that could intelligently connect points around a circle to recreate the essence of a photograph using only straight lines.

This project became an exploration of **computer vision, optimization algorithms, and creative coding**. In this post, I'll walk through how I built a greedy algorithm that transforms any portrait into mesmerizing string art, along with the technical decisions and optimizations that made it work.

## The Challenge: From Pixels to Lines

String art traditionally involves wrapping thread around nails placed on a circle's perimeter. The artist creates an image by strategically connecting these points with thread, building up darker areas through overlapping lines. My goal was to **automate this process digitally** while maintaining the organic, hand-crafted aesthetic.

The core challenges were:
- **Image preprocessing**: Converting photos into circular, high-contrast grayscale images
- **Point sampling**: Strategically placing "nails" around the circle's edge
- **Path optimization**: Deciding which connections create the best visual result
- **Overlap management**: Balancing line density without creating visual noise

## Image Preprocessing: Setting the Foundation

The first step was creating a robust image processing pipeline. I needed to transform any input image into a format suitable for string art generation:

```python
def circle_crop_grayscale(image_path, size=(500, 500), contrast=3.0):
    # Load and resize to square format
    img = Image.open(image_path).convert("L")
    img = img.resize(size, Image.Resampling.LANCZOS)
    
    # Apply aggressive contrast enhancement
    enhancer = ImageEnhance.Contrast(img)
    img = enhancer.enhance(contrast)
    
    # Create circular mask
    mask = Image.new("L", img.size, 0)
    draw = ImageDraw.Draw(mask)
    draw.ellipse((0, 0, img.size[0], img.size[1]), fill=255)
    
    # Apply mask and normalize values
    arr = np.array(img, dtype=np.float32) / 255.0
    arr = 1.0 - arr  # Flip: black = 1, white = 0
```

The key insight here was **flipping the intensity values** so that black pixels (value 1) represent areas that need more thread density, while white pixels (value 0) need fewer lines. The aggressive contrast enhancement helps create more dramatic string art results.

## Strategic Point Placement

Rather than randomly placing connection points, I sampled them evenly around the circle's perimeter:

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

This approach ensures **even distribution** around the perimeter while capturing the pixel intensity at each point. The number of points becomes a crucial parameter — too few and you lose detail, too many and the algorithm becomes computationally expensive.

## The Heart: Greedy Line Selection

The core algorithm uses a **greedy approach** to select the best line at each step. This was the most challenging part to get right:

```python
def score(array, source, destination, canvas):
    linePoints = get_line(source[0], source[1], destination[0], destination[1])
    
    darkness_score = 0      # How much darkness this line covers
    overlap_penalty = 0     # Penalty for overlapping existing lines
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

The scoring function balances multiple factors:
- **Darkness coverage**: Lines that pass through darker image areas get higher scores
- **Overlap penalty**: Reduces the appeal of lines that cross existing ones
- **Length normalization**: Prevents bias toward longer or shorter lines

## Smart Canvas Updates

Each time a line is drawn, I update a "canvas" that tracks line density. This prevents the algorithm from repeatedly drawing over the same areas:

```python
def updateCanvas(source, destination, canvas):
    linePoints = get_line(source[0], source[1], destination[0], destination[1])
    
    # Mark actual line pixels
    for point in linePoints:
        x, y = point[0], point[1]
        if 0 <= y < canvas.shape[0] and 0 <= x < canvas.shape[1]:
            canvas[y, x] = canvas[y, x] + 0.5
    
    # Add influence to surrounding pixels
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

This **graduated influence system** means that not only do the actual line pixels become less attractive for future lines, but surrounding pixels also receive reduced appeal. This creates more natural line distribution.

## The Main Algorithm Loop

The greedy algorithm connects points one by one, always choosing the highest-scoring next connection:

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
            if math.dist(node[:2], solution[-1]) < 100:  # Skip nearby points
                continue
            edgeDict[edge] = score(arr, solution[-1], node, canvas)
            
        best_edge = max(edgeDict, key=edgeDict.get)
        canvas = updateCanvas(best_edge[0], best_edge[1], canvas)
        solution.append((best_edge[1][0], best_edge[1][1]))
        done.add(frozenset(best_edge))
     
    return solution
```

The algorithm maintains a set of used connections and applies a minimum distance constraint to prevent trivial short lines between adjacent points.

## Lessons Learned and Future Improvements

Building this string art generator taught me several valuable lessons:

**Algorithm Design**: The greedy approach works well for this problem, but I discovered that **local optimization can sometimes miss globally better solutions**. A more sophisticated approach might use simulated annealing or genetic algorithms.

**Parameter Tuning**: The balance between contrast enhancement, overlap penalties, and point density requires careful calibration for different image types. Portraits need different settings than landscapes or abstract images.

**Performance Optimization**: With 250 points, there are over 31,000 possible connections to evaluate at each step. Future versions could benefit from **spatial indexing** or **heuristic pruning** to reduce computation time.

**Visual Quality**: While the current algorithm produces compelling results, adding **aesthetic considerations** like line angle distribution or symmetry could improve the visual appeal.

## Final Thoughts

This project was more than just an image processing exercise — it was **a journey into algorithmic creativity**. The intersection of mathematics, computer science, and art created unique challenges that pushed me to think differently about optimization problems.

The greedy string art algorithm demonstrates how **simple rules can create complex, beautiful patterns**. While there's always room for improvement, the current implementation successfully transforms photographs into compelling string art that captures the essence of the original image.

The most rewarding aspect was seeing how the algorithm "discovers" the important features of a face or object, emphasizing eyes, shadows, and contours through its line choices — almost like watching an artist work, but through the lens of computational creativity.

You can experiment with different parameters to create various artistic effects:
- **More points** (300-400) for finer detail
- **Higher contrast** (4.0-5.0) for more dramatic results  
- **More lines** (3000-5000) for denser, richer textures
- **Different sizes** for various output resolutions

*You can find the link to the repo by clicking on the following word: [GitHub](https://github.com/Yassin-Pellicer/Miscellaneous/tree/master/python/stringart),Try it with your own portraits and see how the algorithm interprets the unique features of each face!*
