import { Check } from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Create a Project",
    description:
      "Sign up and create your first mock API project in seconds. Give it a name and description.",
    code: `POST /api/projects
{
  "name": "E-commerce API",
  "description": "Mock API for my online store"
}`,
  },
  {
    number: "02",
    title: "Define Endpoints",
    description:
      "Add endpoints with custom paths, methods, and response schemas using Faker.js templates.",
    code: `POST /api/projects/:id/endpoints
{
  "path": "/users/:id",
  "method": "GET",
  "responseSchema": {
    "id": "{{params.id}}",
    "name": "{{person.fullName}}",
    "email": "{{internet.email}}"
  }
}`,
  },
  {
    number: "03",
    title: "Get Your API Key",
    description:
      "Generate an API key to authenticate requests. You can create multiple keys for different environments.",
    code: `POST /api/projects/:id/api-keys
{
  "name": "Production Key"
}

// Response
{
  "plainKey": "mk_prod_abc123..."
}`,
  },
  {
    number: "04",
    title: "Start Making Requests",
    description:
      "Use your mock endpoint in your frontend application. Get realistic fake data instantly.",
    code: `GET /mock/proj_123/users/456
x-api-key: mk_prod_abc123...

// Response
{
  "id": "456",
  "name": "Alice Johnson",
  "email": "alice.johnson@example.com"
}`,
  },
];

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="py-24">
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
        <div className="space-y-16">
          {steps.map((step, index) => (
            <div
              key={step.number}
              className={`flex flex-col lg:flex-row gap-8 items-center ${
                index % 2 === 1 ? "lg:flex-row-reverse" : ""
              }`}
            >
              {/* Content */}
              <div className="flex-1 space-y-4">
                <div className="inline-flex items-center gap-3">
                  <span className="text-4xl font-bold gradient-text">
                    {step.number}
                  </span>
                  <div className="h-px flex-1 bg-gradient-to-r from-primary/50 to-transparent max-w-[100px]" />
                </div>
                <h3 className="text-2xl font-bold">{step.title}</h3>
                <p className="text-muted-foreground max-w-md">
                  {step.description}
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2 text-sm">
                    <Check className="h-4 w-4 text-success" />
                    <span>No credit card required</span>
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <Check className="h-4 w-4 text-success" />
                    <span>Free tier available</span>
                  </li>
                </ul>
              </div>

              {/* Code Block */}
              <div className="flex-1 w-full">
                <div className="rounded-xl overflow-hidden border shadow-lg">
                  <div className="flex items-center gap-2 px-4 py-3 border-b bg-muted/50">
                    <div className="flex gap-1.5">
                      <div className="w-3 h-3 rounded-full bg-red-500/80" />
                      <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                      <div className="w-3 h-3 rounded-full bg-green-500/80" />
                    </div>
                    <span className="text-xs text-muted-foreground ml-2">
                      terminal
                    </span>
                  </div>
                  <div className="p-4 bg-gray-950 overflow-x-auto">
                    <pre className="text-sm text-gray-100 font-mono whitespace-pre">
                      {step.code}
                    </pre>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
