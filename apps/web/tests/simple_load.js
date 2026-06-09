import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  vus: 10,
  duration: '5s',
};

export default function () {
  const res = http.get('https://api.delez-repo.ru/v1/health');
  check(res, { 'status is 200': (r) => r.status === 200 });
  sleep(0.5);
}
