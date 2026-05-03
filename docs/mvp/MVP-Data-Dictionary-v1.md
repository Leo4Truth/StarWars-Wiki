# MVP 数据字典 v1（冻结版）

> 数据库：MySQL + Neo4j + Redis
> 冻结日期：2026-05-03

## 1. 单一真源（SSOT）规则：时间线排序

- `timeline_sort_key` 为全站唯一排序真源。
- 计算规则：
  - 若有 in-universe 时间：使用 `bby_aby_numeric`（BBY 为负数，ABY 为正数，0 为雅汶战役年）。
  - 若同一 `bby_aby_numeric` 冲突：以 `release_date` 升序。
  - 若 `release_date` 冲突：以 `canonical_id` 字典序。
- 展示层可切换“按上映时间看”，但不改变 `timeline_sort_key`。

## 2. MySQL 表结构（MVP）

## 2.1 works（作品主表）

- `id` BIGINT PK
- `canonical_id` VARCHAR(64) UNIQUE NOT NULL
- `work_type` ENUM('film','series','novel','comic','game') NOT NULL
- `canon_policy` ENUM('canon','legends','mixed') NOT NULL DEFAULT 'canon'
- `release_date` DATE NULL
- `bby_aby_numeric` DECIMAL(8,2) NULL
- `timeline_sort_key` DECIMAL(12,4) NOT NULL
- `status` ENUM('draft','published') NOT NULL DEFAULT 'published'
- `created_at` DATETIME NOT NULL
- `updated_at` DATETIME NOT NULL

## 2.2 work_translations（作品多语言）

- `id` BIGINT PK
- `work_id` BIGINT FK works.id
- `locale` VARCHAR(10) NOT NULL (`zh-CN`,`en-US`)
- `title` VARCHAR(255) NOT NULL
- `subtitle` VARCHAR(255) NULL
- `summary_short` TEXT NULL
- `source_url` VARCHAR(1024) NULL
- UNIQUE(`work_id`,`locale`)

## 2.3 characters（人物主表）

- `id` BIGINT PK
- `canonical_id` VARCHAR(64) UNIQUE NOT NULL
- `species` VARCHAR(64) NULL
- `origin_work_id` BIGINT NULL
- `first_appearance_work_id` BIGINT NULL
- `bby_aby_birth` DECIMAL(8,2) NULL
- `timeline_sort_key` DECIMAL(12,4) NOT NULL
- `is_beyond_films_entry` TINYINT(1) NOT NULL DEFAULT 0
- `status` ENUM('draft','published') NOT NULL DEFAULT 'published'

## 2.4 character_translations（人物多语言）

- `id` BIGINT PK
- `character_id` BIGINT FK characters.id
- `locale` VARCHAR(10) NOT NULL
- `name` VARCHAR(255) NOT NULL
- `aliases_json` JSON NULL
- `bio` TEXT NULL
- `source_url` VARCHAR(1024) NULL
- UNIQUE(`character_id`,`locale`)

## 2.5 timeline_events（时间线事件）

- `id` BIGINT PK
- `canonical_id` VARCHAR(64) UNIQUE NOT NULL
- `work_id` BIGINT NULL
- `event_type` ENUM('birth','battle','turning_point','death','other') NOT NULL
- `bby_aby_numeric` DECIMAL(8,2) NULL
- `timeline_sort_key` DECIMAL(12,4) NOT NULL
- `location` VARCHAR(128) NULL

## 2.6 home_sections（首页配置）

- `id` BIGINT PK
- `section_type` ENUM('film_timeline','beyond_films') NOT NULL
- `locale` VARCHAR(10) NOT NULL
- `payload_json` JSON NOT NULL
- `published_at` DATETIME NOT NULL

## 3. Neo4j 标签与关系（MVP）

- Labels: `Character`, `Work`, `Event`, `Faction`, `Location`
- Relationships:
  - `(:Character)-[:APPEARS_IN]->(:Work)`
  - `(:Character)-[:RELATED_TO]->(:Character)`
  - `(:Event)-[:IN_WORK]->(:Work)`
  - `(:Event)-[:INVOLVES]->(:Character)`

## 4. Redis Key 规范（MVP）

- `home:film_timeline:{locale}:{era}`
- `home:beyond_films:{locale}:{type}`
- `work:detail:{locale}:{slug}`
- `graph:subgraph:{entity_id}:{depth}:{filters_hash}`

## 5. 冻结范围

- 冻结字段：以上所有字段名称与语义。
- 非冻结：索引优化、缓存 TTL、非关键扩展字段。
