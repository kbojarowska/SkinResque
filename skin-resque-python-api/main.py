import base64

import cv2
import numpy as np
from flask import Flask, request, jsonify, abort
from face_detect import face_detect

app = Flask(__name__)


@app.route('/')
def hello():
    return 'Hello, World!'


@app.route('/palettes', methods=['POST'])
def create_palettes():
    encoded_image = request.json['image']

    decoded_image = np.frombuffer(base64.b64decode(encoded_image), dtype=np.uint8)
    decoded_image = cv2.imdecode(decoded_image, cv2.IMREAD_COLOR)

    return_img = face_detect(decoded_image)

    if np.any(return_img):
        return jsonify({'message': 'success'})
    else:
        abort(400, 'Invalid data provided')


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5100)
