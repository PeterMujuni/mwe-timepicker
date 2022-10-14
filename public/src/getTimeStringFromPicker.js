import { getSelectsFromPicker } from "./getSelectsFromPicker.js"

/**
 * 
 * @param {*} timePicker 
 * @param {*} zone 
 * @returns 
 */

export const getTimeStringFromPicker = (timePicker, zone) => {
    const selects = getSelectsFromPicker(timePicker, zone);
    if(zone === "12"){
        return `${selects.hour.value}:${selects.minute.value} ${selects.amPm.value}` 
    }else if(zone === "24"){
        return `${selects.hour.value}:${selects.minute.value}`
    }
}