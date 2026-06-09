import http from 'k6/http';
import { check } from 'k6';

export default function () {
  const res = http.get('https://api.delez-repo.ru/v1/health');
  check(res, {
    'health status is 200': (r) => r.status === 200,
    'body has status ok': (r) => r.json('status') === 'ok',
  });
}
