import cv2
import numpy as np


def detect_poker_chips(image_path):
    # Load the image
    image = cv2.imread(image_path)
    if image is None:
        print("Error: Could not load image. Check the file path.")
        return None, 0

    # Convert to HSV to isolate red chips
    hsv_image = cv2.cvtColor(image, cv2.COLOR_BGR2HSV)

    # Define range for red color in HSV space
    lower_red1 = np.array([0, 70, 50])
    upper_red1 = np.array([10, 255, 255])
    lower_red2 = np.array([170, 70, 50])
    upper_red2 = np.array([180, 255, 255])

    # Create mask for red color
    mask1 = cv2.inRange(hsv_image, lower_red1, upper_red1)
    mask2 = cv2.inRange(hsv_image, lower_red2, upper_red2)
    red_mask = cv2.add(mask1, mask2)

    # Apply morphological operations to clean up the mask
    kernel = np.ones((5, 5), np.uint8)
    red_mask = cv2.morphologyEx(red_mask, cv2.MORPH_CLOSE, kernel, iterations=2)
    red_mask = cv2.morphologyEx(red_mask, cv2.MORPH_OPEN, kernel, iterations=1)

    # Find contours in the mask
    contours, _ = cv2.findContours(red_mask, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)

    # Filter contours based on area and aspect ratio
    min_area = 500  # Adjust based on your image size and chip size
    max_aspect_ratio = 2.5  # Maximum aspect ratio for a chip (height/width)
    chip_contours = []
    for cnt in contours:
        area = cv2.contourArea(cnt)
        if area > min_area:
            x, y, w, h = cv2.boundingRect(cnt)
            aspect_ratio = h / w
            if aspect_ratio < max_aspect_ratio:
                chip_contours.append(cnt)

    # Sort contours from top to bottom
    chip_contours = sorted(chip_contours, key=lambda c: cv2.boundingRect(c)[1])

    # Draw contours and count chips
    output_image = image.copy()
    chip_count = 0
    last_y = 0
    min_y_distance = 10  # Minimum vertical distance between chip centers

    for contour in chip_contours:
        # Get bounding rectangle
        x, y, w, h = cv2.boundingRect(contour)

        # Calculate center of the contour
        center_y = y + h // 2

        # Check if this chip is far enough from the last one
        if center_y - last_y > min_y_distance:
            cv2.rectangle(output_image, (x, y), (x + w, y + h), (0, 255, 0), 2)
            cv2.line(output_image, (0, center_y), (output_image.shape[1], center_y), (255, 0, 0), 1)
            chip_count += 1
            last_y = center_y

    print(f"Detected number of chips: {chip_count}")

    return output_image, chip_count


# Test the function with both images
image_path = ['/Users/arjunverma/PycharmProjects/Pokerchip/red_chips.JPG']
for path in image_path:
    result_image, count = detect_poker_chips(path)
    if result_image is not None:
        cv2.imshow(f'Detected Chips - {path}', result_image)
        cv2.waitKey(0)
        cv2.destroyAllWindows()

    # Save the output image
    output_path = f'/path/to/output_{path.split("/")[-1]}'
    cv2.imwrite(output_path, result_image)