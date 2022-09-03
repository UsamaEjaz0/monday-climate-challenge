export async function findInference(data) {
    try {
        const response = await fetch(
            "https://api-inference.huggingface.co/models/distilbert-base-uncased-finetuned-sst-2-english",
            {
                headers: {Authorization: "Bearer {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}"},
                method: "POST",
                body: JSON.stringify(data),
            }
        );
        return await response.json();
    }catch (e) {
        console.log("Exception in findInference():", e);
    }
}


