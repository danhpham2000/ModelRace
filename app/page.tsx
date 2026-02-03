"use client";

import { Card } from "@/components/ui/card";
import Image from "next/image";
import OpenAI from "@/app/assets/openai.svg";
import Cerebras from "@/app/assets/cerebras-color.svg";
import Groq from "@/app/assets/groq.svg";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";

const models: Model[] = [
  {
    name: "OpenAI",
    info: "Quality, speed, stable latency",
    logo: OpenAI,
  },
  {
    name: "Groq",
    info: "Extreme token generation speed",
    logo: Groq,
  },
  {
    name: "Cerebras",
    info: "Massive throughput, low latency",
    logo: Cerebras,
  },
];

export default function Page() {
  const [query, setQuery] = useState<string>("");

  const [result, setResult] = useState<PerformanceResult[]>();

  const handleSubmitQuery = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
  };

  return (
    <div className="mt-10 p-5">
      <div>
        <div className="text-center">
          <h1 className="text-lg font-medium text-primary">
            Real-time LLM Latency Benchmarking
          </h1>
          <p className="mt-3">
            Comparison of LLM inference providers showing response quality,
            input tokens, output tokens, and end-to-end latency.
          </p>
        </div>
      </div>
      <div className="flex flex-col gap-5 mt-10 md:flex-row md:justify-center">
        {models.map((model) => (
          <div key={model.name}>
            <Card className="p-5 bg-gray-700 mt-5">
              <div className="flex items-center gap-5 justify-center">
                <Image
                  src={model.logo}
                  alt={model.name}
                  sizes="32x32"
                  className="min-w-10"
                />
                <h1 className="text-xl font-medium">{model.name}</h1>
              </div>
              <div className="text-center">
                <p>{model.info}</p>
              </div>
            </Card>
          </div>
        ))}
      </div>
      <div className="mt-20">
        <h1 className="text-2xl text-center uppercase font-medium">
          Playground
        </h1>

        <div>
          <h1>Type your input and track tokens, output, and latency</h1>

          <Input type="text" />
        </div>
      </div>
    </div>
  );
}
