import { buildPicker } from "./buildPicker"
import { checkRadioBtns } from "./checkRadioBtns"

/**
 * 
 * @param {*} mweTimePickable 
 * @returns 
 */

export const show = (mweTimePickable: HTMLInputElement) => {
    const zone: string = checkRadioBtns()!;
    
    const picker = buildPicker(mweTimePickable, zone);

    const { bottom: top, left } = mweTimePickable.getBoundingClientRect();
    picker.style.top = `${top}px`
    picker.style.left = `${left}px`

    document.body.appendChild(picker)
    
    return picker;
}