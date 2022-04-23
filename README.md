<a href="https://www.npmjs.com/package/react-use-animation-state">
       <img src="https://img.shields.io/npm/v/react-use-animation-state.svg" alt="npm package" />
</a>

# react-use-animation-state

애니메이션이 동작할때, 독립적인 애니메이션 행동을 유지하기 위해 만들어진 라이브러리입니다. 웹에서의 애니메이션은 4가지 상태로 구분할 수 있습니다. 애니메이션 시작 준비 (opening) 애니메이션 시작(open),애니메이션 종료 준비 (closing) 애니메이션 종료 (close) 으로 나뉘고, 이 라이브러리는 4가지 중 한 상태에서 다른 상태로 전이된다는 가정을 가지고 제작되었습니다.

## Installation

```shell
npm i react-use-animation-state
```

### Options

| Option             | Default   | Description                                                                                                                                                                                          |
| ------------------ | --------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `onAnimationTime`  | 0         | 애니메이션이 시작 준비 시간을 의미합니다. 즉, `opening` 상태의 시간을 의미합니다.                                                                                                                    |
| `offAnimationTime` | 0         | 애니메이션 종료 준비 시간을 의미합니다. 즉, `closing` 상태의 시간을 의미합니다.                                                                                                                      |
| `onPreemption`     | false     | 애니메이션 시작을 강제할 수 있습니다. 기본적으로 `closing` 상태에서 `opening` 상태로 진입할 수 없지만 `onPreemption` 이 `true` 일경우 강제로 진입할 수 있습니다.                                     |
| `offPreemption`    | false     | 애니메이션 종료를 강제할 수 있습니다. 기본적으로 `opening` 상태에서 `closing` 상태로 진입할 수 없지만 `offPreemption` 이 `true` 일경우 강제로 진입할 수 있습니다.                                    |
| `onDelayType`      | `default` | 애니메이션 시작 준비에 `debounce` or `default` 를 설정할 수 있습니다. `onDelayType`이 `debounce` 일 경우 시작 준비 시간에 `onAnimation`이 실행되면 현재까지 소요된 시작 준비는 초기화 됩니다.        |
| `offDelayType`     | `default` | 애니메이션 종료 준비에 `debounce` or `default` 를 설정할 수 있습니다. `offDelayType`이 `debounce` 일 경우 종료 준비 시간에 `offAnimation`이 실행되면 현재까지 소요된 종료 준비 시간은 초기화 됩니다. |

## Usage

```typescript
import React from 'react';
import { UseAnimationStateOption } from '../type';
import { useAnimationState } from '../useAnimationState';

const AnimationExample = () => {
  const { state: animationState, offAnimation, onAnimation } = useAnimationState('open');

  return (
    <>
      <button type="button" onClick={() => onAnimation()}>
        animationStart
      </button>
      <button type="button" onClick={() => offAnimation()}>
        animationEnd
      </button>
      <div>{animationState}</div>
    </>
  );
};

AnimationExample.defaultProps = {
  option: {},
};

export default AnimationExample;
```

#### 더 자세한 사용법을 알고 싶다면 storybook을 확인하세요.

https://seonghojin.github.io/react-use-animation-state

## How start storybook

```shell
npm run storybook
```

## How to build

```shell
npm run build
```
