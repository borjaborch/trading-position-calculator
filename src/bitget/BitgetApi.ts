import { HmacSigner } from "./HmacSigner";
import type { Signer } from "./Signer";

export class BitgetApi {
    protected config: { apiKey: string; apiSecret: string; apiPassphrase: string };
    protected signer: Signer;

    constructor(apiKey: string, apiSecret: string, apiPassphrase: string, signer: Signer = new HmacSigner()) {
        this.config = {
            apiKey: apiKey,
            apiSecret: apiSecret,
            apiPassphrase: apiPassphrase
        };
        this.signer = signer;
    }

    getConfig() {
        return this.config;
    }
}