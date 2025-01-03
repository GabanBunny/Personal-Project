export const OllamaImageDetection = async ({ base64Image }) => {
  try {
    const endpoint = "http://192.168.151.75:5000/api-ollama";
    const settings = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ base64Image: base64Image }),
    };

    const response = await fetch(endpoint, settings);
    const data = await response.json();
    if (response.ok) {
      console.log("Ollama response", data);
    } else {
      console.log("Server error", data);
    }
  } catch (error) {
    console.log("Error Calling Ollama API", error);
  }
};
