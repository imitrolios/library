"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const swaggerUi = __importStar(require("swagger-ui-express"));
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
function swaggerIgnite(applicationInstance) {
    const { PORT, APP_PATH } = process.env;
    // Swagger definition
    console.log(PORT !== null && PORT !== void 0 ? PORT : 4000);
    const swaggerDefinition = {
        info: {
            title: 'REST API for library-Backoffice',
            version: '1.0.0',
            description: 'This is the REST API for my library backoffice', // short description of the app
        },
        host: APP_PATH !== null && APP_PATH !== void 0 ? APP_PATH : 'localhost' + ':' + (PORT !== null && PORT !== void 0 ? PORT : 4000),
        basePath: '',
        schemes: [
            "http"
        ],
    };
    // options for the swagger docs
    const options = {
        // import swaggerDefinitions
        swaggerDefinition,
        // path to the API docs
        apis: ["./src/swagger/swagger-docs/**/*.yml"],
    };
    const swaggerSpec = (0, swagger_jsdoc_1.default)(options);
    applicationInstance.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}
exports.default = swaggerIgnite;
