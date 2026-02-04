type Model = {
  name: string;
  logo: string;
  info: string;
  color: string;
};

type PerformanceResult = {
  name: string;
  model: string;
  input_tokens: number;
  output_tokens: number;
  latency: number;
};
