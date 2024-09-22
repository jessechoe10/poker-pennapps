import cv2
import numpy as np

#CROPS IMAGE
image = cv2.imread('image path')

w = 800
h = 600
image = cv2.resize(image, (w, h))

gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
blurred = cv2.GaussianBlur(gray, (5, 5), 0)
thresh = cv2.adaptiveThreshold(blurred, 255, cv2.ADAPTIVE_THRESH_GAUSSIAN_C,
                               cv2.THRESH_BINARY_INV, 11, 2)

contours, _ = cv2.findContours(thresh, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)

if contours:
    largest_contour = max(contours, key=cv2.contourArea)

    # Draw a bounding box around the largest contour
    if cv2.contourArea(largest_contour) > 100:  # Filter out small areas
        x, y, w, h = cv2.boundingRect(largest_contour)
        cv2.rectangle(image, (x, y), (x + w, y + h), (0, 255, 0), 2)

cv2.imshow('Bounding Box', image)
cv2.waitKey(0)
cv2.destroyAllWindows()

cropped_image = image[y:y + h, x:x + w]
image = cropped_image


#GRAYSCALES AND THRESHOLDS IMAGE
image =  cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)

_, thresh = cv2.threshold(image, 80, 255, cv2.THRESH_BINARY)
kernel = np.ones((5, 5), np.uint8)  # Increase the kernel size for more shrinking effect

eroded = cv2.erode(thresh, kernel, iterations=2)  # Increase iterations for further shrinking

cv2.imshow("Original", thresh)
cv2.imshow("Eroded White Areas", eroded)
cv2.waitKey(0)
cv2.destroyAllWindows()

cv2.imwrite('eroded_image.jpg', eroded)



#CONTOUR MANIPULATION

image =  cv2.imread('eroded_image.jpg')
cv2.imshow("Eroded White Areas P2", image)

edges = cv2.Canny(thresh, 50, 150)
contours, _ = cv2.findContours(edges, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)

def find_centroid(contour):
    moments = cv2.moments(contour)

    if moments["m00"] != 0:  # To avoid division by zero
        cx = int(moments["m10"] / moments["m00"])  # x coordinate of the centroid
        cy = int(moments["m01"] / moments["m00"])  # y coordinate of the centroid
    else:
        # If contour area is zero, fallback to mean of contour points
        cx, cy = np.mean(contour, axis=0)[0]

    return (cx, cy)


# Function to find the minimum distance from the centroid to the contour points
def find_min_distance(centroid, contour):
    min_distance = float('inf')  # Start with a large value for minimum distance

    # Iterate over each point in the contour and calculate the distance to the centroid
    for point in contour:
        distance = cv2.pointPolygonTest(contour, (centroid[0], centroid[1]), True)
        min_distance = min(min_distance, abs(distance))  # Keep track of the smallest distance

    return min_distance

new_contours = []
for i in contours:
    print("Contour", i)
    min_dist = find_min_distance(find_centroid(i), i)
    print("min distance", min_dist)
    print(len(i))
    if min_dist > 1:
        new_contours.append(i)


large_regions = []
min_area = 1  # Adjust this value based on your specific needs


for contour in contours:
    area = cv2.contourArea(contour)
    if area > min_area:  # Keep only large contours
        large_regions.append(contour)

contours = large_regions




#DRAW THE CONTOURS
thresh_contours = image
cv2.drawContours(thresh_contours, contours, -1, (0, 255, 0), 2)

centroids = [find_centroid(i) for i in contours ]
for (x, y) in centroids:
    cv2.circle(thresh_contours, (x, y), radius=5, color=(255, 0, 0), thickness=-1) 

cv2.imshow('Grayscale Image', gray)
cv2.imshow('Threshold Image with Contours', thresh_contours) 

cv2.waitKey(0)
cv2.destroyAllWindows()
