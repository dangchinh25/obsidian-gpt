const messageRoles = [
    'assistant',
    'system',
    'user'
] as const;

export type MessageRole = typeof messageRoles[number];

export type Message = {
    content: string;
    role: MessageRole;
};