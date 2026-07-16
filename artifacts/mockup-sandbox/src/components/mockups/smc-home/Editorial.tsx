import React from "react";

export default function Editorial() {
  return (
    <div className="min-h-screen bg-[#F9F8F6] text-[#0A1628] font-sans selection:bg-[#C8102E] selection:text-white">
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500&family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400&display=swap');
        .font-serif { font-family: 'Playfair Display', serif; }
        .font-sans { font-family: 'DM Sans', sans-serif; }
      `}} />

      {/* Navigation */}
      <header className="fixed w-full top-0 z-50 bg-[#F9F8F6]/90 backdrop-blur-md border-b border-[#0A1628]/10 transition-all">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <a href="#" className="flex-shrink-0">
            <img 
              src="/__mockup/images/summerset-marine-construction-logo.png" 
              alt="Summerset Marine Construction" 
              className="h-10 w-auto"
            />
          </a>
          <nav className="hidden md:flex gap-8 text-sm tracking-wide uppercase">
            {["Products", "Services", "Markets", "Resources", "About", "Contact"].map((item) => (
              <a key={item} href="#" className="hover:text-[#C8102E] transition-colors pb-1 border-b border-transparent hover:border-[#C8102E]">
                {item}
              </a>
            ))}
          </nav>
          <div className="hidden md:block">
            <a href="#" className="px-6 py-2.5 bg-[#0A1628] text-white text-sm uppercase tracking-wider hover:bg-[#C8102E] transition-colors">
              Consultation
            </a>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-12 gap-8 items-end mb-12">
          <div className="md:col-span-8">
            <p className="text-[#C8102E] text-sm uppercase tracking-[0.2em] mb-4">Just Add Water</p>
            <h1 className="font-serif text-5xl md:text-7xl leading-tight">
              Crafting legacies <br className="hidden md:block"/>on the water.
            </h1>
          </div>
          <div className="md:col-span-4 pb-3">
            <p className="text-lg text-[#0A1628]/70 leading-relaxed font-light">
              Wisconsin’s premier builder of luxury permanent piers, boat lifts, and marine architecture since 1990.
            </p>
          </div>
        </div>
        
        <div className="relative aspect-[21/9] w-full overflow-hidden">
          <img 
            src="/__mockup/images/lake-geneva-permanent-pier-sunrise-001.jpg" 
            alt="Lake Geneva Permanent Pier" 
            className="w-full h-full object-cover"
          />
        </div>
      </section>

      {/* Products Highlights */}
      <section className="py-24 border-t border-[#0A1628]/10 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16">
            <h2 className="font-serif text-4xl md:text-5xl">Masterworks</h2>
            <a href="#" className="text-sm uppercase tracking-widest border-b border-[#0A1628] pb-1 mt-6 md:mt-0 hover:text-[#C8102E] hover:border-[#C8102E] transition-all">
              Explore Portfolio
            </a>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            {[
              {
                title: "Permanent Piers",
                img: "/__mockup/images/oconomowoc-okauchee-lake-permanent-pier-hero-001.jpg",
                desc: "Engineered to withstand the elements, designed to elevate your shoreline. A true extension of your estate."
              },
              {
                title: "Boat & PWC Lifts",
                img: "/__mockup/images/wisconsin-commercial-pier-baileys-harbor-aerial-001.png",
                desc: "State-of-the-art protection for your vessels, seamlessly integrated into your architectural vision."
              },
              {
                title: "Marine Contracting",
                img: "/__mockup/images/lake-geneva-geneva-lake-permanent-pier-aerial-001.jpg",
                desc: "Comprehensive shoreline solutions, from seawalls to full-scale marina developments."
              }
            ].map((item, i) => (
              <div key={i} className="group cursor-pointer">
                <div className="aspect-[3/4] overflow-hidden mb-6 relative">
                  <div className="absolute inset-0 bg-[#0A1628]/0 group-hover:bg-[#0A1628]/10 transition-colors z-10 duration-500" />
                  <img src={item.img} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" />
                </div>
                <h3 className="font-serif text-2xl mb-3">{item.title}</h3>
                <p className="text-[#0A1628]/70 font-light leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Value Proposition */}
      <section className="py-24 bg-[#0A1628] text-white">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="font-serif text-4xl md:text-5xl leading-tight mb-8">
              Why settle for seasonal<br/>when you can build permanent?
            </h2>
            <div className="w-12 h-[1px] bg-[#C8102E] mb-8" />
            <p className="text-white/70 text-lg font-light leading-relaxed mb-8">
              A permanent pier is more than a docking structure—it is an architectural statement. Unshaken by winter ice, unbothered by seasonal removal, it stands ready the moment the ice thaws.
            </p>
            <ul className="space-y-4 mb-12">
              {["No seasonal installation or removal", "Engineered for deep water and heavy ice", "Custom masonry and premium decking", "Lifetime structural integrity"].map((point, i) => (
                <li key={i} className="flex items-center gap-4 text-white/80 font-light">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C8102E]" />
                  {point}
                </li>
              ))}
            </ul>
            <a href="#" className="inline-block px-8 py-4 bg-white text-[#0A1628] text-sm uppercase tracking-wider hover:bg-[#C8102E] hover:text-white transition-colors">
              The Permanent Advantage
            </a>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <img src="/__mockup/images/door-county-lake-michigan-permanent-pier-001.jpg" alt="Detail" className="w-full aspect-[4/5] object-cover mt-12" />
            <img src="/__mockup/images/oconomowoc-nagawicka-lake-permanent-pier-aerial-001.jpg" alt="Detail" className="w-full aspect-[4/5] object-cover" />
          </div>
        </div>
      </section>

      {/* Markets */}
      <section className="py-24 border-b border-[#0A1628]/10 bg-[#F9F8F6]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="font-serif text-4xl mb-4">Wisconsin's Finest Waters</h2>
            <p className="text-[#0A1628]/70 font-light">Serving the most prestigious lakefront properties across the state.</p>
          </div>
          <div className="flex flex-wrap justify-center gap-x-12 gap-y-6">
            {["Lake Geneva", "Oconomowoc", "Madison", "Whitewater", "Green Lake", "Fox Chain", "Door County"].map((market) => (
              <a key={market} href="#" className="text-xl font-serif italic text-[#0A1628]/60 hover:text-[#C8102E] transition-colors">
                {market}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Projects Gallery */}
      <section className="py-24 bg-[#F9F8F6]">
        <div className="max-w-7xl mx-auto px-6 mb-12 flex justify-between items-end">
          <h2 className="font-serif text-4xl md:text-5xl">Recent Commissions</h2>
          <a href="#" className="hidden md:inline-block text-sm uppercase tracking-widest border-b border-[#0A1628] pb-1 hover:text-[#C8102E] hover:border-[#C8102E] transition-all">
            View All Projects
          </a>
        </div>
        <div className="flex overflow-x-auto gap-6 px-6 pb-8 snap-x snap-mandatory hide-scrollbar">
          {[
            { img: "/__mockup/images/oconomowoc-beaver-lake-permanent-pier-001.jpg", caption: "Beaver Lake Estate" },
            { img: "/__mockup/images/door-county-green-bay-permanent-pier-aerial-001.jpg", caption: "Green Bay Waterfront" },
            { img: "/__mockup/images/wisconsin-commercial-pier-baileys-harbor-aerial-001.png", caption: "Baileys Harbor Marina" },
            { img: "/__mockup/images/lake-geneva-geneva-lake-permanent-pier-aerial-001.jpg", caption: "Geneva Lake Residence" }
          ].map((project, idx) => (
            <div key={idx} className="shrink-0 w-[85vw] md:w-[45vw] snap-center group">
              <div className="aspect-[16/10] overflow-hidden mb-4 relative">
                <img src={project.img} alt={project.caption} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" />
              </div>
              <p className="font-serif text-lg tracking-wide">{project.caption}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonial */}
      <section className="py-32 bg-white text-center px-6">
        <div className="max-w-4xl mx-auto">
          <p className="font-serif text-3xl md:text-4xl leading-snug mb-10 text-[#0A1628]">
            "Summerset transformed our shoreline. Their permanent pier didn't just solve our docking needs—it became the focal point of our summer living. The craftsmanship is simply unmatched."
          </p>
          <div className="flex flex-col items-center">
            <div className="w-12 h-[1px] bg-[#C8102E] mb-6" />
            <p className="uppercase tracking-widest text-sm font-medium">The Reynolds Family</p>
            <p className="text-[#0A1628]/50 text-sm mt-1">Lake Geneva, WI</p>
          </div>
        </div>
      </section>

      {/* Footer / CTA */}
      <footer className="bg-[#0A1628] text-white pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-6 mb-24 text-center">
          <h2 className="font-serif text-5xl md:text-6xl mb-8">Begin Your Project</h2>
          <p className="text-white/70 max-w-2xl mx-auto font-light text-lg mb-10">
            Schedule a private consultation with our design team to discuss your shoreline vision.
          </p>
          <a href="#" className="inline-block px-10 py-4 bg-[#C8102E] text-white text-sm uppercase tracking-wider hover:bg-white hover:text-[#0A1628] transition-colors">
            Request Consultation
          </a>
        </div>
        
        <div className="max-w-7xl mx-auto px-6 border-t border-white/10 pt-12 flex flex-col md:flex-row justify-between items-center gap-6">
          <img 
            src="/__mockup/images/summerset-marine-construction-logo-white.png" 
            alt="Summerset Marine Construction" 
            className="h-8 w-auto opacity-50"
          />
          <div className="flex gap-6 text-sm text-white/50 font-light">
            <a href="#" className="hover:text-white">Privacy Policy</a>
            <a href="#" className="hover:text-white">Terms of Service</a>
            <span>© {new Date().getFullYear()} Summerset Marine Construction</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
