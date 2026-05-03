# StarWars-Wiki

《星球大战》系列电影 Wiki 网站规划文档：

- [产品需求文档（PRD）](docs/PRD.md)
- [可视化页面 UI/UX 原型设计](docs/UIUX-Prototype.md)
- [技术实现方案（Python 3.13 + uv）](docs/Technical-Design.md)
- [多语种素材与背景知识采集方案](docs/Content-Knowledge-Collection-Plan.md)

高保真设计稿（电影风格）：

- [Home 高保真稿](docs/designs/home-hifi.svg)
- [Character Chronicle 高保真稿](docs/designs/character-hifi.svg)
- [Knowledge Graph 高保真稿](docs/designs/graph-hifi.svg)

MVP 开发冻结文档：

- [MVP 数据字典 v1（MySQL + Neo4j + Redis）](docs/mvp/MVP-Data-Dictionary-v1.md)
- [MVP OpenAPI 合同](docs/mvp/openapi-mvp.yaml)
- [设计稿到组件映射](docs/mvp/Design-to-Component-Mapping.md)
- [最小种子数据（films）](data/seeds/mvp_films.csv)
- [最小种子数据（characters）](data/seeds/mvp_characters.csv)

## 开发启动（MVP）

### Backend（FastAPI + uv）

```bash
cd backend
uv run uvicorn app.main:app --reload --port 8000
```

### Frontend（Next.js）

```bash
cd frontend
npm install
npm run dev
```
