"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.configureApp = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
var express_1 = __importDefault(require("express"));
var morgan_1 = __importDefault(require("morgan"));
var routes_1 = __importDefault(require("../routes"));
var configureApp = function (app) {
    app.use(express_1["default"].urlencoded({ extended: false }));
    app.use(express_1["default"].json());
    app.use((0, morgan_1["default"])("dev"));
    app.use(express_1["default"].static("dist"));
    var _a = process.env, DATABASE_URL = _a.DATABASE_URL, PORT = _a.PORT;
    if (!DATABASE_URL || !PORT)
        throw Error("Check enviornment variables");
    app.listen(PORT, function () {
        return console.log("Server started at http://localhost:".concat(PORT));
    });
    (0, routes_1["default"])(app);
    mongoose_1["default"].connect(DATABASE_URL, function (err) {
        if (err)
            console.error(err.message);
        else
            console.log("Connected to database");
    });
};
exports.configureApp = configureApp;
//# sourceMappingURL=express.config.js.map