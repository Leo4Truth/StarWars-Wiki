interface AboutPageProps {
  params: Promise<{ locale: string }>;
}

export default async function AboutPage({ params }: AboutPageProps) {
  const { locale } = await params;
  const isZhCN = locale === 'zh-CN';

  return (
    <div className="min-h-screen bg-starwars-black relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-starwars-blue/30 via-starwars-black to-starwars-black pointer-events-none" />

      {/* Content container */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-starwars-gold mb-4 tracking-wider drop-shadow-lg"
              style={{ textShadow: '0 0 30px rgba(255, 215, 0, 0.5)' }}>
            {isZhCN ? '关于' : 'About'}
          </h1>
          <p className="text-xl text-starwars-white/70 max-w-2xl mx-auto">
            {isZhCN
              ? '探索星球大战宇宙的双语百科全书'
              : 'A bilingual encyclopedia for the Star Wars universe'}
          </p>
        </div>

        {/* Project Description */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-starwars-gold mb-4 flex items-center gap-3">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {isZhCN ? '项目简介' : 'Project Overview'}
          </h2>
          <div className="bg-starwars-blue/40 rounded-lg p-6 border border-starwars-gold/20">
            <p className="text-starwars-white/90 leading-relaxed mb-4">
              {isZhCN
                ? '星战百科是一个致力于为星战迷提供全面、准确信息的双语百科网站。我们涵盖电影、角色、种族、地点等丰富内容，帮助您深入了解这个史诗般的宇宙。'
                : 'Star Wars Wiki is a bilingual encyclopedia dedicated to providing comprehensive and accurate information for Star Wars fans. We cover films, characters, species, locations, and more, helping you dive deep into this epic universe.'}
            </p>
            <p className="text-starwars-white/70 text-sm">
              {isZhCN
                ? '无论是新入门的新手还是资深的老粉，这里都是您探索银河系历史的理想起点。'
                : 'Whether you are a newcomer or a seasoned fan, this is your ideal starting point for exploring the galaxy\'s history.'}
            </p>
          </div>
        </section>

        {/* Tech Stack */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-starwars-gold mb-4 flex items-center gap-3">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
            </svg>
            {isZhCN ? '技术栈' : 'Tech Stack'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-starwars-blue/40 rounded-lg p-5 border border-starwars-gold/20">
              <h3 className="text-lg font-semibold text-starwars-white mb-3">{isZhCN ? '前端' : 'Frontend'}</h3>
              <ul className="space-y-2 text-starwars-white/80 text-sm">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-starwars-gold rounded-full" />
                  Next.js 16 (App Router)
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-starwars-gold rounded-full" />
                  TypeScript
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-starwars-gold rounded-full" />
                  Tailwind CSS v4
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-starwars-gold rounded-full" />
                  React
                </li>
              </ul>
            </div>
            <div className="bg-starwars-blue/40 rounded-lg p-5 border border-starwars-gold/20">
              <h3 className="text-lg font-semibold text-starwars-white mb-3">{isZhCN ? '后端' : 'Backend'}</h3>
              <ul className="space-y-2 text-starwars-white/80 text-sm">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-starwars-gold rounded-full" />
                  FastAPI
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-starwars-gold rounded-full" />
                  Python 3.13+
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-starwars-gold rounded-full" />
                  UV (package manager)
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-starwars-gold rounded-full" />
                  {isZhCN ? '未来：PostgreSQL + Neo4j + Redis' : 'Future: PostgreSQL + Neo4j + Redis'}
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Data Sources */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-starwars-gold mb-4 flex items-center gap-3">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4" />
            </svg>
            {isZhCN ? '数据来源' : 'Data Sources'}
          </h2>
          <div className="bg-starwars-blue/40 rounded-lg p-6 border border-starwars-gold/20">
            <ul className="space-y-3 text-starwars-white/80">
              <li className="flex items-start gap-3">
                <span className="w-2 h-2 bg-starwars-gold rounded-full mt-2 flex-shrink-0" />
                <div>
                  <span className="text-starwars-white font-medium">Wookieepedia</span>
                  <span className="text-starwars-white/60 text-sm">
                    {isZhCN ? ' - 最大的星球大战维基百科' : ' - The largest Star Wars encyclopedia'}
                  </span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-2 h-2 bg-starwars-gold rounded-full mt-2 flex-shrink-0" />
                <div>
                  <span className="text-starwars-white font-medium">{isZhCN ? '官方星球大战资料' : 'Official Star Wars Resources'}</span>
                  <span className="text-starwars-white/60 text-sm">
                    {isZhCN ? ' - 卢卡斯影业官方授权内容' : ' - Lucasfilm authorized content'}
                  </span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-2 h-2 bg-starwars-gold rounded-full mt-2 flex-shrink-0" />
                <div>
                  <span className="text-starwars-white font-medium">{isZhCN ? '社区贡献' : 'Community Contributions'}</span>
                  <span className="text-starwars-white/60 text-sm">
                    {isZhCN ? ' - 由星战迷社区维护和更新' : ' - Maintained and updated by the Star Wars fan community'}
                  </span>
                </div>
              </li>
            </ul>
          </div>
        </section>

        {/* Links */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-starwars-gold mb-4 flex items-center gap-3">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
            </svg>
            {isZhCN ? '相关链接' : 'Links'}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <a
              href="https://github.com/Leo4Truth/StarWars-Wiki"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 p-4 bg-starwars-blue/40 rounded-lg border border-starwars-gold/20 hover:border-starwars-gold/50 transition-all duration-200 group"
            >
              <svg className="w-8 h-8 text-starwars-white/80 group-hover:text-starwars-gold transition-colors" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              <div>
                <div className="text-starwars-white font-medium group-hover:text-starwars-gold transition-colors">GitHub Repository</div>
                <div className="text-starwars-white/60 text-sm">{isZhCN ? '查看源代码' : 'View source code'}</div>
              </div>
            </a>
            <a
              href="https://starwars.fandom.com/wiki/Main_Page"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 p-4 bg-starwars-blue/40 rounded-lg border border-starwars-gold/20 hover:border-starwars-gold/50 transition-all duration-200 group"
            >
              <svg className="w-8 h-8 text-starwars-white/80 group-hover:text-starwars-gold transition-colors" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
              <div>
                <div className="text-starwars-white font-medium group-hover:text-starwars-gold transition-colors">Wookieepedia</div>
                <div className="text-starwars-white/60 text-sm">{isZhCN ? '星战维基百科' : 'Star Wars wiki'}</div>
              </div>
            </a>
          </div>
        </section>

        {/* Credits */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-starwars-gold mb-4 flex items-center gap-3">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {isZhCN ? '致谢' : 'Credits'}
          </h2>
          <div className="bg-starwars-blue/40 rounded-lg p-6 border border-starwars-gold/20">
            <p className="text-starwars-white/90 leading-relaxed mb-4">
              {isZhCN
                ? '星战百科感谢所有为项目做出贡献的开发者、翻译者和社区成员。您的热情和支持让这个项目得以实现。'
                : 'Star Wars Wiki thanks all developers, translators, and community members who have contributed to this project. Your passion and support made this possible.'}
            </p>
            <div className="text-starwars-white/60 text-sm border-t border-starwars-gold/10 pt-4 mt-4">
              <p>{isZhCN ? 'Star Wars © Lucasfilm Ltd. 保留所有权利。' : 'Star Wars © Lucasfilm Ltd. All rights reserved.'}</p>
              <p className="mt-1">
                {isZhCN
                  ? '本项目仅供个人和教育目的，不与迪士尼或卢卡斯影业关联。'
                  : 'This project is for personal and educational purposes only and is not affiliated with Disney or Lucasfilm.'}
              </p>
            </div>
          </div>
        </section>

        {/* Version info */}
        <div className="text-center text-starwars-white/40 text-sm">
          <p>v1.0.0 MVP</p>
        </div>
      </div>
    </div>
  );
}