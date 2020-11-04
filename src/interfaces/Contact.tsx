// I only needed to provide the data structure of a Contact so named the file accordingly.

// Added message interface later on but left the file name Contact.tsx

export interface Contact {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    isFavorite: boolean;
}

export interface Message {
    id: number;
    sender_id: number;
    reciever_id: number;
    message: string;
    order: number;
}