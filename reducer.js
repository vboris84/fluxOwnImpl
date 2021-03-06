/**
 * Created by boris on 04/21/18.
 */
function updateState(state, action = {} ){
    const amount = 1;
    switch (action.type){
        case "INCREMENT":
            return Object.assign({}, state, { count: state.count + (action.amount || amount)});
        case "DECREMENT":
            return Object.assign({}, state, { count: state.count - (action.amount || amount)});
        default:
            return state;
    }
}

class Store {
    constructor(updateState, state){
        this._updateState = updateState;
        this._state = state;
        this._callbacks = [];
    }
    get state() {
        return this._state;
    }
    update(action){
        this._state = this._updateState(this._state, action);
        this._callbacks.forEach(cb => cb());
    }
    subscribe(callback){
        this._callbacks.push(callback);
        return () =>  this._callbacks = this._callbacks.filter(cb => cb !== callback);
    }
}
const store = new Store(updateState, {count: 0, name: 'barrels'});

const incrementAction = { type: "INCREMENT", amount: 5 };
const decrementAction = { type: "DECREMENT", amount: 3 };

let unsubscribe = store.subscribe(() => console.log('State changed 1: ', store.state));
store.subscribe(() => console.log('State changed 2: ', store.state));
store.update(incrementAction);
store.update(decrementAction);
unsubscribe();
store.update({});
