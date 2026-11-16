---
name: mobile-pwa-ui
description: Mobile-first installable web app UI rules for the resort apps (guest, resident, worker, management). Use for any screen.
---
# mobile-pwa-ui
- Mobile first, tested at 375px. Touch targets 44px minimum. Bottom navigation per role.
- Any common action in 3 taps or fewer. Camera photo upload in one tap for workers.
- Role homes: guest (book, request), resident (my unit, report, book), worker (my tasks, checks), management (dashboard, board), admin (users, audit).
- Light and dark mode through CSS variables. Text via translation files.
- Empty, loading and error states on every list. Never render data the role may not see.
- Installable: web manifest and icons. Offline task list is Phase 2.
