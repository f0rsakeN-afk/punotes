import rateLimit from "next-rate-limit";

const limiter = rateLimit({
  interval: 10 * 60 * 1000,
  uniqueTokenPerInterval: 500,
});

export default limiter;
