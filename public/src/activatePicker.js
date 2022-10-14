import { show } from "./show.js";

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

