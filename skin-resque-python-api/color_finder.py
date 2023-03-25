import cv2 as cv
import numpy as np

def rgbToHex(RGGBcolor):
    return '%02x%02x%02x' % RGGBcolor

def color_finder(photo_path):
	image = cv.imread(photo_path)
	image = cv.cvtColor(image, cv.COLOR_BGR2RGB)
	color_photo = image.copy()
	unique, counts = np.unique(color_photo.reshape(-1, 3), axis=0, return_counts=True)
	color_photo[:,:,0], color_photo[:,:,1], color_photo[:,:,2] = unique[np.argmax(counts)]
	RGBcolor = (color_photo[0][0][0], color_photo[0][0][1], color_photo[0][0][2])
	HEXcolor = rgbToHex(RGBcolor)
	return HEXcolor