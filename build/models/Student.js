"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.studentSchema = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
var Date_1 = require("../utils/Date");
exports.studentSchema = new mongoose_1["default"].Schema({
    name: { type: String, required: true },
    dateOfBirth: { type: Date, required: true },
    "class": { ref: "Class", type: mongoose_1["default"].Types.ObjectId, required: true },
    accountCreated: {
        type: Date,
        "default": Date.now()
    },
    expirationDate: {
        type: Date,
        "default": (0, Date_1.expirationDate)()
    },
    studentId: { type: String, required: true },
    marks: {
        type: (Map),
        "default": new Map(),
        required: true
    },
    password: {
        type: String
    },
    rollNumber: {
        type: Number,
        required: true
    }
});
exports.studentSchema.virtual("apiResponse").get(function () {
    return {
        name: this.name,
        studentId: this.studentId,
        rollNumber: this.rollNumber,
        marks: this.marks,
        dob: this.dateOfBirth
    };
});
var Student = mongoose_1["default"].model("Student", exports.studentSchema);
exports["default"] = Student;
//# sourceMappingURL=Student.js.map