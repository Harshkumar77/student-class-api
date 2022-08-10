"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var class_routes_1 = __importDefault(require("./class.routes"));
var marks_routes_1 = __importDefault(require("./marks.routes"));
var student_routes_1 = __importDefault(require("./student.routes"));
var addRoutes = function (app) {
    app.use(marks_routes_1["default"]);
    app.use(class_routes_1["default"]);
    app.use(student_routes_1["default"]);
};
exports["default"] = addRoutes;
//# sourceMappingURL=index.js.map