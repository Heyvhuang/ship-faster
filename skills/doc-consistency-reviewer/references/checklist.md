# Audit Checklist

## Table of Contents

1. [README Features](#1-readme-features)
2. [External Interfaces and Contracts](#2-external-interfaces-and-contracts)
3. [Configuration and Environment Variables](#3-configuration-and-environment-variables)
4. [Security and Permissions](#4-security-and-permissions)
5. [Running and Scripts](#5-running-and-scripts)
6. [Views and Module Behavior](#6-views-and-module-behavior)
7. [Testing and Quality Assurance](#7-testing-and-quality-assurance)
8. [Terminology and Naming](#8-terminology-and-naming)

---

## 1. README Features

- [ ] Are all features/functions in the README clearly implemented or have clear entry points?
- [ ] Are there any deprecated or hidden features still documented in the README?
- [ ] Do the supported platforms/protocols/formats declared in docs match what the code actually supports?
- [ ] Are version numbers and dependency versions consistent with package.json/requirements.txt?
- [ ] Does the project architecture diagram reflect the current directory structure?

## 2. External Interfaces and Contracts

- [ ] Do API examples, parameters, and return values in docs match OpenAPI/proto/schema/TS types?
- [ ] Do endpoints/methods claimed in docs actually exist in code?
- [ ] Are new interfaces in code yet to be documented?
- [ ] Are request/response field names consistent?
- [ ] Are required/optional parameters correctly marked?
- [ ] Do default values match the implementation?
- [ ] Are error/status codes fully listed?

## 3. Configuration and Environment Variables

- [ ] Do environment variable names listed in docs match those read in code?
- [ ] Do environment variable defaults match fallbacks in code?
- [ ] Are required environment variables correctly marked?
- [ ] Do feature flags actually exist in code?
- [ ] Are configuration file paths correct?
- [ ] Are configuration value types (string/number/boolean) correct?

## 4. Security and Permissions

- [ ] Does authentication method match implementation (JWT/Session/OAuth)?
- [ ] Do roles/permissions/scope definitions match checks in code?
- [ ] Are sandbox/contextIsolation and other security settings enabled as documented?
- [ ] Is encryption/HTTPS configured as documented?
- [ ] Does CORS policy match documentation?
- [ ] Does CSP policy match documentation?

## 5. Running and Scripts

- [ ] Do startup commands match package.json scripts?
- [ ] Can build commands execute successfully?
- [ ] Do test commands match test framework configuration?
- [ ] Do deployment commands match CI/CD configuration?
- [ ] Can "Quick Start" steps run successfully in one go?
- [ ] Are there references to removed scripts or directories?
- [ ] Are dependency installation commands correct?

## 6. Views and Module Behavior

- [ ] Do key pages/modules described in docs have corresponding components?
- [ ] Do buttons/switches/options mentioned in docs actually exist?
- [ ] Does component behavior match documentation?
- [ ] Do routes match documentation?
- [ ] Do screenshots reflect current UI?

## 7. Testing and Quality Assurance

- [ ] Does test framework match documentation?
- [ ] Can test commands execute successfully?
- [ ] Does coverage configuration match what's documented?
- [ ] Does CI flow match documentation?

## 8. Terminology and Naming

- [ ] Do type names/enum names/module names match documentation terminology?
- [ ] Do enum status values correspond one-to-one with Chinese descriptions in docs?
- [ ] Can example code compile/run?
- [ ] Have referenced functions/types/modules been renamed or moved?
- [ ] Are links valid (no 404)?

---

## Project Type-Specific Checks

### Electron Projects

- [ ] Do main/renderer process boundaries match documentation?
- [ ] Do preload script APIs match documentation?
- [ ] Are contextIsolation/nodeIntegration settings as documented?
- [ ] Do IPC channel names match documentation?
- [ ] Do window configurations match documentation?

### Web Frontend Projects

- [ ] Does routing configuration match documentation?
- [ ] Does state management solution match documentation?
- [ ] Do component library versions match documentation?
- [ ] Does build output directory match documentation?

### Backend API Projects

- [ ] Does middleware order match documentation?
- [ ] Does database schema match documentation?
- [ ] Does caching strategy match documentation?
- [ ] Does rate limiting configuration match documentation?

### CLI Tool Projects

- [ ] Do command names match documentation?
- [ ] Do options/arguments match documentation?
- [ ] Does output format match documentation examples?
- [ ] Do exit codes match documentation?
