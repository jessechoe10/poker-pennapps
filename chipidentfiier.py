import cv2
import numpy as np


def count_poker_chips(image_path):
    """Counts poker chips in an image from side profile, regardless of color.

    Args:
        image_path: Path to the image.

    Returns:
        The number of detected chips and the processed image with marked lines and contours.
    """

    # Load the image
    image = cv2.imread(image_path)

    # Convert to grayscale (ignore color since we are counting based on structure)
    gray_image = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)

    # Enhance contrast to make the separating lines more distinct
    clahe = cv2.createCLAHE(clipLimit=2.0, tileGridSize=(8, 8))
    enhanced_image = clahe.apply(gray_image)

    # Apply Gaussian blur to reduce noise and small details
    blurred_image = cv2.GaussianBlur(enhanced_image, (5, 5), 0)

    # Edge detection using Canny
    edges = cv2.Canny(blurred_image, 50, 150)

    # Detect lines using Hough Line Transform (focus on nearly horizontal lines)
    lines = cv2.HoughLinesP(edges, 1, np.pi / 180, threshold=50, minLineLength=100, maxLineGap=10)

    # Filter horizontal lines
    horizontal_lines = []
    if lines is not None:
        for line in lines:
            x1, y1, x2, y2 = line[0]
            if abs(y2 - y1) < 5:  # Assuming nearly horizontal (to capture chip boundaries)
                horizontal_lines.append((y1 + y2) / 2)

    # Sort lines and remove close duplicates (to avoid counting same chip twice)
    horizontal_lines.sort()
    filtered_lines = []
    if horizontal_lines:
        filtered_lines = [horizontal_lines[0]]
        for line in horizontal_lines[1:]:
            if line - filtered_lines[-1] > 10:  # Minimum gap between lines (chip thickness)
                filtered_lines.append(line)

    # Count chips based on lines
    line_based_count = len(filtered_lines) + 1

    # Contour-based detection (backup method)
    thresh = cv2.adaptiveThreshold(enhanced_image, 255, cv2.ADAPTIVE_THRESH_MEAN_C,
                                   cv2.THRESH_BINARY_INV, 11, 2)

    # Apply morphological operations to clean up the image
    kernel = np.ones((3, 3), np.uint8)
    morph_image = cv2.morphologyEx(thresh, cv2.MORPH_CLOSE, kernel, iterations=2)
    morph_image = cv2.morphologyEx(morph_image, cv2.MORPH_OPEN, kernel, iterations=1)

    # Find contours in the thresholded image
    contours, _ = cv2.findContours(morph_image, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)

    # Filter contours based on area and aspect ratio to detect chip-like shapes
    filtered_contours = []
    for contour in contours:
        area = cv2.contourArea(contour)
        x, y, w, h = cv2.boundingRect(contour)
        aspect_ratio = w / float(h)
        if area > 1000 and 0.2 < aspect_ratio < 5:  # Adjust thresholds as needed
            filtered_contours.append(contour)

    # Count chips based on contours
    contour_based_count = len(filtered_contours)

    # Final chip count (average of both methods)
    chip_count = (line_based_count + contour_based_count) // 2

    # Mark detected lines and contours on the image
    output_image = image.copy()
    for y in filtered_lines:
        cv2.line(output_image, (0, int(y)), (image.shape[1], int(y)), (0, 255, 0), 2)

    cv2.drawContours(output_image, filtered_contours, -1, (0, 0, 255), 2)

    return chip_count, output_image


# Example usage
image_path = 'Pokerchip/IMG_0017.JPG'  # Update the path to your image
chip_count, marked_image = count_poker_chips(image_path)
print(f"Detected number of chips: {chip_count}")

# Display or save the marked image
cv2.imshow('Marked Chips', marked_image)
cv2.waitKey(0)
cv2.destroyAllWindows()
