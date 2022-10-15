import { getSelectsFromPicker } from "./getSelectsFromPicker.js";
import { getTimeStringFromPicker } from "./getTimeStringFromPicker.js";
import { numberToOption } from "./numberToOption.js";
import { getTimePartsFromMweTimePickable } from "./getTimePartsFromMweTimePickable.js";

/**
 * 
 * @param {*} mweTimePickable 
 * @param {*} zone 
 * @returns 
 */

export const buildPicker = (mweTimePickable: HTMLInputElement, zone: string) => {
    const picker = document.createElement("div");
    let hourOptions: string[] = [];

    const minutesOptions = [0,5,10,15,20,25,30,35,40,45,50,55].map(numberToOption);
    if(zone === "12"){
        hourOptions = [1,2,3,4,5,6,7,8,9,10,11,12].map(numberToOption);
    } else if(zone === "24") {
        hourOptions = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24].map(numberToOption);
    }

    picker.classList.add("time-picker");
    picker.innerHTML = `
        <select class="time-picker__select">
            ${hourOptions.join("")}
        </select>
        :
        <select class="time-picker__select">
            ${minutesOptions.join("")}
        </select>
        <select class="time-picker__select" ${zone === "24" && "style='display: none'"}>
            <option value="am">AM</option>
            <option value="pm">PM</option>
        </select>
    `;
    interface Selects {
        hour: Element
        minute: Element
        amPm?: Element
    }
    
    const selects: Selects | undefined = getSelectsFromPicker(picker, zone)

    selects!.hour.addEventListener("change", () => mweTimePickable.value = getTimeStringFromPicker(picker, zone)!)
    selects!.minute.addEventListener("change", () => mweTimePickable.value = getTimeStringFromPicker(picker, zone)!)
    if(zone === "12"){
        selects!.amPm?.addEventListener("change", () => mweTimePickable.value = getTimeStringFromPicker(picker, zone)!)
    }

    interface Times {
        hour: string
        minute: string
        amPm?: string
    }

    if(mweTimePickable.value){
        if(zone === "12"){
            const { hour, minute, amPm }: Times = getTimePartsFromMweTimePickable(mweTimePickable, zone)!;
            (selects!.hour as HTMLInputElement).value = hour;
            (selects!.minute as HTMLInputElement).value = minute;
            (selects!.amPm as HTMLInputElement).value = amPm!;
        }else if(zone === "24") {
            const { hour, minute }: Times = getTimePartsFromMweTimePickable(mweTimePickable, zone)!;
            (selects!.hour as HTMLInputElement).value = hour;
            (selects!.minute as HTMLInputElement).value = minute;  
        }

    }

    return picker;
}