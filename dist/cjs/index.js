var $i9b1P$react = require("react");

function $parcel$export(e, n, v, s) {
  Object.defineProperty(e, n, {get: v, set: s, enumerable: true, configurable: true});
}

$parcel$export(module.exports, "useAnimationState", () => $5172bd83420fc19e$export$7ee548861327febe);

const $5172bd83420fc19e$var$defaultOption = ()=>({
        onAnimationTime: 0,
        onDelayType: 'default',
        onPreemption: false,
        offAnimationTime: 0,
        offDelayType: 'default',
        offPreemption: false
    })
;
const $5172bd83420fc19e$export$7ee548861327febe = (defaultState, option)=>{
    const [state, setState] = $i9b1P$react.useState(defaultState);
    const { onAnimationTime: onAnimationTime , offAnimationTime: offAnimationTime , offDelayType: offDelayType , onDelayType: onDelayType , onPreemption: onPreemption , offPreemption: offPreemption  } = $i9b1P$react.useMemo(()=>Object.assign($5172bd83420fc19e$var$defaultOption(), option ?? {})
    , [
        option
    ]);
    const offTimer = $i9b1P$react.useRef(null);
    const onTimer = $i9b1P$react.useRef(null);
    const cleanOnTimer = ()=>{
        if (onTimer.current) clearTimeout(onTimer.current);
    };
    const cleanOffTimer = ()=>{
        if (offTimer.current) clearTimeout(offTimer.current);
    };
    const on = ()=>{
        if (state === 'opening' || state === 'open') return;
        if (onAnimationTime === 0) {
            setState('open');
            return;
        }
        setState('opening');
        onTimer.current = setTimeout(()=>{
            setState('open');
        }, onAnimationTime);
    };
    const off = ()=>{
        if (state === 'close' || state === 'closing') return;
        if (offAnimationTime === 0) {
            setState('close');
            return;
        }
        setState('closing');
        offTimer.current = setTimeout(()=>{
            setState('close');
        }, offAnimationTime);
    };
    const onDefaultAnimation = ()=>{
        if (onPreemption && (state === 'close' || state === 'closing')) {
            cleanOffTimer();
            on();
            return;
        }
        if (!onPreemption && state !== 'close') return;
        on();
    };
    const offDefaultAnimation = ()=>{
        if (offPreemption && (state === 'open' || state === 'opening')) {
            cleanOnTimer();
            off();
            return;
        }
        if (!offPreemption && state !== 'open') return;
        off();
    };
    const onDebounceAnimation = ()=>{
        if (state === 'open') return;
        if (state === 'closing' && !onPreemption) return;
        if (state === 'closing' && onPreemption) cleanOffTimer();
        if (onAnimationTime === 0) {
            setState('open');
            return;
        }
        cleanOnTimer();
        setState('opening');
        onTimer.current = setTimeout(()=>setState('open')
        , onAnimationTime);
    };
    const offDebounceAnimation = ()=>{
        if (state === 'close') return;
        if (state === 'opening' && !offPreemption) return;
        if (offPreemption && state === 'opening') cleanOnTimer();
        if (offAnimationTime === 0) {
            setState('close');
            return;
        }
        cleanOffTimer();
        setState('closing');
        offTimer.current = setTimeout(()=>setState('close')
        , offAnimationTime);
    };
    const onAnimation = (()=>{
        if (onDelayType === 'default') return onDefaultAnimation;
        if (onDelayType === 'debounce') return onDebounceAnimation;
        throw new Error('not supoort onDelayType');
    })();
    const offAnimation = (()=>{
        if (offDelayType === 'default') return offDefaultAnimation;
        if (offDelayType === 'debounce') return offDebounceAnimation;
        throw new Error('not support offDelayType');
    })();
    $i9b1P$react.useEffect(()=>{
        return ()=>{
            if (offTimer.current) clearTimeout(offTimer.current);
            if (onTimer.current) clearTimeout(onTimer.current);
        };
    }, []);
    return {
        state: state,
        onAnimation: onAnimation,
        offAnimation: offAnimation
    };
};




//# sourceMappingURL=index.js.map
