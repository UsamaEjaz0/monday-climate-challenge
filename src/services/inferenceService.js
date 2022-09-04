export async function findInference(data) {
    try {
        const response = await fetch(
            "https://api-inference.huggingface.co/models/Usamaejaz0/climate-sentiment-analysis-monday-hackathon",
            {
                headers: {Authorization: "Bearer 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"},
                method: "POST",
                body: JSON.stringify(data),
            }
        );
        return await response.json();
    }catch (e) {
        console.log("Exception in findInference():", e);
    }
}


