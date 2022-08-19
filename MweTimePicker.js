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

    document.querySelectorAll(".mwe-timezone").forEach(zone => {
        let activeZone = null;
        
        zone.addEventListener("change", ({target}) => {
            console.log("toggle was made", target)
        });
    });
    
}

const show = (mweTimePickable) => {
    const picker = buildPicker(mweTimePickable);

    const { bottom: top, left } = mweTimePickable.getBoundingClientRect();
    picker.style.top = `${top}px`
    picker.style.left = `${left}px`

    document.body.appendChild(picker)
    
    return picker;
}

const buildPicker = (mweTimePickable) => {

    const picker = document.createElement("div");
    const timeZones = getCheckedZone();
    
    
    let hours;
    if(timeZones.value === 12){
        hours = [1,2,3,4,5,6,7,8,9,10,11,12].map(numberToOption);
    } else {
        hours = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24].map(numberToOption);
    }

    const minutesOptions = [0,5,10,15,20,25,30,35,40,45,50,55].map(numberToOption);
    
    picker.classList.add("time-picker");
    picker.innerHTML = `
        <select class="time-picker__select">
            ${hours.join("")}
        </select>
        :
        <select class="time-picker__select">
            ${minutesOptions.join("")}
        </select>
        <select class="time-picker__select" ${timeZones === 24 && "style='display: none'"}>
            <option value="am">AM</option>
            <option value="pm">PM</option>
        </select>
    `;

    const selects = getSelectsFromPicker(picker)

    selects.hour.addEventListener("change", () => mweTimePickable.value = getTimeStringFromPicker(picker))
    selects.minute.addEventListener("change", () => mweTimePickable.value = getTimeStringFromPicker(picker))
    selects.amPm.addEventListener("change", () => mweTimePickable.value = getTimeStringFromPicker(picker))

    
    if(mweTimePickable.value){
        const { hour, minute, amPm } = getTimePartsFromMweTimePickable(mweTimePickable);

        selects.hour.value = hour;
        selects.minute.value = minute;
        selects.amPm.value = amPm;
    }

    return picker;
}

const getTimePartsFromMweTimePickable = (mweTimePickable) => {

    const pattern12 = /^(\d+):(\d+) (am|pm)$/;
    const pattern24 = /^(\d+):(\d+)$/;
    
    const checkedTimeZone = getCheckedZone();
    let result;

    if(checkedTimeZone.value === 12){
        result = Array.from(mweTimePickable.value.match(pattern12)).splice(1);
    } else {
        result = Array.from(mweTimePickable.value.match(pattern24)).splice(1);
    }
    console.log("result", result);

    return {
        hour: result.hour,
        minute: result.minute,
        amPm: result.amPm,
    }
}

const getSelectsFromPicker =(timePicker) => {
    const [hour, minute, amPm] = timePicker.querySelectorAll(".time-picker__select");

    return {
        hour,
        minute,
        amPm
    };
}

const getTimeStringFromPicker = (timePicker) => {
    const selects = getSelectsFromPicker(timePicker);

    return selects.amPm.value ? `${selects.hour.value}:${selects.minute.value} ${selects.amPm.value}` : `${selects.hour.value}:${selects.minute.value}`
}

const numberToOption = (number) => {
    const padded = number.toString().padStart(2, "0");

    return `<option value="${padded}">${padded}</option>`;
}

// const toggleZones = () => {
//     const timeZones = Array.from(document.querySelectorAll(".mwe-timezone"));
    
//     timeZones[0].addEventListener("change", () => {
//         timeZones[0].checked = true;
//         timeZones[1].checked = false;
//         console.log("toggle was made")
//         buildPicker();
//     });

//     timeZones[1].addEventListener("change", () => {
//         timeZones[0].checked = false;
//         timeZones[1].checked = true;
//         console.log("toggle was made")
//         buildPicker();
//     });
// }

const getCheckedZone = () => {
    const timeZones = Array.from(document.querySelectorAll(".mwe-timezone"));
    if(timeZones[0].checked === true){
        return timeZones[0]
    } else {
        return timeZones[1];
    }
}