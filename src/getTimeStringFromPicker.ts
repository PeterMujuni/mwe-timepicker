import { getSelectsFromPicker } from "./getSelectsFromPicker.js"

/**
 * 
 * @param {*} timePicker 
 * @param {*} zone 
 * @returns 
 */

interface Selects {
    hour: Element
    minute: Element
    amPm?: Element
}

export const getTimeStringFromPicker = (timePicker: HTMLElement, zone: string) => {
    const selects: Selects | undefined = getSelectsFromPicker(timePicker, zone);
    if(zone === "12"){
        return `${(selects!.hour as HTMLInputElement).value}:${(selects!.minute as HTMLInputElement).value} ${(selects?.amPm as HTMLInputElement).value}` 
    }else if(zone === "24"){
        return `${(selects!.hour as HTMLInputElement).value}:${(selects!.minute as HTMLInputElement).value}`
    }
}