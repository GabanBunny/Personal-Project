from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from webdriver_manager.chrome import ChromeDriverManager

def decode(url):
    # Setup WebDriver
    options = webdriver.ChromeOptions()
    options.add_argument("--headless")  # Run in headless mode (no UI)
    options.add_argument("--disable-blink-features=AutomationControlled")  # Avoid detection
    driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()), options=options)

    # Open the website
    driver.get(url)

    # Wait for elements to load dynamically (adjust timeout if needed)
    wait = WebDriverWait(driver, 15)
    
    try:
        # Target links inside the product listing grid
        product_titles = wait.until(EC.presence_of_all_elements_located((By.CSS_SELECTOR, "a.lazy_href[href*='/p/laptops']")))

        # Print only product names
        for product in product_titles:
            print(product.text.strip())
    except:
        print("No products found or page structure changed.")

    # Close browser
    driver.quit()

decode("https://www.lenovo.com/au/outlet/en/laptops/")
