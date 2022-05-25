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
const typeorm_1 = require("typeorm");
const path_1 = __importDefault(require("path"));
const connectDB = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const connection = yield (0, typeorm_1.createConnection)({
            type: 'mysql',
            host: process.env.DB_HOST,
            port: parseInt(process.env.DB_PORT, 10),
            username: process.env.DB_USERNAME,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            logging: true,
            synchronize: true,
            entities: [
                path_1.default.join(__dirname, '..', '/entities/*.ts')
            ],
            migrations: [path_1.default.join(__dirname, '..', '/migrations/*')],
        });
        if (connection) {
            console.log('Database is connected');
        }
    }
    catch (error) {
        console.log(error);
    }
});
exports.default = connectDB;
