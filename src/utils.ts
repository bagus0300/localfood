import { ZodiaSymbols, ZodiacSigns } from "./constants";
import { IHouse } from "./interfaces";
import * as _ from "lodash";

export function pad2(n: number | string): string {
    return _.padStart(n + '', 2);
}
export function convert_DD_to_DMS(degrees: number, sign = "°") {
    var deg = degrees | 0;
    var frac = Math.abs(degrees - deg);
    var min = (frac * 60) | 0;
    var sec = Math.round(frac * 3600 - min * 60);
    return pad2(deg) + sign + pad2(min) + "'" + pad2(sec) + "\"";
}
export function pos_in_zodiac_sign(longitude: number): number {
    return longitude % 30;
}
export function zodiac_sign(longitude: number): string {
    return ZodiacSigns[Math.floor(longitude / 30)];
}
export function zodiac_symbol(longitude: number): string {
    return ZodiaSymbols[Math.floor(longitude / 30)];
}
export function format_pos_in_zodiac(longitude: number, sign_as_symbol: boolean = true): string {
    const sign = sign_as_symbol ? zodiac_symbol(longitude) : ' ' + zodiac_sign(longitude) + ' ';
    return convert_DD_to_DMS(pos_in_zodiac_sign(longitude), sign);
}
export function calculate_house(longitude: number, houses: IHouse[]): IHouse {  
    const houses_sorted = houses.sort((a: IHouse, b: IHouse) => a.position - b.position);
    for (let i = 0; i < 12 ; i++) {
        if (longitude < houses_sorted[i].position) {
            if (i == 0) {
                return houses_sorted[11];
            } else {
                return houses_sorted[i-1];
            }
        }        
    }
    return houses_sorted[11];
}