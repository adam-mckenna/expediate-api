import "reflect-metadata";

import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { writeFile } from "node:fs/promises";
import { join } from "node:path";

import { AppModule } from "../src/app.module";

/**
 * Generates an OpenAPI spec JSON file for downstream type generation.
 *
 * Output: expediate-api/openapi.json
 */
async function generateOpenApi() {
  const app = await NestFactory.create(AppModule, { logger: false });

  const config = new DocumentBuilder()
    .setTitle("Expediate API")
    .setDescription("All endpoints available in the Expediate API")
    .setVersion("1.0")
    .build();

  const document = SwaggerModule.createDocument(app, config);
  const outputPath = join(process.cwd(), "openapi.json");

  await writeFile(outputPath, JSON.stringify(document, null, 2), "utf-8");
  await app.close();

  // eslint-disable-next-line no-console
  console.log(`Wrote OpenAPI spec to ${outputPath}`);
}

generateOpenApi().catch((err) => {
  // eslint-disable-next-line no-console
  console.error("Failed to generate OpenAPI spec:", err);
  process.exit(1);
});

