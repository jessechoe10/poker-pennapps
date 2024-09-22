import cv2
import numpy as np


def detect_chip_color(image, roi):
    # Define color boundaries for red, green, blue, and white in BGR format
    color_ranges = {
        'Red': ([0, 0, 100], [80, 80, 255]),  # Approximate BGR range for red
        'Green': ([0, 100, 0], [80, 255, 80]),  # Approximate BGR range for green
        'Blue': ([10, 10, 10], [255, 80, 80]),  # Approximate BGR range for blue
        'White': ([200, 200, 200], [255, 255, 255])  # Approximate BGR range for white
    }

    # Get the average color of the ROI
    avg_color = np.mean(roi, axis=(0, 1)).astype(int)

    detected_color = "Unknown"
    for color_name, (lower, upper) in color_ranges.items():
        lower = np.array(lower, dtype=np.uint8)
        upper = np.array(upper, dtype=np.uint8)

        # Check if the average color is within the range
        if np.all(avg_color >= lower) and np.all(avg_color <= upper):
            detected_color = color_name
            break

    return detected_color


def count_stacked_chips(image_path):
    # Read the image
    image = cv2.imread(image_path)
    original = image.copy()

    # Convert to grayscale
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)

    # Apply Gaussian blur to reduce noise
    blurred = cv2.GaussianBlur(gray, (5, 5), 0)

    # Use Canny edge detection
    edges = cv2.Canny(blurred, 50, 150)

    # Perform dilation to connect edges
    kernel = np.ones((3, 3), np.uint8)
    dilated = cv2.dilate(edges, kernel, iterations=1)

    # Find contours
    contours, _ = cv2.findContours(dilated, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)

    # Filter out small contours and non-rectangular shapes
    min_contour_area = 500  # Adjust this value based on your image scale
    filtered_contours = [cnt for cnt in contours if cv2.contourArea(cnt) > min_contour_area]

    # Sort contours by x-position and merge nearby contours
    bounding_boxes = [cv2.boundingRect(cnt) for cnt in filtered_contours]
    if bounding_boxes:
        # Sort bounding boxes by y-position to process from top to bottom
        bounding_boxes = sorted(bounding_boxes, key=lambda box: box[1])

        # Merge overlapping or adjacent boxes (adjust threshold as needed)
        merged_box = bounding_boxes[0]
        for box in bounding_boxes[1:]:
            (x, y, w, h) = merged_box
            (bx, by, bw, bh) = box
            if by <= y + h:  # If the next contour is close enough to the current bounding box
                merged_box = (
                min(x, bx), min(y, by), max(x + w, bx + bw) - min(x, bx), max(y + h, by + bh) - min(y, by))
            else:
                break

        # Draw the final bounding rectangle
        (x, y, w, h) = merged_box
        cv2.rectangle(image, (x, y), (x + w, y + h), (0, 255, 0), 2)

        # Get the region of interest (ROI) for color detection
        roi = original[y:y + h, x:x + w]

        # Detect chip color
        detected_color = detect_chip_color(image, roi)

        # Estimate number of chips based on height
        single_chip_height = 30  # Adjust this value based on the typical height of a single chip
        estimated_chips = round(h / single_chip_height)

        # Draw text with the estimated count and chip color
        label = f'{detected_color} Chips: {estimated_chips}'
        cv2.putText(image, label, (x, y - 10), cv2.FONT_HERSHEY_SIMPLEX, 0.9, (0, 255, 0), 2)

        print(f"Estimated number of chips: {estimated_chips}, Color: {detected_color}")
    else:
        print("No chip stack detected")

    # Display results
    cv2.imshow("Original Image", original)
    cv2.imshow("Detected Chip Stack", image)
    cv2.waitKey(0)
    cv2.destroyAllWindows()


# Use the function
image_path = '/path/to/your/image.jpg'  # Replace with your image path
count_stacked_chips(image_path)
