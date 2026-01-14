# Review Checklist

## Table of Contents

1. [README Features](#1-readme-features)
2. [External Interfaces and Contracts](#2-external-interfaces-and-contracts)
3. [Configuration and Environment Variables](#3-configuration-and-environment-variables)
4. [Security and Permissions](#4-security-and-permissions)
5. [Running Methods and Scripts](#5-running-methods-and-scripts)
6. [Views and Module Behavior](#6-views-and-module-behavior)
7. [Testing and Quality Assurance](#7-testing-and-quality-assurance)
8. [Terminology and Naming](#8-terminology-and-naming)

---

## 1. README Features

- [ ] Do all features/capabilities in README have clear implementations or entry points?
- [ ] Are there deprecated or hidden features still documented in README?
- [ ] Do documented supported platforms/protocols/formats match actual code support?
- [ ] Do version numbers and dependency versions match package.json/requirements.txt?
- [ ] Does project architecture diagram reflect current directory structure?

## 2. External Interfaces and Contracts

- [ ] Do API examples, parameters, and return values in docs match OpenAPI/proto/schema/TS types?
- [ ] Do endpoints/methods claimed in docs actually exist in code?
- [ ] Are new interfaces in code not yet updated in docs?
- [ ] Are request/response field names consistent?
- [ ] Are required/optional parameters correctly marked?
- [ ] Do default values match implementation?
- [ ] Are error codes/status codes completely listed?

## 3. Configuration and Environment Variables

- [ ] Do environment variable names in docs match those read in code?
- [ ] Do environment variable defaults match fallbacks in code?
- [ ] Are required environment variables correctly marked?
- [ ] Do Feature Flags actually exist in code?
- [ ] Are config file paths correct?
- [ ] Are config item types (string/number/boolean) correct?

## 4. Security and Permissions

- [ ] Does authentication method match implementation (JWT/Session/OAuth)?
- [ ] Do role/permission/scope definitions match code's check logic?
- [ ] Are sandbox/contextIsolation security settings enabled as documented?
- [ ] Is encryption/HTTPS configured as documented?
- [ ] Does CORS policy match documentation?
- [ ] Does CSP policy match documentation?

## 5. Running Methods and Scripts

- [ ] Does startup command match package.json scripts?
- [ ] Do build commands execute successfully?
- [ ] Does test command match test framework configuration?
- [ ] Does deploy command match CI/CD configuration?
- [ ] Can "Quick Start" steps run successfully end-to-end?
- [ ] Are there references to removed scripts or directories?
- [ ] Are dependency installation commands correct?

## 6. Views and Module Behavior

- [ ] Do key pages/modules described in docs have corresponding components?
- [ ] Do buttons/switches/options mentioned in docs actually exist?
- [ ] Does component behavior match documentation?
- [ ] Do route paths match documentation?
- [ ] Do screenshots reflect current UI?

## 7. Testing and Quality Assurance

- [ ] Does test framework match documentation?
- [ ] Do test commands execute successfully?
- [ ] Does coverage configuration match documentation claims?
- [ ] Does CI process match documentation?

## 8. Terminology and Naming

- [ ] Do type names/enum names/module names match documentation terminology?
- [ ] Do status enum values correspond to Chinese descriptions in docs one-to-one?
- [ ] Can example code compile/run?
- [ ] Have referenced functions/types/modules been renamed or moved?
- [ ] Are links valid (no 404s)?

---

## Project Type-Specific Checks

### Electron Projects

- [ ] Does main/renderer process boundary match documentation?
- [ ] Do APIs exposed by preload script match documentation?
- [ ] Are contextIsolation/nodeIntegration settings as documented?
- [ ] Do IPC channel names match documentation?
- [ ] Does window configuration match documentation?

### Web Frontend Projects

- [ ] Does route configuration match documentation?
- [ ] Does state management approach match documentation?
- [ ] Does component library version match documentation?
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
