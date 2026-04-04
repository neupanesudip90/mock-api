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
  "internet.email": "internet.email",
  "date.past": "date.past",
  "date.recent": "date.recent",
  "commerce.productName": "commerce.productName",
  "commerce.price": "commerce.price",
  "commerce.productDescription": "commerce.productDescription",
  "commerce.department": "commerce.department",
};

export const parseTemplate = (
  template: string,
  params: Record<string, string> = {},
): string => {
  return template.replace(/\{\{([^}]+)\}\}/g, (_, expression) => {
    try {
      const trimmed = expression.trim();

      // Handle params.id, params.slug etc
      if (trimmed.startsWith("params.")) {
        const key = trimmed.replace("params.", "");
        return params[key] ?? "";
      }

      // Handle helpers.arrayElement(["a", "b"]) with arguments
      const fnMatch = trimmed.match(/^([\w.]+)\((.+)\)$/);
      if (fnMatch) {
        const [, path, argsStr] = fnMatch;
        const resolvedPath = fakerAliases[path!] ?? path!;
        const parts = resolvedPath.split(".");
        let obj: any = faker;
        for (let i = 0; i < parts.length - 1; i++) {
          obj = obj?.[parts[i]!];
        }
        const fn = obj?.[parts[parts.length - 1]!];
        if (typeof fn === "function") {
          const args = JSON.parse(argsStr!);
          return String(fn.call(obj, args));
        }
      }

      // Resolve alias or use as-is
      const resolvedPath = fakerAliases[trimmed] ?? trimmed;
      const parts = resolvedPath.split(".");
      let obj: any = faker;
      for (let i = 0; i < parts.length - 1; i++) {
        obj = obj?.[parts[i]!];
      }
      const lastPart = parts[parts.length - 1]!;
      const result = obj?.[lastPart];

      if (typeof result === "function") {
        return String(result.call(obj));
      }
      return String(result ?? "");
    } catch {
      return `{{${expression}}}`;
    }
  });
};

export const generateMockData = (
  schema: any,
  params: Record<string, string> = {},
): any => {
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
