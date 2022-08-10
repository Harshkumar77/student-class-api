"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.classSchema = void 0;
var crypto_1 = require("crypto");
var mongoose_1 = __importDefault(require("mongoose"));
var Student_1 = require("./Student");
exports.classSchema = new mongoose_1["default"].Schema({
    name: { type: String, required: true, unique: true },
    students: {
        type: [Student_1.studentSchema],
        "default": []
    },
    year: {
        type: Number,
        required: true
    },
    classTeacher: {
        required: true,
        type: String
    },
    subjects: {
        type: [String],
        "default": []
    },
    totalStudents: {
        type: Number,
        "default": 0
    },
    classCode: {
        type: String,
        "default": (0, crypto_1.randomBytes)(5).toString("hex").slice(0, 3).toUpperCase(),
        unique: true,
        required: true
    }
});
exports.classSchema.virtual("newClassApiResponse").get(function () {
    return {
        name: this.name,
        year: this.year,
        classTeacher: this.classTeacher,
        subjects: this.subjects,
        classCode: this.classCode
    };
});
exports.classSchema.virtual("existingClassApiResponse").get(function () {
    return {
        name: this.name,
        year: this.year,
        classTeacher: this.classTeacher,
        subjects: this.subjects,
        classCode: this.classCode,
        totalStudents: this.totalStudents,
        students: this.students.map(function (student) { return student.apiResponse; })
    };
});
exports.classSchema.virtual("miniClassApiResponse").get(function () {
    return {
        name: this.name,
        year: this.year,
        classTeacher: this.classTeacher,
        subjects: this.subjects,
        classCode: this.classCode,
        totalStudents: this.totalStudents
    };
});
var Class = mongoose_1["default"].model("Class", exports.classSchema);
exports["default"] = Class;
//# sourceMappingURL=Class.js.map