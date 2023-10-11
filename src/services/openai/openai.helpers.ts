export const getDefaultSystemMessageContent = ( context: string ): string => {
    const message = `
        You are a helpful question-answering system. Given some context, provide a truthful answer to the question given below.

        Context: <context>
    `;

    return message.replace( '<context>', context );
};