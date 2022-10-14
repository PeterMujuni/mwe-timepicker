/**
 * 
 * @returns 
 */

export const checkRadioBtns = () => {
    let timeZone;
    document.querySelectorAll(".mwe-timezone").forEach(zone => {
        
        if(zone.checked){
            timeZone = zone.value      
        }
          
    });
    return timeZone
}