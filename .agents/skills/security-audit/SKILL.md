---
name: security-audit
description: "Use when auditing code for security vulnerabilities, OWASP Top 10 risks, payment/order data sanitization, secrets leaks, or dependency CVEs."
---

# Security Audit & Vulnerability Assessment Skill

Use this skill when auditing code for security vulnerabilities, OWASP Top 10 risks, or dependency CVEs.

## Capabilities & Workflow
1. **Static Analysis (SAST)**: Check input sanitization, SQL injection, XSS, CSRF, insecure deserialization, and path traversal vulnerabilities.
2. **Secret Detection**: Scan for hardcoded secrets, private keys, JWT secrets, or environment variables in source code and git history.
3. **Dependency Auditing**: Run `npm audit`, `cargo audit`, or `pip-audit` to detect vulnerable packages.
4. **Remediation**: Provide actionable code fixes and dependency version upgrades.
