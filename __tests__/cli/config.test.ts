import { describe, it, expect } from 'vitest';
import { loadConfig, findConfigPath, saveConfig } from '../../src/cli/utils/config.js';
import fs from 'fs-extra';
import path from 'path';
import os from 'os';

describe('findConfigPath', () => {
  it('returns null when no kodda.json exists', () => {
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'kodda-test-'));
    try {
      expect(findConfigPath(tmpDir)).toBeNull();
    } finally {
      fs.removeSync(tmpDir);
    }
  });

  it('finds kodda.json in current directory', () => {
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'kodda-test-'));
    try {
      const configPath = path.join(tmpDir, 'kodda.json');
      fs.writeJSONSync(configPath, { componentDir: 'src/components/kodda' });
      expect(findConfigPath(tmpDir)).toBe(configPath);
    } finally {
      fs.removeSync(tmpDir);
    }
  });

  it('finds kodda.json by searching up directories', () => {
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'kodda-test-'));
    try {
      const subDir = path.join(tmpDir, 'src', 'components');
      fs.ensureDirSync(subDir);
      const configPath = path.join(tmpDir, 'kodda.json');
      fs.writeJSONSync(configPath, { componentDir: 'src/components/kodda' });
      expect(findConfigPath(subDir)).toBe(configPath);
    } finally {
      fs.removeSync(tmpDir);
    }
  });
});

describe('loadConfig', () => {
  it('loads a valid kodda.json', async () => {
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'kodda-test-'));
    try {
      fs.writeJSONSync(path.join(tmpDir, 'kodda.json'), {
        componentDir: 'src/components/kodda',
        typescript: true,
        alias: '@/components/kodda',
        shadcnAlias: '@/components/ui',
        registry: 'https://example.com/registry.json',
        installed: {},
      });
      const config = await loadConfig(tmpDir);
      expect(config.componentDir).toBe('src/components/kodda');
      expect(config.typescript).toBe(true);
    } finally {
      fs.removeSync(tmpDir);
    }
  });

  it('throws on missing kodda.json', async () => {
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'kodda-test-'));
    try {
      await expect(loadConfig(tmpDir)).rejects.toThrow('kodda.json not found');
    } finally {
      fs.removeSync(tmpDir);
    }
  });

  it('throws on invalid kodda.json', async () => {
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'kodda-test-'));
    try {
      fs.writeFileSync(path.join(tmpDir, 'kodda.json'), '"not an object"');
      await expect(loadConfig(tmpDir)).rejects.toThrow('invalid');
    } finally {
      fs.removeSync(tmpDir);
    }
  });
});

describe('saveConfig', () => {
  it('saves config to kodda.json', async () => {
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'kodda-test-'));
    try {
      await saveConfig(
        {
          componentDir: 'src/components/kodda',
          typescript: true,
          alias: '@/components/kodda',
          shadcnAlias: '@/components/ui',
          registry: 'https://example.com/registry.json',
          installed: {},
        },
        tmpDir,
      );
      const saved = fs.readJSONSync(path.join(tmpDir, 'kodda.json'));
      expect(saved.componentDir).toBe('src/components/kodda');
    } finally {
      fs.removeSync(tmpDir);
    }
  });
});
