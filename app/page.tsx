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
import { LucideLoader2 } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import ReactMarkdown from "react-markdown";
import { Field, FieldLabel } from "@/components/ui/field";

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
  const [results, setResults] = useState<PerformanceResult[]>();

  const [loading, setLoading] = useState<boolean>(false);

  const [error, setError] = useState<string>("");

  const handleSubmitQuery = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    setLoading(true);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/playground`,
        {
          method: "POST",
          body: JSON.stringify({
            prompt: query,
            models: ["openai", "cerebras", "groq"],
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();
      setLoading(false);

      console.log(data);

      setResults(data.result);
    } catch (e) {
      setError(e as string);
    }
  };

  return (
    <div className="mx-10">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="text-center"
      >
        <h1 className="text-2xl font-medium text-primary mt-5">
          Real-time LLM Latency Benchmarking
        </h1>
        <p className="mt-3">
          Comparison of LLM inference providers showing response quality, input
          tokens, output tokens, and end-to-end latency.
        </p>
      </motion.div>

      <div className="flex mt-5 justify-center">
        <Tabs defaultValue="general" className="w-full max-w-4xl">
          <TabsList className="w-full flex justify-center">
            <TabsTrigger className="px-5" value="general">
              General
            </TabsTrigger>
            <TabsTrigger className="px-5" value="custom">
              Custom
            </TabsTrigger>
          </TabsList>

          <TabsContent value="general">
            <div className="flex flex-col gap-5 mt-5 md:justify-center md:flex-row">
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
              <h1 className="text-xl text-center font-medium">Playground</h1>

              <Card className="max-w-100 mx-auto p-5 mt-5">
                <h1>Type your input and track tokens, output, and latency</h1>

                <Input
                  type="text"
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Query"
                />

                <motion.div whileTap={{ scale: 0.95 }}>
                  <Button
                    className="mt-3"
                    type="submit"
                    onClick={handleSubmitQuery}
                  >
                    Submit
                  </Button>
                </motion.div>
              </Card>
            </motion.div>
            <div className="mt-7 flex justify-center">
              {loading && (
                <div className="flex items-center gap-3">
                  <LucideLoader2 className="animate-spin text-primary" />
                  <span>Loading result</span>
                </div>
              )}

              <div className="grid grid-col-1 md:grid-cols-3">
                {results &&
                  results?.map((r) => (
                    <div className="mt-5" key={r.model}>
                      <Card className=" p-4 ml-10">
                        <div className="flex justify-between mb-2">
                          <h3 className="font-medium">{r.name}</h3>
                        </div>

                        <Field className="w-full max-w-sm">
                          <FieldLabel>
                            <span>Latency (ms)</span>
                            <span className="ml-auto">
                              {Math.round(r.latency)}
                            </span>
                          </FieldLabel>
                          <Progress
                            value={Math.min((r.latency / 10000) * 100, 100)}
                            className="mb-3"
                          />
                        </Field>

                        <div className="grid grid-cols-2 gap-3 text-sm">
                          <div className="p-2 bg-muted rounded">
                            <p className="opacity-70">Input tokens</p>
                            <p className="font-medium">{r.input_tokens}</p>
                          </div>

                          <div className="p-2 bg-muted rounded">
                            <p className="opacity-70">Output tokens</p>
                            <p className="font-medium">{r.output_tokens}</p>
                          </div>
                        </div>

                        <Dialog>
                          <DialogTitle>Response</DialogTitle>
                          <DialogTrigger asChild>
                            <Button>View response</Button>
                          </DialogTrigger>
                          <DialogContent className="max-h-[70vh] overflow-y-auto">
                            <div className="mt-6 p-2 bg-muted rounded overflow-hidden">
                              <p className="opacity-70 mb-3 text-primary text-lg">
                                Response
                              </p>

                              <div className="prose dark:prose-invert wrap-break-word overflow-x-auto">
                                <ReactMarkdown>
                                  {(r as any).response}
                                </ReactMarkdown>
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>
                      </Card>
                    </div>
                  ))}
              </div>
            </div>
          </TabsContent>
          <TabsContent value="custom">
            <div className="mt-10 text-center">Coming soon...</div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
