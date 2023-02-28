import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class DateUtils {
    constructor() {}

    private jsonattr = ['date', 'month', 'year', 'hour', 'minute', 'second'];

    dateToJson(fecha: Date) {
        if (fecha) {
            var date = fecha.getUTCDate();
            var month = fecha.getUTCMonth() + 1;
            var year = fecha.getFullYear();

            return {
                date: (date < 10 ? `0${date}` : date).toString(),
                month: (month < 10 ? `0${month}` : month).toString(),
                year: year.toString(),
            };
        } else return undefined;
    }

    dateToJson_Full(fecha: Date) {
        if (fecha) {
            var date = fecha.getUTCDate();
            var month = fecha.getUTCMonth() + 1;
            var year = fecha.getFullYear();
            var hour = fecha.getUTCHours();
            var minute = fecha.getUTCMinutes();
            var second = fecha.getUTCSeconds();

            return {
                date: (date < 10 ? `0${date}` : date).toString(),
                month: (month < 10 ? `0${month}` : month).toString(),
                year: year.toString(),
                hour: (hour < 10 ? `0${hour}` : hour).toString(),
                minute: (minute < 10 ? `0${minute}` : minute).toString(),
                second: (second < 10 ? `0${second}` : second).toString(),
            };
        } else return undefined;
    }

    dateToNumber(fecha: Date) {
        if (fecha) {
            var date = fecha.getUTCDate();
            var month = fecha.getUTCMonth() + 1;
            var year = fecha.getFullYear();

            return parseInt(
                `${year}${month < 10 ? '0' + month : month}${
                    date < 10 ? '0' + date : date
                }`
            );
        } else return undefined;
    }

    dateToString(fecha: Date) {
        if (fecha) {
            var date = fecha.getUTCDate();
            var month = fecha.getUTCMonth() + 1;
            var year = fecha.getFullYear();

            return `${year}-${month < 10 ? '0' + month : month}-${
                date < 10 ? '0' + date : date
            }`;
        } else return undefined;
    }

    dateToString_Full(fecha: Date) {
        if (fecha) {
            var date = fecha.getUTCDate();
            var month = fecha.getUTCMonth() + 1;
            var year = fecha.getFullYear();
            var hour = fecha.getUTCHours();
            var minute = fecha.getUTCMinutes();
            var second = fecha.getUTCSeconds();

            return `${year}-${month < 10 ? '0' + month : month}-${
                date < 10 ? '0' + date : date
            } ${hour < 10 ? '0' + hour : hour}:${
                minute < 10 ? '0' + minute : minute
            }:${second < 10 ? '0' + second : second}`;
        } else return undefined;
    }

    jsonToDate(json) {
        try {
            if (json) {
                for (const key in json) {
                    if (!this.jsonattr.includes(key)) {
                        throw 'bad-json';
                    }
                }
                return new Date(
                    parseInt(json.year),
                    parseInt(json.month) - 1,
                    parseInt(json.date),
                    0,
                    0,
                    0,
                    0
                );
            } else return null;
        } catch (e) {
            return null;
        }
    }

    jsonToDate_Full(json) {
        try {
            if (json) {
                for (const key in json) {
                    if (!this.jsonattr.includes(key)) {
                        throw 'bad-json';
                    }
                }
                return new Date(
                    parseInt(json.year),
                    parseInt(json.month) - 1,
                    parseInt(json.date),
                    parseInt(json.hour),
                    parseInt(json.minute),
                    parseInt(json.second),
                    0
                );
            } else return null;
        } catch (e) {
            return null;
        }
    }

    jsonToNumber(json) {
        try {
            if (json) {
                for (const key in json) {
                    if (!this.jsonattr.includes(key)) {
                        throw 'bad-json';
                    }
                }
                return parseInt(
                    `${json.year}${
                        json.month < 10 ? '0' + json.month : json.month
                    }${json.date < 10 ? '0' + json.date : json.date}`
                );
            } else return undefined;
        } catch (e) {
            return undefined;
        }
    }

    jsonToString(json) {
        try {
            if (json) {
                for (const key in json) {
                    if (!this.jsonattr.includes(key)) {
                        throw 'bad-json';
                    }
                }
                return `${json.year}-${json.month}-${json.date}`;
            } else return undefined;
        } catch (e) {
            return undefined;
        }
    }

    jsonToString_Full(json) {
        try {
            if (json) {
                for (const key in json) {
                    if (!this.jsonattr.includes(key)) {
                        throw 'bad-json';
                    }
                }
                return `${json.year}-${json.month}-${json.date} ${json.hour}:${json.minute}:${json.second}`;
            } else return undefined;
        } catch (e) {
            return undefined;
        }
    }

    numberToDate(num: number) {
        try {
            if (num) {
                return this.jsonToDate(this.numberToJson(num));
            } else return null;
        } catch (e) {
            return null;
        }
    }

    numberToJson(num: number) {
        try {
            if (num) {
                return {
                    year: num.toString().substr(0, 4),
                    month: num.toString().substr(4, 2),
                    date: num.toString().substr(6, 2),
                };
            } else return undefined;
        } catch (e) {
            return undefined;
        }
    }
}
