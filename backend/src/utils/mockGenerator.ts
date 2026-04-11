// src/utils/mockGenerator.ts
import { faker } from "@faker-js/faker";

const fakerAliases: Record<string, string> = {
  "name.firstName": "person.firstName",
  "name.lastName": "person.lastName",
  "name.fullName": "person.fullName",
  "random.uuid": "string.uuid",
  "random.numeric": "number.int",
  "datatype.boolean": "datatype.boolean",
  "image.avatar": "image.avatar",
  "image.business": "image.url",
  "helpers.arrayElement": "helpers.arrayElement",
  "lorem.sentence": "lorem.sentence",
  "lorem.paragraph": "lorem.paragraph",
  "internet.email": "internet.email",
  "internet.url": "internet.url",
  "date.past": "date.past",
  "date.recent": "date.recent",
  "date.future": "date.future",
  "commerce.productName": "commerce.productName",
  "commerce.price": "commerce.price",
  "commerce.productDescription": "commerce.productDescription",
  "commerce.department": "commerce.department",
  "address.city": "location.city",
  "address.country": "location.country",
  "phone.number": "phone.number",
};

/**
 * Check if a value contains any {{...}} template expressions
 */
const containsTemplate = (value: any): boolean => {
  if (typeof value === "string") {
    return /\{\{[^}]+\}\}/.test(value);
  }
  if (Array.isArray(value)) {
    return value.some(containsTemplate);
  }
  if (value && typeof value === "object") {
    return Object.values(value).some(containsTemplate);
  }
  return false;
};

/**
 * Auto-detect whether a schema needs faker processing
 */
const detectResponseType = (schema: any): "static" | "dynamic" => {
  return containsTemplate(schema) ? "dynamic" : "static";
};

/**
 * Parse a template string and replace {{...}} expressions
 */
export const parseTemplate = (
  template: string,
  params: Record<string, any> = {},
): string => {
  // If no template expressions exist, return as-is (static string)
  if (!containsTemplate(template)) {
    return template;
  }

  return template.replace(/\{\{([^}]+)\}\}/g, (match, expression) => {
    try {
      const trimmed = expression.trim();

      // Handle params.id, params.slug etc (route parameters)
      if (trimmed.startsWith("params.")) {
        const key = trimmed.replace("params.", "");
        return String(params[key] ?? "");
      }

      // Handle query.search, query.page etc (query parameters)
      if (trimmed.startsWith("query.")) {
        const key = trimmed.replace("query.", "");
        return String(params[`query_${key}`] ?? "");
      }

      // Handle body.fieldName (echo request body fields)
      if (trimmed.startsWith("body.")) {
        const key = trimmed.replace("body.", "");
        return String(params[`body_${key}`] ?? "");
      }

      // Handle headers.authorization, headers.user-agent etc
      if (trimmed.startsWith("headers.")) {
        const key = trimmed.replace("headers.", "");
        return String(params[`header_${key}`] ?? "");
      }

      // Handle function calls with arguments: helpers.arrayElement(["a", "b", "c"])
      const fnMatch = trimmed.match(/^([\w.]+)\((.+)\)$/);
      if (fnMatch) {
        const [, path, argsStr] = fnMatch;
        const resolvedPath = fakerAliases[path!] ?? path!;
        const parts = resolvedPath.split(".");
        let obj: any = faker;

        for (let i = 0; i < parts.length - 1; i++) {
          obj = obj?.[parts[i]!];
          if (!obj) return match;
        }

        const fn = obj?.[parts[parts.length - 1]!];
        if (typeof fn === "function") {
          try {
            const args = JSON.parse(argsStr!);
            return String(fn.call(obj, args));
          } catch {
            return match;
          }
        }
      }

      // Handle simple faker paths: person.fullName, internet.email, etc.
      const resolvedPath = fakerAliases[trimmed] ?? trimmed;
      const parts = resolvedPath.split(".");
      let obj: any = faker;

      for (let i = 0; i < parts.length - 1; i++) {
        obj = obj?.[parts[i]!];
        if (!obj) return match;
      }

      const lastPart = parts[parts.length - 1]!;
      const result = obj?.[lastPart];

      if (typeof result === "function") {
        return String(result.call(obj));
      }

      if (result !== undefined && result !== null) {
        return String(result);
      }

      return match;
    } catch (error) {
      return match;
    }
  });
};

/**
 * Generate mock data — auto-detects static vs dynamic
 * @param schema - The response schema (can be static JSON or contain {{faker}} templates)
 * @param params - Context data (route params, query, body, headers)
 */
export const generateMockData = (
  schema: any,
  params: Record<string, any> = {},
): any => {
  // Auto-detect mode
  const mode = detectResponseType(schema);

  // Static mode: return deep clone to prevent mutation
  if (mode === "static") {
    return structuredClone(schema);
  }

  // Dynamic mode: process templates
  if (typeof schema === "string") {
    return parseTemplate(schema, params);
  }

  if (Array.isArray(schema)) {
    return schema.map((item) => generateMockData(item, params));
  }

  if (schema && typeof schema === "object") {
    const result: any = {};
    for (const [key, value] of Object.entries(schema)) {
      result[key] = generateMockData(value, params);
    }
    return result;
  }

  return schema;
};

/**
 * Helper to check if schema is static (useful for logging/debugging)
 */
export const isStaticSchema = (schema: any): boolean => {
  return detectResponseType(schema) === "static";
};
