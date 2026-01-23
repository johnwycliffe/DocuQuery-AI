export type DocStatus = 'uploading' | 'indexing' | 'ready';

export interface Document {
    id: string;
    name: string;
    status: DocStatus;
    uploadProgress?: number;
}

export interface Source {
    id: string;
    docId: string;
    docName: string;
    page: number;
    text: string;
}

export interface Message {
    id: string;
    role: 'user' | 'ai';
    content: string;
    timestamp: Date;
    sources?: Source[];
}

export const mockDocuments: Document[] = [];

export const mockChatHistory: Message[] = [];
