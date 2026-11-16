---
name: payment-demo
description: Mock payment flow for the demo only. Use for any checkout, charge-to-stay or receipt screen.
---
# payment-demo
- Payments are NOT verified yet. Build a clearly labelled DEMO payment flow only.
- Never collect, store or log real card numbers. The fake card form accepts only the test value 4242 4242 4242 4242 and discards it immediately. Store only amount, currency, reservation id, status 'demo_paid', timestamp.
- Choices: "Pay now (demo)", "Add to my stay", "Pay at venue".
- Show banner "Demo mode - no money moves" on every payment screen and receipt.
- All logic behind one interface PaymentProvider { createCharge, getStatus } with DemoProvider now; a real provider is swapped in later after management verifies one.
