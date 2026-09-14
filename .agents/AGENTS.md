### Pokemon GO Event Data Hierarchy
- **Source of Truth**: When updating event dates, times, and specific bonuses, ALWAYS prioritize user-provided infographics (e.g., G47IX infographics) as the ultimate source of truth.
- **Supplemental Data**: Use external links (like Leek Duck) ONLY to fill in missing gaps (like Pokemon weaknesses, top counters, or flavor text) that are not present on the infographics. If an external link conflicts with an infographic, the infographic wins.

### UI Layout & Alignment Rule
- **Prevent Duplicate Padding**: When building responsive layouts, apply horizontal boundary padding (e.g., "padding: 0 24px") **only** to the top-level page container. Do not apply additional horizontal padding to inner grid or flex containers (like ".bento-grid"), as this causes double-padding and breaks the vertical edge alignment of the page.
- **Consistent Vertical Gaps**: Use consistent vertical spacing (e.g., "gap: 24px") between major page sections unless explicitly requested otherwise. Avoid excessively large top margins/padding (e.g., >40px) below headers unless specifically designing a hero section.

### Pokémon GO Tool Event & UI Invariants

#### 1. Event Data & Scraper Guardrails
- **Clean Pokémon Names Only**: When scraping or listing Featured Pokémon, include ONLY the exact Pokémon name (e.g. `"Zacian (Hero of Many Battles)"`). Never include introductory sentences (e.g., *"Zacian will be in five-star raid battles."*).
- **Raid Boss Enriching**: Always ensure Raid events are enriched with `type`, `weaknesses`, and `counters`.
- **Exclude Deprecated Event Types**: Do not include GO Pass items in active event listings.

#### 2. Event Category Color Standards
Maintain the strict 9-category color palette across all badges, tags, and cards:
- `Daily Discoveries`: `#712957`
- `Event`: `#65b679`
- `Raid Battles`: `#b95749`
- `Season`: `#6cb5b3`
- `Pokemon Spotlight Hour`: `#dd9f53`
- `Max Battle`: `#843667`
- `Community Day`: `#4371ae`
- `Raid Day`: `#d96958`
- `Wild Area`: `#396e75`

#### 3. Modal Feature Artwork Display
- **Uncropped Banners**: Render feature artwork images using `width: '100%'` and `height: 'auto'` to preserve natural aspect ratios. Never apply restrictive `maxHeight` with `objectFit: 'cover'` to multi-element event graphics.
- **Lucide Icons Audit**: Always verify that any `lucide-react` icon used in component JSX is explicitly included in the top-level import statement.
