import React from 'react';

export function urlFormatter(cell) {
  return (
    <a href={cell.S} className="badge badge-success">
      Issue
    </a>
  );
}

export function dateFormatter(cell) {
  const now = new Date().getTime();
  const miliseconds = now - Number(cell.S);
  const seconds = Number(Math.floor(miliseconds / 1000));
  const minutes = Number(Math.floor(seconds / 60));
  const hours = Number(Math.floor(minutes / 60));
  const days = Number(Math.floor(hours / 24));
  return days;
}

export function repoFormatter(cell) {
  return cell.S.split('_').join('/');
}

export function labelsFormatter(cell) {
  return cell.S.split(',').join(', ');
}

export function languageFormatter(cell) {
  return cell.S;
}

export function titleFormatter(cell) {
  return cell.S;
}
