import { Action } from '@ngrx/store';
import { HubProductsState, initialHubProductsState } from '../state/hub-products-state';
import {
    HubProductsActionTypes,
    HubProductsFetchRequestAction,
    HubProductsFetchResponseAction,
} from '../actions/hub-products-actions';

export const hubProductsReducer = (state: HubProductsState = initialHubProductsState, action: Action) => {
    switch (action.type) {
       
        case HubProductsActionTypes.HUBPRODUCTS_FETCH_RESPONSE:
            return {...state, fetched: true, collection: (<HubProductsFetchResponseAction>action).hubProducts};
        
        default:
            return state;
    }
}