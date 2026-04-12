import { Check } from "lucide-react";
import Image from "next/image";

import createProjectImg from "@/images/overview.png"; // Step 1
import createEndpoint from "@/images/endpoint.png"; // Step 2
import apiKeyImg from "@/images/api-key.png"; // Step 3
import playgroundImg from "@/images/playground.png"; // Step 4

const steps = [
  {
    number: "01",
    title: "Create a Project",
    description:
      "Sign up and create your first mock API project in seconds. Give it a name and description.",
    image: createProjectImg,
    alt: "Creating a new mock API project dashboard",
  },
  {
    number: "02",
    title: "Define Endpoints",
    description:
      "Add endpoints with custom paths, methods, and response schemas using static or dynamic using Faker.js templates.",
    image: createEndpoint,
    alt: "Defining API endpoints with HTTP method badges",
    highlight: "Supported Methods: GET, POST, PUT, DELETE",
  },
  {
    number: "03",
    title: "Get Your API Key",
    description:
      "Generate secure API keys for authentication. Create multiple keys for different environments.",
    image: apiKeyImg,
    alt: "Generating and viewing a new API key",
  },
  {
    number: "04",
    title: "Start Making Requests",
    description:
      "Test your endpoints instantly in the built-in Playground or integrate with your frontend app.Also save save apikey locally for easy access.",
    image: playgroundImg,
    alt: "Using the API Playground to test mock endpoints",
  },
];

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="py-24 bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
            Up and running in{" "}
            <span className="gradient-text">4 simple steps</span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            From zero to working mock API in under 5 minutes. No complex setup
            required.
          </p>
        </div>

        {/* Steps */}
        <div className="space-y-20">
          {steps.map((step, index) => (
            <div
              key={step.number}
              className={`flex flex-col lg:flex-row gap-12 items-center ${
                index % 2 === 1 ? "lg:flex-row-reverse" : ""
              }`}
            >
              {/* Content Side */}
              <div className="flex-1 space-y-6">
                <div className="inline-flex items-center gap-3">
                  <span className="text-5xl font-bold gradient-text">
                    {step.number}
                  </span>
                  <div className="h-px flex-1 bg-gradient-to-r from-primary/50 to-transparent" />
                </div>

                <h3 className="text-3xl font-bold tracking-tight">
                  {step.title}
                </h3>
                <p className="text-lg text-muted-foreground max-w-md">
                  {step.description}
                </p>

                {step.highlight && (
                  <p className="text-sm font-medium text-primary">
                    {step.highlight}
                  </p>
                )}

                <ul className="space-y-2 pt-2">
                  <li className="flex items-center gap-2 text-sm">
                    <Check className="h-4 w-4 text-success" />
                    <span>Instant setup</span>
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <Check className="h-4 w-4 text-success" />
                    <span>Realistic fake data</span>
                  </li>
                </ul>
              </div>

              {/* Visual Side - FIXED IMAGE SIZING */}
              <div className="flex-1 w-full">
                <div className="rounded-2xl overflow-hidden border shadow-2xl bg-muted/30 relative group">
                  <Image
                    src={step.image}
                    alt={step.alt}
                    width={700} // Reduced from 800
                    height={460} // Reduced from 520
                    className="w-full h-auto object-contain bg-white dark:bg-gray-950 p-2" // Changed to object-contain + padding
                    priority={index === 0}
                    quality={95} // Better quality
                  />

                  {/* Subtle overlay */}
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/20 rounded-2xl pointer-events-none" />
                </div>

                <p className="text-center text-xs text-muted-foreground mt-3 tracking-wide">
                  {step.title} • Live Preview
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}