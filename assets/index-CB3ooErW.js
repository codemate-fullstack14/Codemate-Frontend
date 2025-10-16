import{j as e,u as l}from"./index-B3HMPDzI.js";import{B as n}from"./Button-D9cNR1oX.js";function o(){const s=l(),t=()=>{s("/tutorial",{state:{id:0}})};return e.jsxs("section",{className:"flex flex-col sm:flex-row justify-between my-6 bg-yellow-300 items-center px-4 py-4 lg:rounded-lg",children:[e.jsxs("h2",{className:" text-center sm:text-left mb-2 sm:mb-0",children:["환영합니다. ",e.jsx("span",{className:"font-bold",children:"첫방문"}),"이라면, 안내사항이 있는 ",e.jsx("span",{className:"font-bold",children:"연습문제"}),"를 먼저 확인하세요."]}),e.jsx(n,{text:"연습문제 바로가기",option:{isIcon:!0},change:t})]})}function i(){return e.jsxs("section",{className:"block px-4 lg:px-0",children:[e.jsx("h2",{className:"text-2xl font-bold mb-4",children:"경쟁 할 문제 고르기"}),e.jsx("ol",{className:`
            grid gap-6 
            grid-cols-1 
            sm:grid-cols-2 
            lg:grid-cols-3
          `,children:[{id:"01",title:"순서 바꾸기"},{id:"02",title:"트리 구조 만들기"},{id:"03",title:"카드게임"}].map(({id:s,title:t})=>e.jsxs("li",{className:`
                flex flex-col justify-between
                bg-white rounded-md border border-gray-200
                p-6 
              `,children:[e.jsxs("div",{children:[e.jsx("div",{className:"text-gray-400 font-mono mb-2",children:s}),e.jsx("h3",{className:"text-lg font-semibold mb-4",children:t})]}),e.jsx(n,{text:"도전하기",option:{color:"brandtheme",isIcon:!0}})]},s))})]})}function c(){return e.jsxs("div",{children:[e.jsx(o,{}),e.jsx(i,{})]})}export{c as default};
