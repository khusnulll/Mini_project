import React from "react";
import { useState } from "react";
import { Configuration, OpenAIApi } from "openai";

import Button from "./Button";
import Input from "./Input";

const Chat = () => {
  const configuration = new Configuration({
    apiKey: import.meta.env.VITE_OPENAI_KEY,
  });

  const openai = new OpenAIApi(configuration);

  const [result, setResult] = useState("");
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);

  const handleResult = async () => {
    setLoading(true);
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: prompt,
      temperature: 0.5,
      max_tokens: 256,
    });
    setResult(response.data.choices[0].text);
    setLoading(false);
  };

  return (
    <section className="w-screen h-screen flex justify-center items-center">
      <div className="sm:w-3/4 md:w-1/2 lg:w-1/2 flex flex-col gap-y-5">
        <h1 className="text-center font-semibold text-3xl">Chatbox</h1>
        <div className="flex gap-x-2">
          <Input id="openai" placeholder="type your input here..." value={prompt} onChange={(e) => setPrompt(e.target.value)} />
          <Button id={"submit"} label={"Send"} onClick={() => handleResult()} />
        </div>
        <div className="w-full h-80">
          <textarea className="bg-white w-full h-80 border p-4 rounded-md shadow-md pt-0" value={result} onChange={() => setResult(e.target.value)}></textarea>
        </div>
      </div>
    </section>
  );
};

export default Chat;
