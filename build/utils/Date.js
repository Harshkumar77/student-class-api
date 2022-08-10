"use strict";
exports.__esModule = true;
exports.dateIsValid = void 0;
function dateIsValid(dateStr) {
    var regex = /^\d{4}-\d{2}-\d{2}$/;
    if (dateStr.match(regex) === null) {
        return false;
    }
    var date = new Date(dateStr);
    var timestamp = date.getTime();
    if (typeof timestamp !== "number" || Number.isNaN(timestamp)) {
        return false;
    }
    return date.toISOString().startsWith(dateStr);
}
exports.dateIsValid = dateIsValid;
//# sourceMappingURL=Date.js.map