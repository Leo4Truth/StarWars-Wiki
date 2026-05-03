import { getFilmTimeline, getFilmDetail, getCharacterDetail } from "../lib/api";

global.fetch = jest.fn();

beforeEach(() => {
  jest.clearAllMocks();
});

describe("lib/api", () => {
  const mockFilmData = {
    locale: "zh-CN",
    items: [
      {
        canonical_id: "film_ep1",
        slug: "episode-i-the-phantom-menace",
        title_en: "Star Wars: Episode I The Phantom Menace",
        title_zh: "星球大战前传一：幽灵的威胁",
        era: "prequel",
        timeline_sort_key: "1.0",
      },
    ],
  };

  it("getFilmTimeline returns correctly shaped data", async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockFilmData),
    });

    const result = await getFilmTimeline("zh-CN");
    expect(result.locale).toBe("zh-CN");
    expect(result.items.length).toBeGreaterThan(0);
  });

  it("getFilmTimeline throws on bad response", async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
    });

    await expect(getFilmTimeline("zh-CN")).rejects.toThrow("failed to fetch");
  });

  it("getFilmDetail returns film data", async () => {
    const mockDetail = {
      locale: "zh-CN",
      film: mockFilmData.items[0],
      display_title: "星球大战前传一：幽灵的威胁",
    };
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockDetail),
    });

    const result = await getFilmDetail("episode-i-the-phantom-menace", "zh-CN");
    expect(result.film.slug).toBe("episode-i-the-phantom-menace");
  });

  it("getCharacterDetail returns character data", async () => {
    const mockChar = {
      locale: "zh-CN",
      character: {
        slug: "luke-skywalker",
        name_en: "Luke Skywalker",
        name_zh: "卢克·天行者",
      },
      display_name: "卢克·天行者",
    };
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockChar),
    });

    const result = await getCharacterDetail("luke-skywalker", "zh-CN");
    expect(result.character.slug).toBe("luke-skywalker");
  });
});
