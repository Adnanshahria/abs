# File: src/components/YouTubeEmbed.tsx

## Analysis
- **Type**: UI Component
- **Purpose**: Performance-optimized YouTube video player.
- **Key Logic**:
    - **Facade Pattern**: Initially renders a thumbnail image with a fake play button.
    - **Interaction**: Replaces thumbnail with actual `iframe` only on click. This saves huge bandwidth/load time.
- **Dependencies**: `lucide-react`.

## Identified Bugs / Issues
- No bugs found. Good implementation of lazy loading.
