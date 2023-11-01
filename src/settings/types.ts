export type Settings = {
    openaiKey: string;
    openaiModel: string;
};

export const DEFAULT_SETTINGS: Partial<Settings> = {
    openaiKey: '<YOUR_OPENAI_API_KEY>',
    openaiModel: 'gpt-3.5-turbo-16k'
};
