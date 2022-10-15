/**
 * 
 * @returns 
 */

export const checkRadioBtns = () => {
    let timeZone;
    document.querySelectorAll(".mwe-timezone").forEach(zone => {
        
        if((zone as HTMLInputElement).checked){
            timeZone = (zone as HTMLInputElement).value      
        }
          
    });
    return timeZone
}