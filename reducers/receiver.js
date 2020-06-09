export default function(receiver = '', action) {
    if(action.type == 'addReceiver') {
        return action.receiver;
    } else {
        return receiver;
    }
}