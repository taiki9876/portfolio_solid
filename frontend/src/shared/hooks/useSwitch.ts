import { useState } from 'react';

export const useSwitch = (defaultState: boolean = false) => {
    const [isOn, setIsOn] = useState(defaultState);

    const toggle = () => {
        setIsOn(!isOn);
    };

    const off = () => {
        setIsOn(false);
    };

    const on = () => {
        setIsOn(true);
    };

    return {
        isOn,
        toggle,
        on,
        off,
    };
};
