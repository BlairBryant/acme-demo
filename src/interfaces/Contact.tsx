// Would normally not have a separate file per interface. 
// I only needed to provide the data structure of a Contact so named the file accordingly.

export interface Contact {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    isFavorite: boolean;
}