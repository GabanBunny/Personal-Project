from bs4 import BeautifulSoup
import requests

url = "https://webscraper.io/test-sites/e-commerce/allinone"
headers = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3"
}
page = requests.get(url, headers=headers)
print(page)
soup = BeautifulSoup(page.content, "html.parser")

divs = soup.find_all("div", attrs={"class":"caption"})

for div in divs:
    print(div.text)