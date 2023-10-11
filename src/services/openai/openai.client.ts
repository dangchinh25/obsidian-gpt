import { OpenAI, ClientOptions } from 'openai';

const clientOptions: ClientOptions = {
    apiKey: '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',
    dangerouslyAllowBrowser: true
};

export const openAIClient = new OpenAI( clientOptions );