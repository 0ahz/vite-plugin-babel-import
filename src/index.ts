import * as parser from '@babel/parser';
import * as types from '@babel/types';
import traverse from '@babel/traverse';
import generate from '@babel/generator';
import { addSideEffect } from '@babel/helper-module-imports';
import * as changeCase from 'change-case';
import { Plugin, ResolvedConfig } from 'vite';

import * as pkg from '../package.json';

type ChangeCaseType =
  | 'camelCase'
  | 'capitalCase'
  | 'constantCase'
  | 'dotCase'
  | 'headerCase'
  | 'noCase'
  | 'paramCase'
  | 'pascalCase'
  | 'pathCase'
  | 'sentenceCase'
  | 'snakeCase';

interface PluginInnerOption {
  libraryName: string;
  libraryResovle: (name: string) => string;
  styleResovle: null | ((name: string) => string | null | undefined);
}

interface PluginInnerOptions extends Array<PluginInnerOption> {}

interface Specifier {
  imported: {
    name: string;
  };
}

export interface PluginOption {
  libraryName: string;
  libraryDirectory?: string;
  libraryChangeCase?: ChangeCaseType | ((name: string) => string);
  style?: (name: string) => string | null | undefined;
  styleChangeCase?: ChangeCaseType | ((name: string) => string);
  ignoreStyles: string[];
}

export interface PluginOptions extends Array<PluginOption> {}

export default function vitePluginBabelImport(
  plgOptions: PluginOptions
): Plugin {
  let viteConfig: ResolvedConfig;
  return {
    name: pkg.name,
    configResolved(resolvedConfig) {
      viteConfig = resolvedConfig;
    },
    transform(code, id) {
      if (!/\.(?:[jt]sx?|vue)$/.test(id)) return;
      return {
        code: transformSrcCode(code, transformOptions(plgOptions), viteConfig),
        map: null,
      };
    },
  };
}

function transformOptions(options: PluginOptions): PluginInnerOptions {
  return options.map((opt) => {
    let libraryCaseFn: (name: string) => string;
    let styleCaseFn: (name: string) => string;
    if (typeof opt.libraryChangeCase === 'function') {
      libraryCaseFn = opt.libraryChangeCase;
    } else {
      libraryCaseFn = (name) => {
        return changeCase[
          (opt.libraryChangeCase || 'paramCase') as ChangeCaseType
        ](name);
      };
    }
    if (typeof opt.styleChangeCase === 'function') {
      styleCaseFn = opt.styleChangeCase;
    } else {
      styleCaseFn = (name) => {
        return changeCase[
          (opt.styleChangeCase || 'paramCase') as ChangeCaseType
        ](name);
      };
    }
    return {
      libraryName: opt.libraryName,
      libraryResovle: (name) => {
        let libraryPaths: string[] = [opt.libraryName];
        if (opt.libraryDirectory) {
          libraryPaths.push(opt.libraryDirectory);
        }
        libraryPaths.push(libraryCaseFn(name));
        return libraryPaths.join('/').replace(/\/\//g, '/');
      },
      styleResovle: opt.style
        ? (name) => {
            if (opt.ignoreStyles?.includes(name)) return null;
            return opt.style!(styleCaseFn(name));
          }
        : null,
    } as PluginInnerOption;
  });
}

function transformSrcCode(
  code: string,
  plgOptions: PluginInnerOptions,
  viteConfig: ResolvedConfig
): string {
  const ast = parser.parse(code, {
    sourceType: 'module',
    plugins: ['jsx', 'typescript'],
  });
  traverse(ast, {
    enter(path) {
      const { node } = path;
      if (types.isImportDeclaration(node)) {
        const { value } = node.source;
        const plgOpt = plgOptions.find((opt) => opt.libraryName === value);
        if (plgOpt) {
          let importStyles: string[] = [];
          let declarations: types.ImportDeclaration[] = [];
          node.specifiers.forEach((spec) => {
            if (types.isImportSpecifier(spec)) {
              let importedName = (spec as Specifier).imported.name;
              let libPath = plgOpt.libraryResovle(importedName);
              declarations.push(
                types.importDeclaration(
                  [
                    types.importDefaultSpecifier(
                      types.identifier(importedName)
                    ),
                  ],
                  types.stringLiteral(libPath)
                )
              );
              if (plgOpt.styleResovle) {
                let styleImpPath = plgOpt.styleResovle!(importedName);
                if (styleImpPath) {
                  importStyles.push(styleImpPath);
                }
              }
            }
          });
          path.replaceWithMultiple(declarations);
          importStyles.forEach((style) => {
            addSideEffect(path, style);
          });
        }
      }
    },
  });
  return generate(ast).code;
}
