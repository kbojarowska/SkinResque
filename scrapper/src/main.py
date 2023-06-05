from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from bs4 import BeautifulSoup
import json

from src.skinTypeRecommendation import skinTypeRecommendation

chrome_options = Options()
chrome_options.add_argument("--headless")
service = Service('/dependencies/chromedriver.exe')
driver = webdriver.Chrome(service=service, options=chrome_options)

data = []

for page in range(1, 12):
    url = f'https://naturalbeautyworkshop.com/my_weblog/category/recipes/facial-recipes/page/{page}'
    driver.get(url)
    WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.CLASS_NAME, 'entry-header')))
    soup = BeautifulSoup(driver.page_source, 'html.parser')
    entries = soup.find_all('article', class_='post')
    for entry in entries:
        name = entry.find('h2', class_='entry-title').text.strip()
        image = entry.find('img')['src']
        subpage_url = entry.find('a')['href']
        driver.get(subpage_url)
        WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.CLASS_NAME, 'entry-header')))
        subpage_soup = BeautifulSoup(driver.page_source, 'html.parser')
        info_element = subpage_soup.find('em')
        info = info_element.text.strip() if info_element else ""
        ingredients_element = subpage_soup.find('div', class_='entry-content').find('ul')
        ingredients = [li.text.strip() for li in ingredients_element.find_all(
            'li')] if ingredients_element else []
        recipe_element = subpage_soup.find('div', class_='entry-content').find(['ol'])
        recipe = [li.text.strip() for li in recipe_element.find_all(
            'li')] if recipe_element else []
        recommendation = skinTypeRecommendation(info)
        if name and image and ingredients and recipe:
            recipe_data = {
                'name': name,
                'description': info,
                'photo': image,
                'skinTypeRecommendation': recommendation,
                'ingredients': ingredients,
                'recipe': recipe
            }
            data.append(recipe_data)

json_data = json.dumps(data, indent=4)
with open('cosmetics.json', 'w') as f:
    f.write(json_data)

driver.quit()
