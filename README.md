# Codemate frontend repository

더이상 코딩테스트(알고리즘) 문제를 해결하면서 재미를 추구 할 수 없을까? 라는 목적성을 두고 현재 프로젝트를 진행하고 있습니다. 그로인해 타인과 문제해결을 대결하며 AI기반 솔루션으로 문제해결 속도와 효율성을 기반으로 점수화 하여 상위점수에 도전하는 웹사이트입니다. 

## Tech Stack

```json
 "dependencies": {
    "@tailwindcss/vite": "^4.1.14",
    "react": "^19.1.1",
    "react-dom": "^19.1.1",
    "react-router-dom": "^7.9.4"
  },
  "devDependencies": {
    "@eslint/js": "^9.36.0",
    "@types/node": "^24.6.0",
    "@types/react": "^19.1.16",
    "@types/react-dom": "^19.1.9",
    "@vitejs/plugin-react": "^5.0.4",
    "eslint": "^9.36.0",
    "eslint-plugin-react-hooks": "^5.2.0",
    "eslint-plugin-react-refresh": "^0.4.22",
    "globals": "^16.4.0",
    "tailwindcss": "^4.1.14",
    "typescript": "~5.9.3",
    "typescript-eslint": "^8.45.0",
    "vite": "npm:rolldown-vite@7.1.14"
  },
```

1. React
> 사용자 인터렉션이 차지하는 비중이 높은 만큼 SSR단 역할보단 DOM구조를 조작하고 리렌더링을 최소하하는 동작이 필요함으로 `React`로 충분히 구현이 가능하다 판단합니다.

2. TypeScript
> 협업을 기반으로한 팀프로잭트에서 타입을 명시함으로써 공통적인 코드형상을 가져갈 수 있기에 사용합니다.

3. tailwindcss
> [npmtrends](https://npmtrends.com/@emotion/css-vs-sass-vs-styled-components-vs-tailwindcss) 사이트 조회결과 `tailwindcss`가 현재 사용량이 매우 많고 이는 공식문서와 커뮤니티를 활용한 문제해결 버젼안정성 등 이 높으며, 사용법이 간편하기때문에 사용합니다. 
