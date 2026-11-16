---
name: realtime-notifications
description: Live updates and notifications using Supabase Realtime plus optional Firebase Cloud Messaging push. Use when building dashboards, ticket boards or alerts.
---
# realtime-notifications
- Source of truth: Postgres. `notifications` rows are created by DB triggers (assigned, status changed).
- In-app live: subscribe via Supabase Realtime to tickets, notifications, facilities, reservations. RLS applies to realtime; add a test that a user never receives rows they cannot read.
- Push (stretch, only after core works): Firebase Cloud Messaging with a service worker; device tokens in `device_tokens`; a server function sends push when a notification row is inserted. iOS web push needs the app installed to the home screen; test on a real phone. If not stable by hour 40, ship in-app live notifications only and list push as a known gap.
- Never copy business data into Firestore. Firebase only delivers messages.
