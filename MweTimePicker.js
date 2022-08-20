export const activate = () => {
    document.head.insertAdjacentHTML("beforeend",`
        <style>
        .time-picker {
            position: absolute;
            display: inline-block;
            padding: 0.625rem;
            border-radius:  0;
            background-color: #eee;
        }
        .time-picker__select {
            /* -webkit-appearance: none;
            -moz-appearance: none; */
            appearance: none;
            outline: none;
            text-align: center;
            border: 1px solid #ddd;
            border-radius: 6px;
            padding: 6px 10px;
            background-color: white;
            cursor: pointer;
            font-family: "Source Sans Pro", sans-serif;
        }
        </style>
    `);

    document.querySelectorAll(".mwe-timepickable").forEach(mweTimePickable => {
     let activePicker = null;

        mweTimePickable.addEventListener("focus", () => {
            if(activePicker) return;

            activePicker = show(mweTimePickable);
            
            const onClickAway = ({ target }) => {
                if (target === activePicker || target === mweTimePickable || activePicker.contains(target)){
                    return;
                }
                document.removeEventListener("mousedown", onClickAway);
                document.body.removeChild(activePicker);
                activePicker = null
            };

            document.addEventListener("mousedown", onClickAway)
        });
    }); 
}

const checkRadioBtns = () => {
    let timeZone;
    document.querySelectorAll(".mwe-timezone").forEach(zone => {
        
        if(zone.checked){
            timeZone = zone.value      
        }
          
    });
    return timeZone
}

const show = (mweTimePickable) => {
    const zone = checkRadioBtns();
    
    const picker = buildPicker(mweTimePickable, zone);

    const { bottom: top, left } = mweTimePickable.getBoundingClientRect();
    picker.style.top = `${top}px`
    picker.style.left = `${left}px`

    document.body.appendChild(picker)
    
    return picker;
}

const buildPicker = (mweTimePickable, zone) => {
    const picker = document.createElement("div");
    let hourOptions = [];

    const minutesOptions = [0,5,10,15,20,25,30,35,40,45,50,55].map(numberToOption);
    if(zone === "12"){
        document.querySelectorAll(".mwe-timepickable").forEach(pickable => {
            pickable.value += " am"
        })
        hourOptions = [1,2,3,4,5,6,7,8,9,10,11,12].map(numberToOption);
    } else if(zone === "24") {
        document.querySelectorAll(".mwe-timepickable").forEach(pickable => {
            pickable.value = pickable.value.slice(0, 5)
        })
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

    const selects = getSelectsFromPicker(picker, zone)

    selects.hour.addEventListener("change", () => mweTimePickable.value = getTimeStringFromPicker(picker, zone))
    selects.minute.addEventListener("change", () => mweTimePickable.value = getTimeStringFromPicker(picker, zone))
    if(zone === "12"){
        selects.amPm.addEventListener("change", () => mweTimePickable.value = getTimeStringFromPicker(picker, zone))
    }

    
    if(mweTimePickable.value){
        if(zone === "12"){
            const { hour, minute, amPm } = getTimePartsFromMweTimePickable(mweTimePickable, zone);
            selects.hour.value = hour;
            selects.minute.value = minute;
            selects.amPm.value = amPm;
        }else if(zone === "24") {
            const { hour, minute } = getTimePartsFromMweTimePickable(mweTimePickable, zone);
            selects.hour.value = hour;
            selects.minute.value = minute;  
        }

    }

    return picker;
}

const getTimePartsFromMweTimePickable = (mweTimePickable, zone) => {
    if(zone === "12"){
        const pattern12 = /^(\d+):(\d+) (am|pm)$/;
        const [hour, minute, amPm] = Array.from(mweTimePickable.value.match(pattern12)).splice(1);

        return {
            hour,
            minute,
            amPm
        }
    }else if(zone === "24"){
        const pattern24 = /(\d+):(\d+)/;
        const [hour, minute] = Array.from(mweTimePickable.value.match(pattern24)).splice(1);

        return {
            hour,
            minute
        }
    }
}

const getSelectsFromPicker =(timePicker, zone) => {
    if (zone === "12") {
        const [hour, minute, amPm] = timePicker.querySelectorAll(".time-picker__select");    
        return {
            hour,
            minute,
            amPm
        };
    }else if (zone === "24") {
        const [hour, minute] = timePicker.querySelectorAll(".time-picker__select"); 
        return {
            hour,
            minute
        };
    }
}

const getTimeStringFromPicker = (timePicker, zone) => {
    const selects = getSelectsFromPicker(timePicker, zone);
    if(zone === "12"){
        return `${selects.hour.value}:${selects.minute.value} ${selects.amPm.value}` 
    }else if(zone === "24"){
        return `${selects.hour.value}:${selects.minute.value}`
    }
}

const numberToOption = (number) => {
    const padded = number.toString().padStart(2, "0");

    return `<option value="${padded}">${padded}</option>`;
}