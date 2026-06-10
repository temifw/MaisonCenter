import Layout from '../components/Layout';

const About = () => {
  return (
    <Layout>
      <div className="font-body-md text-on-surface">
      {/* Hero Section */}
      <header className="relative h-screen w-full flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img className="w-full h-full object-cover" data-alt="A grand, architectural facade of a contemporary limestone hotel building during the golden hour. The soft evening sunlight illuminates the clean vertical lines and expansive floor-to-ceiling glass windows. The building is surrounded by meticulously manicured gardens with tall cypress trees. The overall mood is quiet luxury, emphasizing stone textures and warm, directional natural lighting against a clear, deep blue sky." src="https://lh3.googleusercontent.com/aida-public/AB6AXuBOI2jYKYyOqHlNhMGPcJNaCNtApwQemUNdjEyAHLlkt0ykk0Y0NqDkP6jEMCXq0mMZHXLj_tKXRS4onwDZF-WMGklw9frdrLqJOFqWOQaa2szHnpImKtXk5jjgY-rRMA5gGa_1MGYezqC0zdMIric0Cq5bLz0o0EUvEV72qhWntFCFplcWAlugrqSCE0vsAs1UoPWgk-vC1zcgtf-tSZtVCW8FYndxz2FCeZDwLfTfov5YlEPuP6pj0Dktv7pFoLfitU-_cWY37g" />
          <div className="absolute inset-0 bg-stone-900/20"></div>
        </div>
        <div className="relative z-10 text-center text-white px-margin-mobile md:px-8 md:px-12">
          <span className="font-label-caps text-label-caps tracking-[0.4em] mb-6 block opacity-90 uppercase">Since 1924</span>
          <h1 className="font-display-lg text-6xl md:text-[100px] leading-tight mb-8">A Legacy of Excellence</h1>
          <div className="w-px h-24 bg-white/50 mx-auto"></div>
        </div>
      </header>
      <main className="w-full bg-surface">
        {/* Our Story Section */}
        <section className="py-16 md:py-section-gap px-6 md:px-12 grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-gutter items-center">
          <div className="md:col-span-5 space-y-8">
            <span className="font-label-caps text-label-caps text-primary uppercase tracking-widest">Our Story</span>
            <h2 className="font-headline-lg text-on-surface">The Foundation of Pure Intent</h2>
            <p className="font-body-lg text-on-surface-variant leading-relaxed">
              Founded on the belief that true luxury resides in the unseen details, The Maison Center began as a private sanctuary for thinkers, creators, and leaders. Our journey started over a century ago with a single architectural commission that sought to blend the rigors of classical proportion with the fluidity of modern living.
            </p>
            <p className="font-body-md text-on-surface-variant italic">
              "We do not merely host guests; we steward a philosophy of presence."
            </p>
          </div>
          <div className="md:col-start-7 md:col-span-6">
            <div className="aspect-[4/5] overflow-hidden">
              <img className="w-full h-full object-cover filter grayscale-[0.2] hover:scale-105 transition-transform duration-700" data-alt="A high-contrast, black and white editorial photograph showing the interior of a historic architectural office. Large drafting tables are covered with detailed blueprints and architectural sketches. Soft morning light streams through high industrial windows, creating sharp shadows and highlighting the dust motes in the air. The scene is timeless and sophisticated, evoking a sense of heritage and meticulous craftsmanship." src="https://lh3.googleusercontent.com/aida-public/AB6AXuDhTfK5DyzB8g2Rz0tY9vs4hJL-F0Z2QwZvLD8OMlXjHVbc7sNDEulhQ2KcL9CjAMtMx_ohJLk4s2BvutTZ-K6MAaAsvwX58C4RSunPSBmoeEhZ6pncSkL5Pou2aRpc9LJm8DEhE4ruGH8gIvLoHUWdtz6RrzvTYWCp2DtHxSC0918YwM2la3Y-3706cDs7fz9XeK-2OztsP_hSJO6DYDFdnfTjeYDq9GO7ZuhW2WECbNsHaIBH7C_PkwIxQ0HW0gunxf4SdSOwhw" />
            </div>
          </div>
        </section>
        {/* Architectural Vision (Bento-inspired Grid) */}
        <section className="py-16 md:py-section-gap px-6 md:px-12 bg-surface-container-low">
          <div className="max-w-4xl mx-auto text-center mb-20">
            <span className="font-label-caps text-label-caps text-primary uppercase tracking-widest mb-6 block">Architectural Vision</span>
            <h2 className="font-headline-lg mb-8">Harmonizing Structure &amp; Soul</h2>
            <div className="w-20 h-px bg-primary mx-auto mb-8"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 h-[700px]">
            <div className="md:col-span-8 relative overflow-hidden group">
              <img className="w-full h-full object-cover grayscale transition duration-700 group-hover:grayscale-0" data-alt="A minimalist architectural shot focusing on a dramatic concrete spiral staircase within a light-filled atrium. The interplay of light and shadow creates soft gradients across the smooth stone surfaces. The composition is geometric and clean, reflecting a modern minimalist aesthetic. Sunlight filters down from a skylight above, casting a warm, ethereal glow on the neutral-toned interior." src="https://lh3.googleusercontent.com/aida-public/AB6AXuBL-8kPavrHZR6gqt5YtqPTIKwn-fi-Onhs7_f4sMlyxmIt44hfU5Goq0BB7RN2SoB6VyHfemRLXeaEpkEjxsUjdPsui1W2T2Fz2O3LeWZ4EnLnL4SJ8pi22yhkFqm4ux_4ikVuaT16ZiR1ITGP9BQ-1ZUuYZTKMPFuF4lRms79fRArpkYuyOt3sQ990eAfflGY1t0wwqJU2dW5q-MlGm5mBz5VTqLe8WRC5NA6R--gevUULNJ1V3uHUdQlbZ7OQ8AbuFStN1JG-Q" />
              <div className="absolute bottom-10 left-10 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <p className="font-label-caps text-xs tracking-widest">THE ATRIUM</p>
              </div>
            </div>
            <div className="md:col-span-4 flex flex-col gap-8">
              <div className="flex-1 bg-white p-12 border border-outline-variant flex flex-col justify-center">
                <h3 className="font-headline-md mb-4 text-primary">The Geometry of Calm</h3>
                <p className="font-body-md text-on-surface-variant">Our spaces are designed with mathematical precision to evoke a sense of inherent order and serenity from the moment of entry.</p>
              </div>
              <div className="flex-1 overflow-hidden">
                <img className="w-full h-full object-cover" data-alt="A close-up detail shot of high-quality interior materials including raw silk curtains, polished travertine stone, and dark walnut wood. The lighting is soft and atmospheric, emphasizing the rich textures and premium finishes. The color palette is a sophisticated mix of warm beiges, deep browns, and subtle ochre accents, communicating a sense of curated, tactile luxury." src="https://lh3.googleusercontent.com/aida-public/AB6AXuDAdowkOP-QNnxDwriPIODFymbX1xH-tKxDbxUBnJbDdMPMWtI4kVlt7r9nxvBViK-C-zGbjpc_Myca7GDptBJonHVsx8J84dB5pdPhlVUr2PI_RYGDzg2b70QpAIliqmDRR334DXkjWE4pGr9-4m3ObROf7_sY7KcPO1G_g2Br-6FvrLYv63dfjTWIoVWmwc1XRvYZunqSexvvKi8kH90u3NCrRPeZIwIxw88QGCE1frI4H9fEjc88ktl6iJnWlhMZ9q3PSm2t0w" />
              </div>
            </div>
          </div>
        </section>
        {/* Our Commitment Section */}
        <section className="py-16 md:py-section-gap px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 items-center">
          <div className="order-2 md:order-1">
            <img className="w-full aspect-[4/5] object-cover" data-alt="A wide-angle interior shot of a serene, high-end hotel lobby at dusk. The lighting is low and warm, with soft pools of light from sculptural floor lamps. Elegant, modern furniture is arranged in small conversation clusters over a large, plush neutral rug. The space is vast and uncluttered, with a massive stone fireplace as the focal point. The atmosphere is one of absolute exclusivity and quiet hospitality." src="https://lh3.googleusercontent.com/aida-public/AB6AXuCdgYUsSQyRxq94UoyLziBAcjHcf62QttOlwf1afhocp_AqyLZhr-eHPgCjTBChh_zxRf5Gi2TWEtNqQM4d5wwJZ6Xe9ofJygdiUlvt2gIehoxAC6aEqp-6DxJvfhztJeepyjS8d4MPQTY53wy9M5oRg8oJbrJIYhhS7CGD6pgwGWQKebZfKH88wMeJBsHnpZJ-ciPveTnCit4GKoqvZfwefwYB3fpokJmdHRfj3ajzyWUCQvUjDxtuZQAdqB-toNkIwEzPGkzmww" />
          </div>
          <div className="order-1 md:order-2 space-y-12">
            <div className="space-y-4">
              <span className="font-label-caps text-label-caps text-primary uppercase tracking-widest">Our Commitment</span>
              <h2 className="font-headline-lg">Anticipatory Service</h2>
            </div>
            <div className="space-y-10">
              <div className="flex gap-8 group">
                <span className="material-symbols-outlined text-4xl text-primary transition-transform group-hover:-translate-y-1" data-icon="concierge">concierge</span>
                <div>
                  <h4 className="font-label-caps text-label-caps mb-2 tracking-[0.2em] uppercase">Discreet Stewardship</h4>
                  <p className="font-body-md text-on-surface-variant">We believe the best service is felt, not seen—a silent choreography that ensures your needs are met before they are voiced.</p>
                </div>
              </div>
              <div className="flex gap-8 group">
                <span className="material-symbols-outlined text-4xl text-primary transition-transform group-hover:-translate-y-1" data-icon="eco">eco</span>
                <div>
                  <h4 className="font-label-caps text-label-caps mb-2 tracking-[0.2em] uppercase">Sustainable Heritage</h4>
                  <p className="font-body-md text-on-surface-variant">Preserving the future is as vital as honoring the past. Our operations prioritize architectural longevity and ecological balance.</p>
                </div>
              </div>
              <div className="flex gap-8 group">
                <span className="material-symbols-outlined text-4xl text-primary transition-transform group-hover:-translate-y-1" data-icon="auto_awesome">auto_awesome</span>
                <div>
                  <h4 className="font-label-caps text-label-caps mb-2 tracking-[0.2em] uppercase">Curated Excellence</h4>
                  <p className="font-body-md text-on-surface-variant">Every element, from the thread count of our linens to the provenance of our art, is selected with uncompromising intent.</p>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* The Curators */}
        <section className="py-16 md:py-section-gap px-6 md:px-12 bg-white border-y border-stone-100">
          <div className="max-w-[1000px] mx-auto text-center mb-16">
            <span className="font-label-caps text-label-caps text-primary uppercase tracking-widest mb-4 block">Leadership</span>
            <h2 className="font-headline-lg">The Curators</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            <div className="text-center space-y-6">
              <div className="aspect-square grayscale hover:grayscale-0 transition-all duration-500 overflow-hidden mb-6">
                <img className="w-full h-full object-cover" data-alt="A professional headshot of a mature man with a refined, intellectual appearance. He is wearing a high-quality dark turtleneck and charcoal blazer. The background is a soft, out-of-focus architectural interior in neutral tones. The lighting is directional and sophisticated, highlighting his features. The portrait is high-contrast and follows a modern editorial aesthetic, conveying expertise and calm leadership." src="https://lh3.googleusercontent.com/aida-public/AB6AXuBVwI91sLh3WI5XpFFuvq8qB_l8gqc4ix-wp2_EC5yjBNrfpFW7FtcFVDhhbXoo2iAEN-7qzkT-q646U4zlpmAuzvZx9ljQhQb57PZ_o2_ZFiNGBvZTAv2NcQoBzcAqG9jGyj_x8eUE1wbwW5ZsYl8ASTMQqAbVenq21bSH8WxMaI-omWcNdjDDrerJ7YBqukw4vkTmGrncFuAA6TFujPlIL7Ye5GOPcusjgHRgQRFyjnCfipCu6HuP1cqS2ZStzp6KaMtpP3Xgzw" />
              </div>
              <h5 className="font-headline-md text-xl">Julian Vane</h5>
              <p className="font-label-caps text-[10px] tracking-widest uppercase text-primary">Principal Architect</p>
            </div>
            <div className="text-center space-y-6">
              <div className="aspect-square grayscale hover:grayscale-0 transition-all duration-500 overflow-hidden mb-6">
                <img className="w-full h-full object-cover" data-alt="A sophisticated portrait of a professional woman with an air of poised authority. She is dressed in a tailored cream-colored silk blouse with minimal jewelry. The setting is a bright, minimalist office space with large windows in the background. The lighting is high-key and flattering, creating a clean and modern look. Her expression is welcoming yet confident, embodying the spirit of premium hospitality leadership." src="https://lh3.googleusercontent.com/aida-public/AB6AXuDELJPbpLhHw0syiImz30D7J43mmUn7TItVZEINWar4w3-0vip63ACk-CfhS0enxutLyLPtY7oiU9bD5zfn9fdN7vzzLRRAKqLGtHKCTkN2cYUZnAPdOcIEnBn2l64ZApD_ztRp2X03192p0LVe37MhebsKxTt8F1eVmcWJCO5inqWxeWUzQCJbtvf1SglDJTvz35I154BeEUzZ_6eFsW-USgAxLPP13kINdRxJzdZnytfw-habVeNy3JZkLvywrlXbwqeu70pH_A" />
              </div>
              <h5 className="font-headline-md text-xl">Elena Rossi</h5>
              <p className="font-label-caps text-[10px] tracking-widest uppercase text-primary">Director of Experience</p>
            </div>
            <div className="text-center space-y-6">
              <div className="aspect-square grayscale hover:grayscale-0 transition-all duration-500 overflow-hidden mb-6">
                <img className="w-full h-full object-cover" data-alt="A portrait of a creative professional in his late 40s with a discerning gaze. He wears a dark, well-fitted suit jacket over a simple white t-shirt, blending formal and contemporary styles. He is positioned against a background of abstract art and clean lines. The lighting is dramatic, using shadows to create depth. The overall visual style is sharp, clean, and representative of high-end design curation." src="https://lh3.googleusercontent.com/aida-public/AB6AXuC2fAJgNEUrmpor9ifJlZgr7PgEny2v5WzhFtjjqSPQ3YJ80R69sU79KtnseoJkESmO8mcNJXZhMfZXXSXObS9olWPBBFaGOfXuw1dBNCWNN1l8TEHyN774eoye7nEGgdAIaeZmyJfy55ifgWe-3EqE-WgVjKEnYWgJ-JtOdkU_vGKq3qeUQKhk-NA19ufXa1Wdb1h0sixCKS6oHW1Rq5aXkx3e2aNT5TiSnfh6svQOake4cq0NDWqK4jSQwn2ADot9iGrimGy4rA" />
              </div>
              <h5 className="font-headline-md text-xl">Marcus Thorne</h5>
              <p className="font-label-caps text-[10px] tracking-widest uppercase text-primary">Chief Curator</p>
            </div>
          </div>
        </section>
        {/* CTA Section */}
        <section className="py-24 md:py-[160px] px-6 md:px-12 text-center bg-[#776E20]">
          <h2 className="font-display-lg text-white mb-12 max-w-3xl mx-auto">Experience it for yourself</h2>
          <button className="bg-white text-[#776E20] font-label-caps text-label-caps px-16 py-6 tracking-[0.3em] hover:bg-stone-100 transition-colors">START YOUR JOURNEY</button>
        </section>
      </main>
    </div>
    </Layout>
  );
};

export default About;
