import  React from 'react';
import ReactDOM from 'react-dom';
let firstWorkInProgressHook = {memoizedState:null,next:null};
let workInProgressHook = firstWorkInProgressHook;
//
function useState(initialState){
  let currentHook = workInProgressHook.next?workInProgressHook.next:{memoizedState:initialState,next:null};
  function setState(newState){
       currentHook.memoizedState =newState;
       render();
  }
  if(workInProgressHook.next){
      workInProgressHook = workInProgressHook.next;
  }else{
      workInProgressHook.next = currentHook;
      workInProgressHook = currentHook
  }
  return [currentHook.memoizedState,setState];
}
function Counter(){
    //useState就是一个hooks
    //第一个是当前的状态，第二个是改变状态的函数
    //核心作用是给函数组件增加了一个保持状态的功能
    const [name,setName] = useState('计数器');//参数是初始状态
    const [number,setNumber] = useState(0);//参数是初始状态
    return (
        <>
            <p>{name}:{number}</p>
            <button onClick={()=>setName('计数器'+Date.now())}>改名称</button>
            <button onClick={()=>setNumber(number+1)}>+</button>
        </>
    )
}
function render(){
    workInProgressHook=firstWorkInProgressHook;
    ReactDOM.render(<Counter/>,document.getElementById('root'));
}
render();