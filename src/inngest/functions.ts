import { inngest } from "./client";
import prisma from "@/lib/db";
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { generateText } from "ai";
import { step } from "inngest";
import * as Sentry from "@sentry/nextjs";


const google = createGoogleGenerativeAI();
export const execute = inngest.createFunction(
  { id: "execute-ai" },
  { event: "execute/ai" },
  
  async ({ event, step }) => {
    Sentry.logger.info('User triggered test log', { log_source: 'sentry_test' }) 
    const { steps } = await step.ai.wrap("gemini-generate-text", generateText, {
      model: google("gemini-2.5-flash"),
      system: "You are a helpfull assistant",
      prompt: "what is 2+2",
      experimental_telemetry: {
        isEnabled: true,
        recordInputs: true,
        recordOutputs: true,
      },
    });
    return steps;
  }
);
