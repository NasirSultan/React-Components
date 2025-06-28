self.onmessage = function (e) {
  const limit = e.data;
  const primes = [];

  for (let num = 2; num <= limit; num++) {
    let isPrime = true;
    for (let i = 2; i <= Math.sqrt(num); i++) {
      if (num % i === 0) {
        isPrime = false;
        break;
      }
    }
    if (isPrime) primes.push(num);
  }

  postMessage(primes);
};