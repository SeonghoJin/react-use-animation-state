import { useState, useMemo, useRef, useEffect } from 'react';

var defaultOption = function () { return ({
    onAnimationTime: 0,
    onDelayType: 'default',
    onPreemption: false,
    offAnimationTime: 0,
    offDelayType: 'default',
    offPreemption: false,
}); };
var useAnimationState = function (defaultState, option) {
    var _a = useState(defaultState), state = _a[0], setState = _a[1];
    var _b = useMemo(function () { return Object.assign(defaultOption(), option !== null && option !== void 0 ? option : {}); }, [option]), onAnimationTime = _b.onAnimationTime, offAnimationTime = _b.offAnimationTime, offDelayType = _b.offDelayType, onDelayType = _b.onDelayType, onPreemption = _b.onPreemption, offPreemption = _b.offPreemption;
    var offTimer = useRef(null);
    var onTimer = useRef(null);
    var cleanOnTimer = function () {
        if (onTimer.current) {
            clearTimeout(onTimer.current);
        }
    };
    var cleanOffTimer = function () {
        if (offTimer.current) {
            clearTimeout(offTimer.current);
        }
    };
    var on = function () {
        if (state === 'opening' || state === 'open') {
            return;
        }
        if (onAnimationTime === 0) {
            setState('open');
            return;
        }
        setState('opening');
        onTimer.current = setTimeout(function () {
            setState('open');
        }, onAnimationTime);
    };
    var off = function () {
        if (state === 'close' || state === 'closing') {
            return;
        }
        if (offAnimationTime === 0) {
            setState('close');
            return;
        }
        setState('closing');
        offTimer.current = setTimeout(function () {
            setState('close');
        }, offAnimationTime);
    };
    var onDefaultAnimation = function () {
        if (onPreemption && (state === 'close' || state === 'closing')) {
            cleanOffTimer();
            on();
            return;
        }
        if (!onPreemption && state !== 'close') {
            return;
        }
        on();
    };
    var offDefaultAnimation = function () {
        if (offPreemption && (state === 'open' || state === 'opening')) {
            cleanOnTimer();
            off();
            return;
        }
        if (!offPreemption && state !== 'open') {
            return;
        }
        off();
    };
    var onDebounceAnimation = function () {
        if (state === 'open') {
            return;
        }
        if (state === 'closing' && !onPreemption) {
            return;
        }
        if (state === 'closing' && onPreemption) {
            cleanOffTimer();
        }
        if (onAnimationTime === 0) {
            setState('open');
            return;
        }
        cleanOnTimer();
        setState('opening');
        onTimer.current = setTimeout(function () { return setState('open'); }, onAnimationTime);
    };
    var offDebounceAnimation = function () {
        if (state === 'close') {
            return;
        }
        if (state === 'opening' && !offPreemption) {
            return;
        }
        if (offPreemption && state === 'opening') {
            cleanOnTimer();
        }
        if (offAnimationTime === 0) {
            setState('close');
            return;
        }
        cleanOffTimer();
        setState('closing');
        offTimer.current = setTimeout(function () { return setState('close'); }, offAnimationTime);
    };
    var onAnimation = (function () {
        if (onDelayType === 'default') {
            return onDefaultAnimation;
        }
        if (onDelayType === 'debounce') {
            return onDebounceAnimation;
        }
        throw new Error('not supoort onDelayType');
    })();
    var offAnimation = (function () {
        if (offDelayType === 'default') {
            return offDefaultAnimation;
        }
        if (offDelayType === 'debounce') {
            return offDebounceAnimation;
        }
        throw new Error('not support offDelayType');
    })();
    useEffect(function () {
        return function () {
            if (offTimer.current) {
                clearTimeout(offTimer.current);
            }
            if (onTimer.current) {
                clearTimeout(onTimer.current);
            }
        };
    }, []);
    return {
        state: state,
        onAnimation: onAnimation,
        offAnimation: offAnimation,
    };
};

export { useAnimationState };
//# sourceMappingURL=index.js.map
