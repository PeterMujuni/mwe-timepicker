/**
 * 
 */

export const setupRadioButtons = () => {
    
    document.querySelectorAll(".mwe-timezone").forEach(radioBtn => {
        radioBtn.addEventListener("change", ({target}) => {
            console.log(target)
            if(target.value === "12"){
                document.querySelectorAll(".mwe-timepickable").forEach(pickable => {
                    pickable.value = "01:00 am"
                })
            }else if (target.value === "24"){
                document.querySelectorAll(".mwe-timepickable").forEach(pickable => {
                    pickable.value = "01:00"
                })
            }
        })
    })
}