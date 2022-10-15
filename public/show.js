import { buildPicker } from "./buildPicker.js";
import { checkRadioBtns } from "./checkRadioBtns.js";
/**
 *
 * @param {*} mweTimePickable
 * @returns
 */
export const show = (mweTimePickable) => {
    const zone = checkRadioBtns();
    const picker = buildPicker(mweTimePickable, zone);
    const { bottom: top, left } = mweTimePickable.getBoundingClientRect();
    picker.style.top = `${top}px`;
    picker.style.left = `${left}px`;
    document.body.appendChild(picker);
    return picker;
};
