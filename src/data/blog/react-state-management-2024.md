---
title: "React State Management in 2024: Context, Zustand, or TanStack Query?"
description: "A practical comparison of state management solutions in React and when to use each one based on real project experience."
pubDate: 2024-12-03
category: "frontend"
draft: false
---

# React State Management in 2024: Context, Zustand, or TanStack Query?

State management has always been a hot topic in React ecosystem. Having worked on projects ranging from small dashboards to complex admin panels, I've used various state management solutions. Here's my take on choosing the right tool for the job.

## The Built-in Option: React Context + useReducer

For simpler applications, React's built-in Context API combined with `useReducer` is often sufficient. I use this for:

- Theme switching (dark/light mode)
- User authentication state
- Simple global UI states (sidebar open/close)

```jsx
const ThemeContext = createContext();

function ThemeProvider({ children }) {
  const [theme, dispatch] = useReducer(themeReducer, 'light');
  
  return (
    <ThemeContext.Provider value={{ theme, dispatch }}>
      {children}
    </ThemeContext.Provider>
  );
}
```

**When to use:** Small to medium apps with minimal shared state.

## The Sweet Spot: Zustand

Zustand has become my go-to for most projects. It's minimal, has great TypeScript support, and doesn't require wrapping your app in providers.

```typescript
import { create } from 'zustand';

interface CartStore {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  total: () => number;
}

export const useCartStore = create<CartStore>((set, get) => ({
  items: [],
  addItem: (item) => set((state) => ({
    items: [...state.items, item]
  })),
  removeItem: (id) => set((state) => ({
    items: state.items.filter(i => i.id !== id)
  })),
  total: () => get().items.reduce((sum, item) => sum + item.price, 0)
}));
```

**When to use:** Medium to large apps, especially when you need derived state or actions that depend on other state.

## Server State Management: TanStack Query (React Query)

This is a game-changer for server state. Caching, background refetching, and optimistic updates out of the box.

```typescript
function useUsers() {
  return useQuery({
    queryKey: ['users'],
    queryFn: fetchUsers,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

function useUpdateUser() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: updateUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
    }
  });
}
```

**When to use:** Any app that talks to an API. Seriously, use this for server state.

## My Current Stack

On most projects, I now combine:
- **TanStack Query** for all server state
- **Zustand** for client-only global state
- **React Context** only for dependency injection (themes, etc.)

## Common Pitfalls

1. **Putting server state in global stores** - Let TanStack Query handle this
2. **Over-engineering** - Don't use Redux for a simple todo app
3. **Not normalizing state** - Flat data structures are easier to work with

## Conclusion

There's no one-size-fits-all solution. Start simple with what React provides, and reach for external libraries when you feel the pain. Trust me, you'll know when you need Zustand or TanStack Query.

What state management solution are you using in 2024?
