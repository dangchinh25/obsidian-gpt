import { OpenAI as Client, ClientOptions } from 'openai';
import OpenAI from 'openai';
import {
    Either, error, success
} from '../../types';

export class OpenAIClient {
    openAIClient: Client;
    openAIModel: string;

    public constructor (
        openAIKey: string,
        openAIModel: string
    ) {
        const clientOptions: ClientOptions = {
            apiKey: openAIKey,
            dangerouslyAllowBrowser: true
        };

        this.openAIClient = new Client( clientOptions );
        this.openAIModel = openAIModel;
    }

    async getChatCompletion (
        messages: OpenAI.Chat.ChatCompletionMessageParam[]
    ): Promise<Either<Error, OpenAI.Chat.ChatCompletionMessage>> {

        let responseMessage: OpenAI.Chat.ChatCompletionMessage = {
            role: 'assistant',
            content: ''
        };

        try {
            const openAIResponse = await this.openAIClient.chat.completions.create( {
                model: this.openAIModel,
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
    }
}