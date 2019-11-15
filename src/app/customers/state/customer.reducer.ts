const initialState = {
    customers : [
        {
            "name": "jhon",
            "phone": "0933020818",
            "address": "tehran",
            "membership": "pro",
            "id": 1
        }     
    ],
    loading: false,
    loaded: true
}
export function customerReducer(state = initialState, action ){
    switch(action.type){
        case "LOAD_CUSTOMER": {
            return {
                ... state,
                loading: true,
                loaded: false
            }
        }
        default : {
            return state;
        }
    }
}