const EventEmitter = require('events');

class InternalEventBus extends EventEmitter {}

// Singleton instance to be used across the entire backend
const eventBus = new InternalEventBus();

// Tăng giới hạn số lượng listeners nếu hệ thống phình to (mặc định là 10)
eventBus.setMaxListeners(50);

module.exports = eventBus;
