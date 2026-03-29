# react-pretext

React component for `@chenglou/pretext` - fast, accurate multiline text measurement without DOM reflow.

## Installation

```bash
npm install react-pretext @chenglou/pretext
```

Or using pnpm:

```bash
pnpm add react-pretext @chenglou/pretext
```

Or using yarn:

```bash
yarn add react-pretext @chenglou/pretext
```

## Usage

### Simple Mode (Auto Height)

```tsx
import { Pretext } from 'react-pretext';

function Card({ title, description }) {
  return (
    <div className={styles.card}>
      <h3>{title}</h3>
      <Pretext text={description} className={styles.description} />
    </div>
  );
}
```

### Render Prop Mode (Full Control)

```tsx
function Card({ title, description }) {
  return (
    <div className={styles.card}>
      <h3>{title}</h3>
      <Pretext text={description}>
        {({ ref, height }) => (
          <p ref={ref} className={styles.description} style={{ minHeight: height }}>
            {description}
          </p>
        )}
      </Pretext>
    </div>
  );
}
```

### Expandable Panel (Animation)

```tsx
import { motion } from 'framer-motion';
import { Pretext } from 'react-pretext';

function ExpandablePanel({ content, isOpen }) {
  return (
    <Pretext text={content}>
      {({ ref, height }) => (
        <motion.div
          ref={ref}
          animate={{ height: isOpen ? height : 0 }}
          style={{ overflow: 'hidden' }}
        >
          {content}
        </motion.div>
      )}
    </Pretext>
  );
}
```

## Props

| Prop         | Type                     | Default    | Description                      |
| ------------ | ------------------------ | ---------- | -------------------------------- |
| `text`       | `string`                 | required   | Text content to measure          |
| `font`       | `string`                 | inherited  | CSS font shorthand               |
| `lineHeight` | `number`                 | inherited  | Line height in pixels            |
| `whiteSpace` | `'normal' \| 'pre-wrap'` | `'normal'` | Whitespace handling              |
| `className`  | `string`                 | -          | CSS class (simple mode)          |
| `style`      | `CSSProperties`          | -          | Inline styles (simple mode)      |
| `children`   | `function`               | -          | Render prop for custom rendering |

## Render Prop API

```tsx
<Pretext text={content}>
  {({ ref, height, lineCount, width, isReady }) => (
    // Your custom rendering
  )}
</Pretext>
```

| Property    | Type                     | Description                  |
| ----------- | ------------------------ | ---------------------------- |
| `ref`       | `RefObject<HTMLElement>` | Attach to your container     |
| `height`    | `number`                 | Calculated height in pixels  |
| `lineCount` | `number`                 | Number of lines              |
| `width`     | `number`                 | Container width used         |
| `isReady`   | `boolean`                | True after first measurement |

## License

MIT
