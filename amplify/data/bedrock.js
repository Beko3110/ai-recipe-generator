export function request(ctx) {
    const { ingredients = [] } = ctx.args;
  
    // Construct the prompt with the provided ingredients
    const prompt = `Your role is a Culinary AI Assistant and your task Given a list of ingredients, suggest a recipe idea that incorporates those ingredients harmoniously. Consider flavor profiles, textures, and cooking methods to create a balanced and delicious dish. The suggestion should be creative and adaptable to different dietary preferences or restrictions. Additionally, provide a detailed nutritional breakdown of the recipe, including the quantities of key nutrients such as calories, protein, carbohydrates, fats, and vitamins.
 using these ingredients: ${ingredients.join(", ")}.`;
  
    // Return the request configuration
    return {
      resourcePath: `/model/anthropic.claude-3-sonnet-20240229-v1:0/invoke`,
      method: "POST",
      params: {
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          anthropic_version: "bedrock-2023-05-31",
          max_tokens: 1000,
          messages: [
            {
              role: "user",
              content: [
                {
                  type: "text",
                  text: `\n\nHuman: ${prompt}\n\nAssistant:`,
                },
              ],
            },
          ],
        }),
      },
    };
  }
  
  export function response(ctx) {
    // Parse the response body
    const parsedBody = JSON.parse(ctx.result.body);
    // Extract the text content from the response
    const res = {
      body: parsedBody.content[0].text,
    };
    // Return the response
    return res;
  }