import { MixedAccountApi } from "./bitget/MixedAccountApi";

const bitgetApi = new MixedAccountApi('your_api_key', 'your_api_secret', 'your_api_passphrase');
bitgetApi.getAccount();