import React, { useState } from 'react';
import TodoMain from './TodoMain';
import TodoInput from './TodoInput';
import TodoHeader from './TodoHeader';
import './scss/TodoTemplate.scss';

const TodoTemplate = () => {
  // 서버에 할 일 목록(josn)을 요청(fetch)해서 받아와야 함.

  // todos 배열을 상태 관리
  const [todos, setTodos] = useState([
    {
      id: 1,
      title: '아침 산책하기',
      done: true,
    },
    {
      id: 2,
      title: '오늘 주간 신문 읽기',
      done: true,
    },
    {
      id: 3,
      title: '샌드위치 사먹기',
      done: false,
    },
    {
      id: 4,
      title: '리액트 복습하기',
      done: false,
    },
  ]);

  // id가 시퀀스 함수(DB 연동시키면 필요없게 됨.)
  const makeNewId = () => {
    if (todos.length === 0) return 1;
    return todos[todos.length - 1].id + 1; // 맨 마지막 할일 객체의 id보다 하나 크게
  };

  /*
    todoInput에게 todoText를 받아오는 함수
    자식 컴포넌트가 부모 컴포넌트에게 데이터를 전달할 때는
    일반적인 props 사용이 불가능.
    부모 컴포넌트에서 함수를 선언(매개변수 꼭 선언) -> props로 함수를 전달
    자식 컴포넌트에서 전달받은 함수를 호출하면서 매개값으로 데이터를 전달.
  */
  const addTodo = (todoText) => {
    const newTodo = {
      id: makeNewId(),
      title: todoText,
      done: false,
    }; // 나중에 fetch를 이용해서 백엔드에 insert 요청 보내야됨.

    // todos.push(newTodo); (x) -> useState 변수는 setter로 변경
    // setTodos(todos.push(newTodo)); (x)
    // react의 상태변수는 불변성(immutable)을 가지기 때문에
    // 기존 상태에서 변경은 불가능 -> 새로운 상태로 만들어서 변경해야 한다.

    setTodos((oldTodos) => {
      return [...oldTodos, newTodo];
    });
  };

  // 할 일 삭제 처리 함수
  const removeTodo = (id) => {
    //주어진 배열의 값들을 순회하여 조건에 맞는 요소들만 모아서 새로운 배열로 리턴.
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  // 할 일 체크 처리 함수
  const checkTodo = (id) => {
    /*
    const copyTodos = [...todos];
    for (let cTodos of copyTodos) {
      if (cTodos.id === id) {
        cTodos.done = !cTodos.done;
      }
    }

    setTodos(copyTodos);
    */
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, done: !todo.done } : todo
      )
    );
  };

  // 체크가 안 된 할 일의 개수 카운트 하기
  const countResetTodo = () => todos.filter((todo) => !todo.done).length;

  return (
    <div className='TodoTemplate'>
      <TodoHeader count={countResetTodo} />
      <TodoMain
        todoList={todos}
        remove={removeTodo}
        check={checkTodo}
      />
      <TodoInput addTodo={addTodo} />
    </div>
  );
};

export default TodoTemplate;
