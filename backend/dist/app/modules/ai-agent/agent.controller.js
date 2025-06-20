"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.agentController = void 0;
const agent_service_1 = require("./agent.service");
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const agentChat = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        const inputText = (_a = req === null || req === void 0 ? void 0 : req.body) === null || _a === void 0 ? void 0 : _a.message;
        const history = ((_b = req === null || req === void 0 ? void 0 : req.body) === null || _b === void 0 ? void 0 : _b.history) || [];
        console.log("Received message:", inputText);
        console.log("Received history:", history);
        if (!inputText) {
            return (0, sendResponse_1.default)(res, {
                success: false,
                statusCode: 400,
                data: null,
                message: "Message is required"
            });
        }
        const result = yield agent_service_1.agentServices.textGenerate(inputText, history);
        (0, sendResponse_1.default)(res, {
            success: true,
            statusCode: 200,
            data: result,
            message: "Request resolved successfully"
        });
    }
    catch (error) {
        console.error("Error in agentChat:", error);
        (0, sendResponse_1.default)(res, {
            success: false,
            statusCode: 500,
            data: null,
            message: "Internal server error"
        });
    }
});
exports.agentController = {
    agentChat,
};
