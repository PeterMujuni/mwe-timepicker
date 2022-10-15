/**
 * 
 * @param {*} mweTimePickable 
 * @param {*} zone 
 * @returns 
 */

export const getTimePartsFromMweTimePickable = (mweTimePickable: HTMLInputElement, zone: string) => {
    if(zone === "12"){
        const pattern12 = /^(\d+):(\d+) (am|pm)$/;
        const [hour, minute, amPm] = Array.from(mweTimePickable.value.match(pattern12)!).splice(1);

        return {
            hour,
            minute,
            amPm
        }
    }else if(zone === "24"){
        const pattern24 = /(\d+):(\d+)/;
        const [hour, minute] = Array.from(mweTimePickable.value.match(pattern24)!).splice(1);

        return {
            hour,
            minute
        }
    }
}