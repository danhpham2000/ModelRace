"use client";

import { Card } from "@/components/ui/card";
import Image from "next/image";
import OpenAI from "@/app/assets/openai.svg";
import Cerebras from "@/app/assets/cerebras-color.svg";
import Groq from "@/app/assets/groq.svg";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const models: Model[] = [
  {
    name: "OpenAI",
    info: "Quality, speed, stable latency",
    logo: OpenAI,
    color: "#F55036",
  },
  {
    name: "Groq",
    info: "Extreme token generation speed",
    logo: Groq,
    color: "#F55036",
  },
  {
    name: "Cerebras",
    info: "Massive throughput, low latency",
    logo: Cerebras,
    color: "#F15A29",
  },
];

export default function Page() {
  const [query, setQuery] = useState<string>("");
  const [result, setResult] = useState<PerformanceResult[]>();

  const handleSubmitQuery = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
  };

  return (
    <div className="">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="text-center"
      >
        <h1 className="text-lg font-medium text-primary">
          Real-time LLM Latency Benchmarking
        </h1>
        <p className="mt-3">
          Comparison of LLM inference providers showing response quality, input
          tokens, output tokens, and end-to-end latency.
        </p>
      </motion.div>

      <div className="flex justify-center mt-5">
        <Tabs defaultValue="general" className="">
          <TabsList className="px-5 flex">
            <TabsTrigger className="px-5" value="general">
              General
            </TabsTrigger>
            <TabsTrigger className="px-5" value="custom">
              Custom
            </TabsTrigger>
          </TabsList>

          <TabsContent value="general">
            <div className="flex flex-col gap-5 mt-5 md:flex-row md:justify-center">
              {models.map((model, i) => (
                <motion.div
                  key={model.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.15 }}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <Card className="p-5 bg-gray-700 mt-5 cursor-pointer">
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
                </motion.div>
              ))}
            </div>

            <motion.div
              className="mt-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <h1 className="text-2xl text-center font-medium">Playground</h1>

              <Card className="max-w-100 mx-auto p-5 mt-5">
                <h1>Type your input and track tokens, output, and latency</h1>

                <Input
                  type="text"
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Query"
                />

                <motion.div whileTap={{ scale: 0.95 }}>
                  <Button className="mt-3">Submit</Button>
                </motion.div>
              </Card>
            </motion.div>
          </TabsContent>
          <TabsContent value="custom"></TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
