export interface Signer {
    signRequest(request: Request): string;
}