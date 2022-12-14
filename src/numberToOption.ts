/**
 * 
 * @param {*} number 
 * @returns 
 */

export const numberToOption = (number: number) => {
    const padded = number.toString().padStart(2, "0");

    return `<option value="${padded}">${padded}</option>`;
}