import { OpenAI, ClientOptions } from 'openai';

export const createOpenAIClient = ( openAIKey: string ): OpenAI => {
    const clientOptions: ClientOptions = {
        apiKey: openAIKey,
        dangerouslyAllowBrowser: true
    };

    return new OpenAI( clientOptions );
};