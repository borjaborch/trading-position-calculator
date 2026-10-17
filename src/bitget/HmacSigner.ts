import type { Signer } from "./Signer";

export class HmacSigner implements Signer {
    signRequest(request: Request): string {
        // Implement the logic to sign the request
        const timestamp = Date.now().toString();
        const method = request.method.toUpperCase();
        const requestPath = new URL(request.url).pathname;
        const queryString = new URL(request.url).search;
        return timestamp + method + requestPath + queryString;
    }
}