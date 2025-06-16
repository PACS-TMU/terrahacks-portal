export type User = {
    id: string;
    email: string;
    user_metadata: {
        full_name: string;
        [key: string]: any; // Additional metadata fields can be added here
    };
}