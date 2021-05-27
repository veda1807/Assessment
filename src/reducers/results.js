const isResultReducer = (state = false, action) => {
    switch(action.type) {
        case 'RESULT':
            return true
        default :
            return state
    }
};

export default isResultReducer;