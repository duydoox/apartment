"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const formatDate = (month, year) => {
    const formatMonth = month;
    if (formatMonth >= 10)
        return `${year}-${formatMonth}`;
    return `${year}-0${formatMonth}`;
};
exports.default = formatDate;
