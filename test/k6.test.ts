import http from 'k6/http';
import { check, sleep } from 'k6';
import { Rate } from 'k6/metrics';

// Custom metrics
const errorRate = new Rate('errors');

// Test configuration - reduced load for better stability
export const options = {
  stages: [
    { duration: '1m', target: 50 },     // Ramp up to 50 users
    { duration: '3m', target: 50 },     // Stay at 50 users
    { duration: '1m', target: 100 },    // Ramp up to 100 users
    { duration: '3m', target: 100 },    // Stay at 100 users
    { duration: '1m', target: 0 },      // Ramp down
  ],
  thresholds: {
    http_req_duration: ['p(95)<2000'],  // 95% of requests under 2s
    http_req_failed: ['rate<0.05'],     // Less than 5% failures
    errors: ['rate<0.05'],
  },
};

// Login function to get JWT token
function login() {
  const loginRes = http.post('http://localhost:3333/auth/login', JSON.stringify({
    email: 'p@o.com',
    password: 'Password@1111'
  }), {
    headers: { 'Content-Type': 'application/json' }
  });

  check(loginRes, {
    'login successful': (r) => r.status === 201,
  });

  return loginRes.json('token');
}

// Initialize token
const token = login();

export default function () {
  const params = {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  };

  const response = http.get('http://localhost:3333/books', params);

  check(response, {
    'is status 200': (r) => r.status === 200,
    'response time < 2s': (r) => r.timings.duration < 2000,
    'response has books': (r) => {
      try {
        const body = JSON.parse(r.body as string);
        return Array.isArray(body);
      } catch {
        return false;
      }
    },
  });

  errorRate.add(response.status !== 200);

  // Add random sleep between requests
  sleep(Math.random() * 2 + 1);
}