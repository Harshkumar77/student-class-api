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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = require("express");
var Class_1 = __importDefault(require("../models/Class"));
var Student_1 = __importDefault(require("../models/Student"));
var bcrypt_1 = require("bcrypt");
var Date_1 = require("../utils/Date");
var studentRouter = (0, express_1.Router)();
studentRouter.post("/api/student", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _class, marks, newStudent, _a, _b;
    var _c;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                if (!req.body["class"] || !req.body.name || !req.body.dob || !req.body.password)
                    return [2 /*return*/, res.status(400).send({
                            message: "Please Provide class , student name , dob (YYYY-MM-DD) and password"
                        })];
                if (!(0, Date_1.dateIsValid)(req.body.dob))
                    return [2 /*return*/, res.status(400).send({
                            message: "Format dob correctly (YYYY-MM-DD)"
                        })];
                return [4 /*yield*/, Class_1["default"].findOne({ name: req.body["class"] })];
            case 1:
                _class = _d.sent();
                if (!_class)
                    return [2 /*return*/, res.status(400).send({
                            message: "Please provide correct class"
                        })];
                _class.totalStudents++;
                marks = new Map();
                _class.subjects.forEach(function (subject) { return marks.set(subject, -1); });
                console.log(typeof new Date(req.body.dob));
                _b = (_a = Student_1["default"]).create;
                _c = {
                    name: req.body.name,
                    "class": _class.id,
                    dateOfBirth: new Date(req.body.dob),
                    rollNumber: _class.totalStudents,
                    studentId: "".concat(_class.classCode, "_").concat(_class.totalStudents)
                };
                return [4 /*yield*/, (0, bcrypt_1.hash)(req.body.password, 4)];
            case 2: return [4 /*yield*/, _b.apply(_a, [(_c.password = _d.sent(),
                        _c.marks = marks,
                        _c)])];
            case 3:
                newStudent = _d.sent();
                res.status(201).send(newStudent);
                _class.students.push(newStudent);
                _class.save();
                return [2 /*return*/];
        }
    });
}); });
studentRouter.post("/api/student/activate", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        if (!req.body.studentId || !req.body.oldPassword || !req.body.newPassword)
            return [2 /*return*/, res.status(400).send({
                    message: "Please provide old password , new password and studentId"
                })];
        return [2 /*return*/];
    });
}); });
exports["default"] = studentRouter;
//# sourceMappingURL=student.routes.js.map