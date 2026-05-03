# 《星球大战》Wiki 技术实现方案（Python 3.13 + uv）

## 1. 总体架构

- **架构模式**：前后端分离 + API 驱动。
- **前端**：React + TypeScript + Next.js（App Router）
- **后端**：FastAPI（Python 3.13，uv 管理）
- **数据层**：PostgreSQL + Neo4j（知识图谱）+ Redis（缓存）
- **检索**：PostgreSQL 全文检索（首期）/ 可升级 Meilisearch 或 OpenSearch

```text
[Next.js Frontend]  <->  [FastAPI Gateway]
                           |-- PostgreSQL (结构化内容)
                           |-- Neo4j (图关系查询)
                           |-- Redis (缓存/会话/热点查询)
```

## 2. 技术选型说明

## 2.1 前端选型

- **Next.js + React**：
  - 详情页支持 SSR/SSG，有利 SEO。
  - 支持 Server Components 降低首屏负担。
- **状态管理**：Zustand（轻量）+ TanStack Query（服务端数据缓存）。
- **样式方案**：Tailwind CSS + CSS Variables（支持主题扩展）。
- **图谱可视化**：
  - 首选：`Cytoscape.js`（图谱交互强，生态成熟）。
  - 备选：`D3.js`（灵活但研发成本更高）。

## 2.2 后端选型

- **FastAPI**：异步性能好，OpenAPI 文档自动生成。
- **uv + Python 3.13**：
  - 快速依赖管理与锁定。
  - 统一开发/CI 环境。
- **ORM**：SQLAlchemy 2.x + Alembic。
- **图数据库驱动**：Neo4j Python Driver。

## 3. 项目结构建议

```text
starwars-wiki/
├─ backend/
│  ├─ pyproject.toml
│  ├─ uv.lock
│  ├─ app/
│  │  ├─ main.py
│  │  ├─ api/
│  │  │  ├─ v1/
│  │  │  │  ├─ characters.py
│  │  │  │  ├─ films.py
│  │  │  │  ├─ graph.py
│  │  │  │  └─ search.py
│  │  ├─ core/
│  │  ├─ models/
│  │  ├─ schemas/
│  │  ├─ services/
│  │  └─ repositories/
│  └─ migrations/
├─ frontend/
│  ├─ package.json
│  ├─ src/
│  │  ├─ app/
│  │  ├─ components/
│  │  ├─ features/
│  │  │  ├─ graph/
│  │  │  ├─ character/
│  │  │  └─ film/
│  │  └─ lib/
└─ docs/
```

## 4. 后端实现细节

## 4.1 uv 初始化与依赖管理

```bash
uv init backend --python 3.13
cd backend
uv add fastapi uvicorn[standard] sqlalchemy alembic pydantic-settings psycopg[binary] neo4j redis
uv add --dev ruff mypy pytest pytest-asyncio httpx
```

## 4.2 API 设计（V1）

- `GET /api/v1/characters`
- `GET /api/v1/characters/{id}`
- `GET /api/v1/characters/{id}/timeline`
- `GET /api/v1/films`
- `GET /api/v1/films/{id}`
- `GET /api/v1/graph/subgraph?entity_id=&depth=&filters=`
- `GET /api/v1/search?q=&type=`

### 图谱接口返回示例

```json
{
  "nodes": [{"id": "char_anakin", "type": "character", "label": "阿纳金"}],
  "edges": [{"source": "char_anakin", "target": "film_ep3", "type": "appears_in"}]
}
```

## 4.3 数据模型拆分

- PostgreSQL：存储正文、元数据、时间线描述文本。
- Neo4j：存储高频关系查询图（人物关系、事件链）。
- 同步策略：
  - 写入主库 PostgreSQL。
  - 通过异步任务（Celery/Arq）更新 Neo4j 投影视图。

## 5. 前端实现细节

## 5.1 页面路由

- `/` 首页
- `/characters` 人物列表
- `/characters/[slug]` 人物编年史页
- `/films` 电影列表
- `/films/[slug]` 电影详情
- `/graph` 知识图谱

## 5.2 图谱模块设计

- `GraphCanvas`：负责渲染与布局。
- `GraphToolbar`：筛选器与搜索联动。
- `GraphDetailsDrawer`：节点详情抽屉。
- `useGraphData`：调用后端子图接口并缓存。

## 5.3 时间线模块设计

- `TimelineRail`：纵向轴与节点。
- `TimelineEventCard`：事件展示与展开。
- `TimelineFilter`：正史/时代过滤。

## 6. 部署与运维

- **容器化**：Docker Compose（dev）/ Kubernetes（prod）。
- **CI/CD**：GitHub Actions。
  - Backend: lint + test + migration check
  - Frontend: lint + typecheck + build
- **可观测性**：
  - 日志：结构化 JSON
  - 指标：Prometheus + Grafana
  - 链路：OpenTelemetry

## 7. 安全与权限

- API 网关限流（按 IP / token）。
- 管理后台 JWT + RBAC。
- 输入验证与输出脱敏。
- 数据源标注（防止错误二创传播）。

## 8. 开发计划（建议）

1. 第 1 周：项目脚手架、CI、数据库 schema。
2. 第 2 周：人物/电影基础 API + 前端列表与详情页。
3. 第 3 周：时间线模块 + 图谱子图 API。
4. 第 4 周：图谱交互联调 + 性能优化。
5. 第 5 周：后台导入工具 + 文档完善 + 上线验收。

## 9. 风险与应对

- **风险 1**：图谱节点过多导致前端卡顿。
  - 应对：后端按 depth 分层加载 + 前端虚拟化渲染。
- **风险 2**：时间线时间标注体系混乱。
  - 应对：统一 BBY/ABY 标准字段 + 显示层转换。
- **风险 3**：数据一致性（SQL 与图数据库）。
  - 应对：事件驱动同步 + 定时校验任务。

## 10. 多语言技术方案（新增）

### 10.1 国际化架构

- 前端使用 `next-intl`（或 `i18next`）实现路由级 i18n。
- 路由前缀采用 locale segment：`/{locale}/...`。
- 文案资源拆分：
  - `messages/zh-CN/*.json`
  - `messages/en-US/*.json`
- 组件仅消费 key，不直接写死文案。

### 10.2 多语言内容数据模型

- 为实体增加翻译表（示例）：
  - `character_translations(character_id, locale, name, aliases, bio, source_ref)`
  - `film_translations(film_id, locale, title, synopsis, source_ref)`
- 图谱节点存 `canonical_id`，展示层按 locale 映射 label。
- 搜索索引维护“同义词词典 + 跨语 alias 映射”。

### 10.3 新作品持续扩展机制

- 引入 `work` 抽象实体：`type = film/series/novel/comic/game`。
- 引入 `canon_policy` 字段：`canon / legends / mixed`。
- 导入管线采用版本化 schema（JSON Schema + migration）。
- 新内容更新流程：采集 -> 清洗 -> 人工审核 -> 发布 -> 图谱增量构建。

## 11. 首页电影时间线与非电影人物入口技术设计（新增）

### 11.1 新增 API

- `GET /api/v1/home/film-timeline?locale=&era=`
  - 返回按时间线排序的电影节点（含 hover 预览字段）。
- `GET /api/v1/home/beyond-films?locale=&type=`
  - 返回电影外故事角色入口（novel/comic/animation/game）。

### 11.2 数据字段建议

- FilmTimelineNode:
  - `film_id`, `slug`, `title`, `era`, `timeline_order`, `bby_aby_label`, `hero_characters[]`, `hover_summary`
- BeyondFilmEntry:
  - `entity_id`, `name`, `origin_work_type`, `origin_work_title`, `timeline_anchor`, `movie_linkage`, `detail_url`

### 11.3 前端实现要点

- 首页新增 `FilmTimelineRail` 组件：
  - 支持 hover 展开预览卡
  - 支持点击路由跳转
- 首页新增 `BeyondFilmsCarousel` 组件：
  - 横向滚动 + 键盘可访问
- 预取策略：
  - 节点 hover 时触发 `prefetch` 电影详情，降低点击后延迟。
