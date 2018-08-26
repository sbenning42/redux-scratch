import { Action } from '@ngrx/store';
import { HubProduct } from '../state/hub-products-state';

export const HubProductsActionTypes = {
    HUBPRODUCTS_FETCH_REQUEST: 'HUBPRODUCTS_FETCH_REQUEST',
    HUBPRODUCTS_FETCH_RESPONSE: 'HUBPRODUCTS_FETCH_RESPONSE',
}

export class HubProductsFetchRequestAction implements Action {
    type = HubProductsActionTypes.HUBPRODUCTS_FETCH_REQUEST;
}
export class HubProductsFetchResponseAction implements Action {
    type = HubProductsActionTypes.HUBPRODUCTS_FETCH_RESPONSE;
    constructor(public hubProducts: HubProduct[]) {}
}


export type HubProductsActions = HubProductsFetchRequestAction
    |HubProductsFetchResponseAction;