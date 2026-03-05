import { describe, it, expect } from 'vitest';
import { rewriteImports, detectPackageManager } from '../../src/cli/utils/installer.js';
import { KoddaConfig } from '../../src/cli/utils/config.js';
import fs from 'fs-extra';
import path from 'path';
import os from 'os';

const mockConfig: KoddaConfig = {
  componentDir: 'src/components/kodda',
  typescript: true,
  alias: '@/components/kodda',
  shadcnAlias: '@/components/ui',
  registry: 'https://example.com/registry.json',
  installed: {},
};

describe('rewriteImports', () => {
  it('rewrites kodda imports', () => {
    const input = `import { FilterBar } from '@/components/kodda/composites/filter-bar';`;
    const result = rewriteImports(input, mockConfig);
    expect(result).toBe(`import { FilterBar } from '@/components/kodda/composites/filter-bar';`);
  });

  it('rewrites shadcn imports', () => {
    const input = `import { Button } from '@/components/ui/button';`;
    const result = rewriteImports(input, mockConfig);
    expect(result).toBe(`import { Button } from '@/components/ui/button';`);
  });

  it('rewrites both kodda and shadcn imports in the same content', () => {
    const input = [
      `import { Button } from '@/components/ui/button';`,
      `import { FilterBar } from '@/components/kodda/composites/filter-bar';`,
    ].join('\n');
    const result = rewriteImports(input, mockConfig);
    expect(result).toContain(`@/components/ui/button`);
    expect(result).toContain(`@/components/kodda/composites/filter-bar`);
  });

  it('rewrites to custom aliases', () => {
    const customConfig: KoddaConfig = {
      ...mockConfig,
      alias: '~/lib/kodda',
      shadcnAlias: '~/lib/ui',
    };
    const input = `import { Button } from '@/components/ui/button';\nimport { FilterBar } from '@/components/kodda/composites/filter-bar';`;
    const result = rewriteImports(input, customConfig);
    expect(result).toContain(`~/lib/ui/button`);
    expect(result).toContain(`~/lib/kodda/composites/filter-bar`);
  });
});

describe('detectPackageManager', () => {
  it('detects npm by default', () => {
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'kodda-test-'));
    try {
      expect(detectPackageManager(tmpDir)).toBe('npm');
    } finally {
      fs.removeSync(tmpDir);
    }
  });

  it('detects pnpm', () => {
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'kodda-test-'));
    try {
      fs.writeFileSync(path.join(tmpDir, 'pnpm-lock.yaml'), '');
      expect(detectPackageManager(tmpDir)).toBe('pnpm');
    } finally {
      fs.removeSync(tmpDir);
    }
  });

  it('detects yarn', () => {
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'kodda-test-'));
    try {
      fs.writeFileSync(path.join(tmpDir, 'yarn.lock'), '');
      expect(detectPackageManager(tmpDir)).toBe('yarn');
    } finally {
      fs.removeSync(tmpDir);
    }
  });

  it('detects bun', () => {
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'kodda-test-'));
    try {
      fs.writeFileSync(path.join(tmpDir, 'bun.lockb'), '');
      expect(detectPackageManager(tmpDir)).toBe('bun');
    } finally {
      fs.removeSync(tmpDir);
    }
  });
});
