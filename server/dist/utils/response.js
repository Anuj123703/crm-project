"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendResponse = void 0;
const sendResponse = (res, status, message, data = null) => {
    return res.status(status).json({
        success: true,
        message,
        data
    });
};
exports.sendResponse = sendResponse;
