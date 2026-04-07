# 📢 PubSub.js in React
## A Professional Presentation

---

## 1. What is PubSub.js?

**PubSub.js** (`pubsub-js`) is a topic-based publish/subscribe messaging library for JavaScript. It implements the classic **Observer / Event Bus** pattern in a framework-agnostic way.

- 🔗 GitHub: [mroderick/PubSubJS](https://github.com/mroderick/PubSubJS)
- 📦 `npm install pubsub-js`
- Zero dependencies, ~1 KB minified

**Core idea:**
```
Publisher ──[topic]──► Message Bus ──► Subscriber(s)
```

---

## 2. The Problem It Solves

In a React app like **Reactivities**, components may need to communicate **without a direct parent-child relationship**:

| Scenario | Without PubSub | With PubSub |
|---|---|---|
| Sibling component notification | Prop-drilling / lift state | Publish a topic |
| Cross-feature events | Shared store or callbacks | Subscribe from anywhere |
| Decoupled side effects | Tight coupling | Loose coupling via topics |

Your app currently uses **MobX stores** for this — PubSub.js is a complementary (or alternative) lightweight tool for event-driven side effects.

---

## 3. Core API — 3 Methods

```ts
import PubSub from 'pubsub-js';

// 1. SUBSCRIBE — listen for a topic
const token = PubSub.subscribe('ACTIVITY_DELETED', (topic, data) => {
  console.log(`Activity ${data.id} was deleted`);
});

// 2. PUBLISH — fire an event with optional data
PubSub.publish('ACTIVITY_DELETED', { id: 'abc-123' });

// 3. UNSUBSCRIBE — clean up (prevent memory leaks!)
PubSub.unsubscribe(token);
```

---

## 4. Using PubSub.js in a React Component (TypeScript)

### Installation & types
```bash
npm install pubsub-js
npm install --save-dev @types/pubsub-js
```

### Example — Activity Notification Banner

```tsx
// features/activities/ActivityDeleteNotification.tsx
import { useEffect, useState } from 'react';
import PubSub from 'pubsub-js';

const TOPICS = {
  ACTIVITY_DELETED: 'ACTIVITY_DELETED',
  ACTIVITY_UPDATED: 'ACTIVITY_UPDATED',
} as const;

export default function ActivityDeleteNotification() {
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    // Subscribe when component mounts
    const token = PubSub.subscribe(
      TOPICS.ACTIVITY_DELETED,
      (_topic: string, data: { title: string }) => {
        setMessage(`Activity "${data.title}" was deleted`);
        setTimeout(() => setMessage(null), 3000); // auto-dismiss
      }
    );

    // Unsubscribe when component unmounts — CRITICAL
    return () => PubSub.unsubscribe(token);
  }, []);

  if (!message) return null;
  return <div className="notification">{message}</div>;
}
```

### Publishing from the MobX store (your existing pattern)

```ts
// app/stores/activityStore.ts
import PubSub from 'pubsub-js';

deleteActivity = async (id: string) => {
  this.loading = true;
  try {
    await agent.Activities.delete(id);
    const deleted = this.activities.get(id);
    runInAction(() => {
      this.activities.delete(id);
      this.loading = false;
    });
    // Notify any interested components via event bus
    PubSub.publish('ACTIVITY_DELETED', { id, title: deleted?.title });
  } catch (error) {
    runInAction(() => (this.loading = false));
  }
};
```

---

## 5. Custom React Hook Pattern

Encapsulate subscription logic for reuse:

```ts
// app/hooks/usePubSub.ts
import { useEffect } from 'react';
import PubSub from 'pubsub-js';

type Handler<T = unknown> = (topic: string, data: T) => void;

export function usePubSub<T = unknown>(topic: string, handler: Handler<T>) {
  useEffect(() => {
    const token = PubSub.subscribe(topic, handler);
    return () => PubSub.unsubscribe(token); // auto-cleanup on unmount
  }, [topic, handler]);
}

// Usage in any component:
usePubSub<{ title: string }>('ACTIVITY_DELETED', (_, data) => {
  console.log('Deleted:', data.title);
});
```

---

## 6. PubSub.js vs Your Existing MobX Approach

| Feature | MobX (current) | PubSub.js |
|---|---|---|
| Reactive state | ✅ Yes | ❌ No |
| Decoupled events | Partial | ✅ Yes |
| TypeScript support | ✅ First-class | ✅ Via `@types/pubsub-js` |
| Learning curve | Medium | Low |
| Bundle size | ~18 KB | ~1 KB |
| Best for | State management | Fire-and-forget events |

**Recommendation for Reactivities:** Use MobX for **state**, use PubSub for **ephemeral cross-component events** (notifications, analytics, logging).

---

## 7. Key Best Practices

1. **Always unsubscribe** in the `useEffect` cleanup function to prevent memory leaks and ghost handlers.
2. **Centralize topic names** in a `TOPICS` constant object to avoid typos.
3. **Type your payloads** with generics via the `usePubSub` hook.
4. **Don't use it for state** — it has no concept of current value; use MobX/Zustand/Redux for that.
5. **Async-safe** — PubSub.js delivers messages asynchronously by default (using `setTimeout`), protecting the call stack.

---

## 8. When to Use PubSub.js in Reactivities

| Use Case | Suitable? |
|---|---|
| Show a toast when an activity is deleted | ✅ Perfect |
| Trigger analytics/logging on user actions | ✅ Great fit |
| Cross-feature navigation events | ✅ Good fit |
| Managing activity list state | ❌ Use MobX instead |
| Authentication/user session | ❌ Use MobX instead |

---

## 9. Summary

> **PubSub.js** is a tiny, powerful event bus that enables **loose coupling** between React components and stores. In the **Reactivities** app, it's best used alongside MobX to broadcast side-effect events (notifications, logging) without tightly coupling publishers and subscribers.

**Three things to remember:**
1. `subscribe` → `publish` → `unsubscribe`
2. Always clean up in `useEffect` return
3. Use it for **events**, not **state**
