import React from 'react';
import TodoMain from './TodoMain';
import TodoInput from './TodoInput';
import TodoHeader from './TodoHeader';
import './scss/TodoTemplate.scss';

const TodoTemplate = () => {
  return (
    <div className='TodoTemplate'>
      <TodoHeader />
      <TodoMain />
      <TodoInput />
    </div>
  );
};

export default TodoTemplate;
