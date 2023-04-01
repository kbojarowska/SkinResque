import requests

URL = 'http://www.colourlovers.com/api/palettes?format=json&hex='

headers = {
    'User-Agent': 'Mozilla/5.0'
}


def palette_finder(hexColor):
    response = requests.get(URL + hexColor, headers=headers)
    response.raise_for_status()
    if response.status_code != 204:
        return response.json()
