import React, { useEffect, useRef, useState } from "react";

// Simple in-memory cache (survives re-mount)
let primesCache = [];
let workerInstance = null;
let workerStatus = {
  loading: false,
  resultReady: false,
};

export default function Calculator() {
  const [limit, setLimit] = useState(10000000);
  const [primes, setPrimes] = useState(primesCache);
  const [loading, setLoading] = useState(workerStatus.loading);

  const workerRef = useRef(workerInstance);

  const startCalculation = () => {
    if (workerRef.current) {
      workerRef.current.terminate();
    }

    setLoading(true);
    workerStatus.loading = true;
    setPrimes([]);
    primesCache = [];

    const worker = new Worker(
      new URL("../workers/heavyTaskWorker.js", import.meta.url)
    );
    workerRef.current = worker;
    workerInstance = worker;

    worker.postMessage(limit);

    worker.onmessage = (e) => {
      setPrimes(e.data);
      setLoading(false);
      primesCache = e.data;
      workerStatus.loading = false;
      workerStatus.resultReady = true;

      worker.terminate();
      workerRef.current = null;
      workerInstance = null;
    };
  };

  useEffect(() => {
    // Re-attach message handler if worker is still running
    if (workerRef.current) {
      setLoading(true);
      workerRef.current.onmessage = (e) => {
        setPrimes(e.data);
        setLoading(false);
        primesCache = e.data;
        workerStatus.loading = false;
        workerStatus.resultReady = true;

        workerRef.current.terminate();
        workerRef.current = null;
        workerInstance = null;
      };
    }
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h2>Prime Calculator</h2>
      <input
        type="number"
        value={limit}
        onChange={(e) => setLimit(Number(e.target.value))}
      />
      <button onClick={startCalculation}>
        {loading ? "Calculating..." : "Calculate"}
      </button>

      {primes.length > 0 && (
        <div style={{ marginTop: 20 }}>
          <p>{primes.length} primes found</p>
          <div style={{ maxHeight: 200, overflowY: "auto", border: "1px solid #ccc", padding: 10 }}>
            {primes.join(", ")}
          </div>
        </div>
      )}
    </div>
  );
}
