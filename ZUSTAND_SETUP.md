# Zustand Store Setup with Custom Wrapper ✅

## What's Implemented

Your app now uses a custom Zustand store pattern with enhanced functionality!

### 📦 Files Created

1. **`src/store/createStore.ts`** - Custom Zustand wrapper
   - Adds `reset()` method
   - Adds `getInitialState()` method
   - Full TypeScript support

2. **`src/store/appStore.ts`** - App state store (TypeScript)
   - State: `isTracking` (boolean)
   - Actions: `startTracking()`, `stopTracking()`, `toggleTracking()`
   - MMKV persistence enabled
   - Type-safe with `TAppState`

3. **`src/store/STORE_PATTERN.md`** - Complete documentation

## 🎯 Usage

### Import the Store

```typescript
import { useAppStore } from '../../store/appStore';
```

### Use in Component

```typescript
function MyComponent() {
  const { isTracking, toggleTracking } = useAppStore();
  
  return (
    <Button 
      onPress={toggleTracking}
      title={isTracking ? 'Stop' : 'Start'}
    />
  );
}
```

### Reset Store

```typescript
// Reset to initial state
useAppStore.reset();
```

### Get Initial State

```typescript
const initialState = useAppStore.getInitialState();
console.log(initialState.isTracking); // false
```

## 🔥 Key Features

### 1. TypeScript Support

```typescript
export type TAppState = {
  isTracking: boolean;
  startTracking: () => void;
  stopTracking: () => void;
  toggleTracking: () => void;
};
```

### 2. Reset Functionality

```typescript
// Automatically added to every store
useAppStore.reset(); // Resets to initial state
```

### 3. MMKV Persistence

```typescript
// Data persists across app restarts
persist(
  (set, get) => ({ /* store */ }),
  {
    name: 'app-store',
    storage: createJSONStorage(() => mmkvStorage),
  }
)
```

### 4. Get Initial State

```typescript
// Access initial values anytime
const initial = useAppStore.getInitialState();
```

## 📝 Creating New Stores

### Step 1: Define Type

```typescript
export type TMyState = {
  count: number;
  increment: () => void;
  decrement: () => void;
};
```

### Step 2: Create Store

```typescript
import { create } from './createStore';

export const useMyStore = create<TMyState>((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
  decrement: () => set((state) => ({ count: state.count - 1 })),
}));
```

### Step 3: Use in Component

```typescript
import { useMyStore } from '../../store/myStore';

function Counter() {
  const { count, increment, decrement } = useMyStore();
  
  return (
    <View>
      <Text>{count}</Text>
      <Button onPress={increment} title="+" />
      <Button onPress={decrement} title="-" />
    </View>
  );
}
```

## 🎨 Pattern Comparison

### Before (Standard Zustand)

```typescript
const useStore = create<State>()((set) => ({
  isTracking: false,
  toggleTracking: () => set((state) => ({ 
    isTracking: !state.isTracking 
  })),
}));
```

### After (Custom Wrapper)

```typescript
export const useStore = create<State>((set) => ({
  isTracking: false,
  toggleTracking: () => set((state) => ({ 
    isTracking: !state.isTracking 
  })),
}));

// Plus these bonus features:
useStore.reset();
useStore.getInitialState();
```

## 🔧 Advanced Features

### Selectors

```typescript
// Only re-render when isTracking changes
const isTracking = useAppStore((state) => state.isTracking);
```

### Access Outside Components

```typescript
// Get state
const state = useAppStore.getState();

// Set state
useAppStore.setState({ isTracking: true });

// Subscribe
const unsub = useAppStore.subscribe((state) => {
  console.log('Changed:', state);
});
```

### Reset on Logout

```typescript
function logout() {
  useAppStore.reset();
  // Navigate to login...
}
```

## 📊 Store Structure

```
src/store/
├── createStore.ts          # Custom Zustand wrapper
├── appStore.ts            # App state (isTracking, etc.)
├── mmkv.js                # MMKV storage config
├── README.md              # Store usage guide
└── STORE_PATTERN.md       # Pattern documentation
```

## ✨ Benefits

1. ✅ **Type-Safe**: Full TypeScript support
2. ✅ **Persistent**: Data saved with MMKV
3. ✅ **Resettable**: Built-in reset functionality
4. ✅ **Fast**: Lightning-fast MMKV storage
5. ✅ **Simple**: Clean, intuitive API
6. ✅ **Flexible**: Works with all Zustand features

## 🚀 Example: Home Screen

The Home screen uses the store like this:

```typescript
import { useAppStore } from '../../store/appStore';

function Home() {
  const { isTracking, toggleTracking } = useAppStore();
  
  return (
    <TouchableOpacity onPress={toggleTracking}>
      <Text>
        {isTracking ? 'Stop Tracking' : 'Start Tracking'}
      </Text>
    </TouchableOpacity>
  );
}
```

## 📚 Documentation

- **Pattern Guide**: `src/store/STORE_PATTERN.md`
- **Usage Guide**: `src/store/README.md`
- **Quick Start**: `QUICK_START_STORE.md`

---

Your Zustand store is now set up with TypeScript, custom reset functionality, and MMKV persistence! 🎉

