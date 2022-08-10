"use strict";
exports.__esModule = true;
exports.expirationDate = exports.dateIsValid = void 0;
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
function expirationDate() {
    var today = new Date();
    var thirty_days_from_now = new Date().setDate(today.getDate() + 30);
    return thirty_days_from_now;
}
exports.expirationDate = expirationDate;
//# sourceMappingURL=Date.js.map