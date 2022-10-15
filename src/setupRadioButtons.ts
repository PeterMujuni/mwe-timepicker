/**
 * 
 */

export const setupRadioButtons = () => {
    
    document.querySelectorAll(".mwe-timezone").forEach(radioBtn => {
        radioBtn.addEventListener("change", ({target}: Event) => {
            if((target as HTMLInputElement).value === "12"){
                document.querySelectorAll(".mwe-timepickable").forEach(pickable => {
                    (pickable as HTMLInputElement).value = "01:00 am"
                })
            }else if ((target as HTMLInputElement).value === "24"){
                document.querySelectorAll(".mwe-timepickable").forEach(pickable => {
                    (pickable as HTMLInputElement).value = "01:00"
                })
            }
        })
    })
}