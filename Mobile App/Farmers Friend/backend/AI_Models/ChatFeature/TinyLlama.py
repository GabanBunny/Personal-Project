# from transformers import AutoTokenizer, AutoModelForCausalLM, BitsAndBytesConfig
# import torch

# # Configure 4-bit quantization to reduce memory usage
# bnb_config = BitsAndBytesConfig(
#     # load_in_4bit=True,  # Enable 4-bit mode
#     load_in_8bit = True,
#     bnb_4bit_compute_dtype=torch.float16,  # Use float16 for computation
#     bnb_4bit_use_double_quant=True  # Reduce memory footprint further
# )

# tokenizer = AutoTokenizer.from_pretrained("tmmazen/mistral_7b_finetuned_medicinal_plants")
# model = AutoModelForCausalLM.from_pretrained("tmmazen/mistral_7b_finetuned_medicinal_plants")


# model.eval()
# print("Model is on device:", next(model.parameters()).device)

# def process_query(prompt):
#     input_ids = tokenizer(prompt, return_tensors="pt", truncation=True,padding=True).to("cuda")
    
#     with torch.no_grad():
#         output_tokens = model.generate(**input_ids,
#             max_new_tokens=20,  # Limit response size
#             temperature=0.2,  # Reduce randomness
#             do_sample=True,
#             top_k=50,  # Pick top 50 words instead of all words
#             top_p=0.9,  # Focus on high-probability words
#             repetition_penalty=1.6  # Avoid repeating "dises dises dises..."
#         )
    
#     response = tokenizer.decode(output_tokens[0], skip_special_tokens=True).strip()
#     return response

# def generate(diseaseOutput, maxWord, content):
    
#     prompt = (
#     f"### Task: Suggest a plant disease {content} prevention method\n"
#     f"**Plant Disease:** {diseaseOutput}\n"
#     f"**Response (Max {maxWord} words):**"
#     )
#     return process_query(prompt)
