import React from 'react';
import './scss/TodoHeader.scss';

const TodoHeader = ({ count }) => {
  const today = new Date();

  const dateString = today.toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const datName = today.toLocaleDateString('ko-Kr', { weekday: 'long' });

  return (
    <header>
      <h1>{dateString}</h1>
      <div className='day'>{datName}</div>
      <div className='tasks-left'>할 일 {count()}개 남음</div>
    </header>
  );
};

export default TodoHeader;
