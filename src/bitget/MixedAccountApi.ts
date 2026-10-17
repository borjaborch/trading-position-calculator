import { BitgetApi } from './BitgetApi';

export class MixedAccountApi extends BitgetApi {
    getAccount() {
        // Implement the logic to get account information for mixed accounts
        this.signer.signRequest(new Request('https://api.bitget.com/api/mixed/v1/account'));
        console.log('Fetching mixed account information...');
    }   
}