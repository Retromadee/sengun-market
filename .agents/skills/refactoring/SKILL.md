---
name: refactoring
description: "Use when refactoring legacy code, decoupling client/server logic, improving maintainability, or cleaning up architecture without breaking tests."
---

# Code Refactoring & Architecture Skill

Use this skill when refactoring legacy code, decoupling modules, or improving code readability, maintainability, and extensibility.

## Capabilities & Workflow
1. **Safety Net Verification**: Ensure tests exist and pass (`npm test`, `pytest`, `cargo test`) before touching code.
2. **Behavior Preservation**: Refactor in small, incremental steps without changing public API behavior.
3. **Clean Code Principles**: Apply DRY, SOLID, low coupling/high cohesion, and clear naming conventions.
4. **Dead Code Elimination**: Identify and safely remove unused functions, imports, variables, and dead branches.
5. **Post-Refactor Validation**: Re-run full test suite and linter/type-checkers (`tsc`, `eslint`, `ruff`, `clippy`).
