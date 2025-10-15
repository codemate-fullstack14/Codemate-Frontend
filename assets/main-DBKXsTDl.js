import{a as e,r as t,t as n}from"./index-CbrxIXrp.js";import{t as r}from"./Button-BiyE5St7.js";var i=e(n());function a(){let e=t();return(0,i.jsxs)(`section`,{className:`flex flex-col sm:flex-row justify-between my-6 bg-yellow-300 items-center px-4 py-4 lg:rounded-lg`,children:[(0,i.jsxs)(`h2`,{className:` text-center sm:text-left mb-2 sm:mb-0`,children:[`환영합니다. `,(0,i.jsx)(`span`,{className:`font-bold`,children:`첫방문`}),`이라면, 안내사항이 있는 `,(0,i.jsx)(`span`,{className:`font-bold`,children:`연습문제`}),`를 먼저 확인하세요.`]}),(0,i.jsx)(r,{text:`연습문제 바로가기`,option:{isIcon:!0},change:()=>{e(`/tutorial`,{state:{id:0}})}})]})}function o(){return(0,i.jsxs)(`section`,{className:`block px-4 lg:px-0`,children:[(0,i.jsx)(`h2`,{className:`text-2xl font-bold mb-4`,children:`경쟁 할 문제 고르기`}),(0,i.jsx)(`ol`,{className:`
            grid gap-6 
            grid-cols-1 
            sm:grid-cols-2 
            lg:grid-cols-3
          `,children:[{id:`01`,title:`순서 바꾸기`},{id:`02`,title:`트리 구조 만들기`},{id:`03`,title:`카드게임`}].map(({id:e,title:t})=>(0,i.jsxs)(`li`,{className:`
                flex flex-col justify-between
                bg-white rounded-md border border-gray-200
                p-6 
              `,children:[(0,i.jsxs)(`div`,{children:[(0,i.jsx)(`div`,{className:`text-gray-400 font-mono mb-2`,children:e}),(0,i.jsx)(`h3`,{className:`text-lg font-semibold mb-4`,children:t})]}),(0,i.jsx)(r,{text:`도전하기`,option:{color:`brandtheme`,isIcon:!0}})]},e))})]})}function s(){return(0,i.jsxs)(`div`,{children:[(0,i.jsx)(a,{}),(0,i.jsx)(o,{})]})}var c=s;export{c as default};