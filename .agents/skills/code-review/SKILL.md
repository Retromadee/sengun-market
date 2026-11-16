---
name: code-review
description: "Use when reviewing code changes, inspecting git diffs, preparing pull requests, or verifying adherence to senior software engineering standards before merging."
---

# Code Review & Pull Request Skill

Use this skill when conducting code reviews, analyzing PR diffs, or ensuring adherence to senior engineering standards before merging.

## Capabilities & Workflow
1. **Diff Analysis**: Inspect `git status`, `git diff`, and recent commits (`git log -n 10 --oneline`).
2. **Architecture & Conventions**: Verify naming consistency, design pattern alignment, and anti-pattern avoidance (e.g., God objects, tight coupling, missing error boundaries).
3. **Safety & Secrets Check**: Ensure no hardcoded credentials, sensitive tokens, or API keys are exposed.
4. **Pull Request Preparation**: Format concise PR descriptions with summary of changes, motivation, testing strategy, and risk assessment using `gh pr create`.
