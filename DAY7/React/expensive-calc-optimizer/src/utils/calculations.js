export function isPrime(num) {
  if (num < 2) return false;
  if (num === 2) return true;
  if (num % 2 === 0) return false;

  for (let i = 3; i <= Math.sqrt(num); i += 2) {
    if (num % i === 0) return false;
  }

  return true;
}

export function getFactors(num) {
  const factors = [];
  const absNum = Math.abs(num);

  if (absNum === 0) return [0];

  for (let i = 1; i <= absNum; i++) {
    if (absNum % i === 0) {
      factors.push(i);
    }
  }

  return factors;
}

export function sumOfFactors(factors) {
  return factors.reduce((sum, factor) => sum + factor, 0);
}
