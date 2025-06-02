from bs4 import BeautifulSoup
import requests

def decode(input):
    grid = {}
    x,y = None, None
    url = input
    headers = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3"
}
    page = requests.get(url, headers=headers)
    soup = BeautifulSoup(page.content, "html.parser")
    if(page.status_code == 200):
        table = soup.find_all("table")
        for idx, table in enumerate(table, start=1):
            rows = table.find_all("tr")[1:]
            len = 0
            key = 0
            for r in rows:
                data = r.find_all("span")
                for d in data:
                    info = d.get_text(strip=True)
                    if len == 0:
                        x = info
                    elif len == 1:
                        key = info 
                    elif len == 2:
                        y = info 
                    len = len + 1
                    if len == 3:
                        grid[(x,y)] = key
                        len = 0
                        key = 0
                        x = 0
                        y = 0
    grid = {(int(x), int(y)): char for (x, y), char in grid.items()}
    max_x = max(k[0] for k in grid.keys())
    max_y = max(k[1] for k in grid.keys())

    # Iterate over y in reverse order (from max_y down to 0)
    for y in range(max_y, -1, -1):  # Start from bottom row
        for x in range(max_x + 1):  # Left to right
            print(grid.get((x, y), ' '), end="")  # Print char or space
        print("")
# decode("https://docs.google.com/document/d/e/2PACX-1vRMx5YQlZNa3ra8dYYxmv-QIQ3YJe8tbI3kqcuC7lQiZm-CSEznKfN_HYNSpoXcZIV3Y_O3YoUB1ecq/pub")
decode("https://docs.google.com/document/d/e/2PACX-1vQGUck9HIFCyezsrBSnmENk5ieJuYwpt7YHYEzeNJkIb9OSDdx-ov2nRNReKQyey-cwJOoEKUhLmN9z/pub")