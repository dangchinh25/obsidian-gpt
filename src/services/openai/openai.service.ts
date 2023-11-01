import OpenAi from 'openai';
import {
    Either,  error, success
} from '../../types';

export const getChatCompletion = async (
    openAIClient: OpenAi,
    messages: OpenAi.Chat.ChatCompletionMessageParam[]
): Promise<Either<Error, OpenAi.Chat.ChatCompletionMessage>> => {
    let responseMessage: OpenAi.Chat.ChatCompletionMessage = {
        role: 'assistant',
        content: ''
    };

    try {
        const openAIResponse = await openAIClient.chat.completions.create( {
            model: 'gpt-3.5-turbo-16k',
            // model: 'gpt-4',
            messages: messages,
            stream: false
        } );

        if ( openAIResponse.choices[ 0 ].message ) {
            responseMessage = openAIResponse.choices[ 0 ].message;
        }
    } catch ( err ) {
        console.error( err );
        return error( new Error( 'Open AI request error' ) );
    }

    return success( responseMessage );
};