import axios from "axios";

const GEMINI_API_KEY = "AIzaSyDnufdDei12UUqSM9mV_g4Ht5mMspYI3Qk";
const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${'AIzaSyDnufdDei12UUqSM9mV_g4Ht5mMspYI3Qk'}`;

export const getGeminiResponse = async (prompt) => {
    try {
        const response = await axios.post(GEMINI_API_URL, {
            contents: [{ parts: [{ text: prompt }] }]
        });

        return response.data.candidates[0]?.content?.parts[0]?.text || "No response from Gemini.";
    } catch (error) {
        console.error("Error fetching Gemini response:", error);
        return "Error fetching AI response.";
    }
};
