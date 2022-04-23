import { useState, useRef, useMemo } from 'react';
import { AnimationState, UseAnimationStateOption } from './type';

const defaultOption: Required<UseAnimationStateOption> = {
    onAnimationTime: 0,
    onDelayType: 'default',
    onPreemption: false,
    offAnimationTime: 0,
    offDelayType: 'default',
    offPreemption: false,
};

export const useAnimationState = (defaultState: AnimationState = 'close', option: UseAnimationStateOption) => {

    const [state, setState] = useState<AnimationState>(defaultState);
    const {
        onAnimationTime,
        offAnimationTime,
        offDelayType,
        onDelayType,
        onPreemption,
        offPreemption,
    } = useMemo(() => Object.assign(defaultOption, option ?? {}), [option]);
    const offTimer = useRef<NodeJS.Timeout>(null);
    const onTimer = useRef<NodeJS.Timeout>(null);

    const onDefaultAnimation = () => {
        if (!onPreemption && state !== 'close') {
            return;
        }
        if (onPreemption && (state === 'open' || state === 'opening')) {
            return;
        }
        if (onAnimationTime === 0) {
            setState('open');
            return;
        }
        setState('opening');
        onTimer.current = setTimeout(() => setState('open'), onAnimationTime);
    };

    const offDefaultAnimation = () => {
        if (state !== 'open') {
            return;
        }
        if (onPreemption && (state === 'close' || state === 'closing')) {
            return;
        }
        if (offAnimationTime === 0) {
            setState('close');
            return;
        }
        setState('closing');
        onTimer.current = setTimeout(() => setState('close'), offAnimationTime);
    };

    const onDebounceAnimation = () => {
        if (state === 'open' || state === 'closing') {
            return;
        }
        if (onAnimationTime === 0) {
            setState('open');
            return;
        }
        setState('opening');
        if (onTimer.current) {
            clearTimeout(onTimer.current);
        }
        onTimer.current = setTimeout(() => setState('open'), onAnimationTime);
    };

    const offDebounceAnimation = () => {
        if (state === 'close' || state == 'opening') {
            return;
        }
        if (offAnimationTime === 0) {
            setState('close');
            return;
        }
        setState('closing');
        if (offTimer.current) {
            clearTimeout(offTimer.current);
        }
        offTimer.current = setTimeout(
            () => setState('close'),
            offAnimationTime,
        );
    };

    const onAnimation = (() => {
        if (onDelayType === 'default') {
            return onDefaultAnimation;
        }
        if (onDelayType === 'debounce') {
            return onDebounceAnimation;
        }
        throw new Error('not supoort onDelayType');
    })();
    const offAnimation = (() => {
        if (offDelayType === 'default') {
            return offDefaultAnimation;
        }
        if (offDelayType === 'debounce') {
            return offDebounceAnimation;
        }
        throw new Error('not support offDelayType');
    })();
    return {
        state,
        onAnimation,
        offAnimation,
    };
};