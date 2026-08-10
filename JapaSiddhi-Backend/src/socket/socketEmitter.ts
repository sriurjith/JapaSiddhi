import { getSocketIO } from './socketServer';
import { SOCKET_EVENTS } from './socketEvents';

class SocketEmitter {

    emitGlobalCount(totalCount: number) {

        getSocketIO().emit(
            SOCKET_EVENTS.GLOBAL_COUNT_UPDATED,
            {
                totalCount,
            }
        );

    }

}

export default new SocketEmitter();