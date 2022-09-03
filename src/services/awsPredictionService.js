export async function findSageMakerInference(data) {
    try {
        const response = await fetch(
            "https://0gv9s8vzfa.execute-api.us-east-1.amazonaws.com/test/mondayresource",
            {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                mode: 'cors',
                body: JSON.stringify(data),
            }
        );

        return  JSON.parse((await response.json()).body)[0];

    } catch (e) {
        console.log("Exception in findSageMakerInference():", e);
    }
}


