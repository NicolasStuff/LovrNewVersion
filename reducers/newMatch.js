export default function(newMatch = {}, action) {
    if(action.type == 'addNewMatch') {
        return action.newMatch;
    } else {
        return newMatch;
    }
}