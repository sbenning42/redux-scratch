import { HubProduct } from '../../../../providers/hub-products/hub-products';
export { HubProduct } from '../../../../providers/hub-products/hub-products';

export interface HubProductsState {
    fetched: boolean;
    collection: HubProduct[];
}

export const initialHubProductsState: HubProductsState = {
    fetched: false,
    collection: [],
};