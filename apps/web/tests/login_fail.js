import http from 'k6/http';
import { check } from 'k6';

export default function () {
  const payload = JSON.stringify({
    email: 'nonexistent@example.com',
    password: 'wrongpassword',
  });
  const res = http.post('https://api.delez-repo.ru/auth/sign-in/email', payload, {
    headers: { 'Content-Type': 'application/json' },
  });
  check(res, { 'unauthorized status is 401': (r) => r.status === 401 });
}
