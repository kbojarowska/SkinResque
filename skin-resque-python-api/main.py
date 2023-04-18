import base64
import cv2
import numpy as np
from flask import Flask, request, jsonify, abort
from flask_cors import CORS
from face_detect import face_detect
from color_finder import color_finder
from palette_finder import palette_finder

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})


@app.route('/palettes', methods=['POST'])
def create_palettes():
    encoded_image = request.json['image'].split(',')[1]
    decoded_image = np.frombuffer(base64.b64decode(encoded_image), dtype=np.uint8)
    decoded_image = cv2.imdecode(decoded_image, cv2.IMREAD_COLOR)

    return_img = face_detect(decoded_image)
    if np.any(return_img):
        found_color = color_finder(return_img)
        palettes = palette_finder(found_color)
        return jsonify(palettes=palettes, skin=found_color)
    else:
        return app.response_class(
            status=400, response="Invalid data provided.", content_type="text/plain"
        )


if __name__ == '__main__':
    app.run(host="0.0.0.0", port=5100)
