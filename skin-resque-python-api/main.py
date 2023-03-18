from flask import Flask
import cv2

app = Flask(__name__)


def face_detect(photo_path):
    image = cv2.imread(photo_path)
    face_cascade = cv2.CascadeClassifier("haarcascade_fontalface_default.xml")

    gray_img = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    faces_detected = face_cascade.detectMultiScale(
        gray_img,
        scaleFactor=1.1,
        minNeighbors=5,
        minSize=(30, 30),
        flags=cv2.CASCADE_SCALE_IMAGE
    )

    for (x, y, w, h) in faces_detected:
        cv2.rectangle(image, (x, y), (x + w, y + h), (0, 255, 0), 2)

    cv2.imshow("Faces found", image)
    cv2.waitKey(0)


@app.route('/')
def hello():
    return 'Hello, World!'


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5100)
