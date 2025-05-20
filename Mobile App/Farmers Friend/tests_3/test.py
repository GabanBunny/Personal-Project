import random
label_map = {}
labels = ['Apple___alternaria_leaf_spot', 'Apple___black_rot', 'Apple___brown_spot', 'Apple___gray_spot', 'Apple___healthy', 'Apple___rust', 'Apple___scab', 'Bell_pepper___bacterial_spot', 'Bell_pepper___healthy', 'Blueberry___healthy', 'Cassava___bacterial_blight', 'Cassava___brown_streak_disease', 'Cassava___green_mottle', 'Cassava___healthy', 'Cassava___mosaic_disease', 'Cherry___healthy', 'Cherry___powdery_mildew', 'Coffee___healthy', 'Coffee___red_spider_mite', 'Coffee___rust', 'Corn___common_rust', 'Corn___gray_leaf_spot', 'Corn___healthy', 'Corn___northern_leaf_blight', 'Grape___black_measles', 'Grape___black_rot', 'Grape___healthy', 'Grape___Leaf_blight', 'Orange___citrus_greening', 'Peach___bacterial_spot', 'Peach___healthy', 'Potato___bacterial_wilt', 'Potato___early_blight', 'Potato___healthy', 'Potato___late_blight', 'Potato___leafroll_virus', 'Potato___mosaic_virus']
for idx, label in enumerate(labels):
    label_map[label] = idx

shuffled_items = list(label_map.items())
random.shuffle(shuffled_items)

# Convert shuffled list back to dictionary
label_map = dict(shuffled_items)

# print(list(label_map.keys()))
# print(list(label_map.values()))
print(list(label_map.items()))
