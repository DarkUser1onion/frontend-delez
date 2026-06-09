import http from 'k6/http';
import { check } from 'k6';

export default function () {
  const res = http.get('https://api.delez-repo.ru/v1/entries/999999999');
  check(res, { 'non-existent entry -> 404': (r) => r.status === 404 });
}
