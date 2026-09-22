export interface ChatMessage{
    id: string;
    role:"user" | "assitant";
    content: string;
}