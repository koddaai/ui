import fs from 'fs-extra';
import path from 'path';

export interface KoddaConfig {
  componentDir: string;
  typescript: boolean;
  alias: string;
  shadcnAlias: string;
  registry: string;
  installed: Record<
    string,
    {
      version: string;
      hash?: string;
      installedAt: string;
    }
  >;
}

const CONFIG_FILENAME = 'kodda.json';

const DEFAULT_CONFIG: KoddaConfig = {
  componentDir: 'src/components/kodda',
  typescript: true,
  alias: '@/components/kodda',
  shadcnAlias: '@/components/ui',
  registry: 'https://raw.githubusercontent.com/kodda/ui/main/registry/registry.json',
  installed: {},
};

export function getDefaultConfig(): KoddaConfig {
  return { ...DEFAULT_CONFIG, installed: {} };
}

export function findConfigPath(startDir: string = process.cwd()): string | null {
  let dir = path.resolve(startDir);
  const root = path.parse(dir).root;

  while (dir !== root) {
    const configPath = path.join(dir, CONFIG_FILENAME);
    if (fs.existsSync(configPath)) {
      return configPath;
    }
    dir = path.dirname(dir);
  }

  return null;
}

export async function loadConfig(startDir?: string): Promise<KoddaConfig> {
  const configPath = findConfigPath(startDir);
  if (!configPath) {
    throw new Error(
      'kodda.json not found. Run `npx @kodda/ui init` to initialize your project.',
    );
  }

  const raw = await fs.readJSON(configPath);
  return validateConfig(raw);
}

function validateConfig(raw: unknown): KoddaConfig {
  if (typeof raw !== 'object' || raw === null) {
    throw new Error('kodda.json is invalid: expected an object.');
  }

  const config = raw as Record<string, unknown>;

  if (typeof config.componentDir !== 'string') {
    throw new Error('kodda.json is invalid: missing or invalid "componentDir".');
  }

  return {
    componentDir: config.componentDir as string,
    typescript: config.typescript !== false,
    alias: (config.alias as string) || DEFAULT_CONFIG.alias,
    shadcnAlias: (config.shadcnAlias as string) || DEFAULT_CONFIG.shadcnAlias,
    registry: (config.registry as string) || DEFAULT_CONFIG.registry,
    installed: (config.installed as KoddaConfig['installed']) || {},
  };
}

export async function saveConfig(config: KoddaConfig, dir: string = process.cwd()): Promise<void> {
  const configPath = path.join(dir, CONFIG_FILENAME);
  await fs.writeJSON(configPath, config, { spaces: 2 });
}
