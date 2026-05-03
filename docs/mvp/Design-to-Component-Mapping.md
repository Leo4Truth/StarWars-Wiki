# 设计稿到组件映射（MVP）

## 1. Home（docs/designs/home-hifi.svg）

- Header -> `AppHeader`
- Hero -> `HomeHero`
- 电影时间线 -> `FilmTimelineRail`
  - Node -> `FilmTimelineNode`
  - Hover 卡 -> `FilmHoverCard`
- 电影之外故事 -> `BeyondFilmsCarousel`
  - Card -> `BeyondStoryCard`

## 2. Character（docs/designs/character-hifi.svg）

- 左栏档案 -> `CharacterProfilePanel`
- 中栏编年史 -> `TimelineRail` + `TimelineEventCard`
- 右栏关系 -> `MiniRelationGraph`

## 3. Graph（docs/designs/graph-hifi.svg）

- 工具条 -> `GraphToolbar`
- 画布 -> `GraphCanvas`
- 右侧抽屉 -> `GraphDetailsDrawer`

## 4. 状态定义（关键）

- FilmTimelineNode: `default | hover | active | keyboard_focus`
- BeyondStoryCard: `default | hover | loading | disabled`
- GraphCanvas: `idle | loading | error | interactive`
