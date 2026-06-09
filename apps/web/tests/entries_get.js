import http from 'k6/http';
import { check } from 'k6';

export default function () {
  const res = http.get('https://api.delez-repo.ru/v1/entries');
  check(res, { 'no token -> 401': (r) => r.status === 401 });
}
