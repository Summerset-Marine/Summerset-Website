import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X, ArrowRight, Anchor, Shield, MapPin, ChevronRight, Quote } from 'lucide-react';

export default function Cinematic() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#0A1628] text-slate-100 font-sans selection:bg-[#C8102E] selection:text-white">
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400&display=swap');
        .font-serif { font-family: 'Playfair Display', serif; }
        .font-sans { font-family: 'Inter', sans-serif; }
        .glass-nav {
          background: rgba(10, 22, 40, 0.85);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border-bottom: 1px solid rgba(255,255,255,0.05);
        }
        .hero-overlay {
          background: linear-gradient(to bottom, rgba(10,22,40,0.3) 0%, rgba(10,22,40,0.8) 80%, rgba(10,22,40,1) 100%);
        }
        .glass-card {
          background: rgba(255, 255, 255, 0.03);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.05);
        }
      `}} />

      {/* Header */}
      <header 
        className={`fixed top-0 w-full z-50 transition-all duration-500 ${
          isScrolled ? 'glass-nav py-4' : 'bg-transparent py-6'
        }`}
      >
        <div className="container mx-auto px-6 max-w-7xl flex items-center justify-between">
          <div className="flex items-center gap-4 z-50">
            <img 
              src="/__mockup/images/summerset-marine-construction-logo-white.png" 
              alt="Summerset Marine Construction" 
              className="h-10 w-auto object-contain"
            />
          </div>

          <nav className="hidden lg:flex items-center gap-8 text-sm uppercase tracking-widest font-medium text-slate-300">
            <a href="#" className="hover:text-white transition-colors duration-300 hover:tracking-[0.15em]">Products</a>
            <a href="#" className="hover:text-white transition-colors duration-300 hover:tracking-[0.15em]">Services</a>
            <a href="#" className="hover:text-white transition-colors duration-300 hover:tracking-[0.15em]">Markets</a>
            <a href="#" className="hover:text-white transition-colors duration-300 hover:tracking-[0.15em]">Resources</a>
            <a href="#" className="hover:text-white transition-colors duration-300 hover:tracking-[0.15em]">About</a>
          </nav>

          <div className="hidden lg:flex items-center gap-6">
            <a href="#" className="text-sm font-medium hover:text-[#C8102E] transition-colors">Contact</a>
            <Button className="bg-[#C8102E] hover:bg-white hover:text-[#0A1628] text-white rounded-none uppercase tracking-widest text-xs px-8 py-6 h-auto transition-all duration-300">
              Get a Consultation
            </Button>
          </div>

          <button 
            className="lg:hidden z-50 text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <div className={`fixed inset-0 bg-[#0A1628] z-40 transition-transform duration-500 ease-in-out ${
          mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        } lg:hidden flex flex-col justify-center items-center gap-8 text-2xl font-serif`}>
          <a href="#" className="hover:text-[#C8102E] transition-colors">Products</a>
          <a href="#" className="hover:text-[#C8102E] transition-colors">Services</a>
          <a href="#" className="hover:text-[#C8102E] transition-colors">Markets</a>
          <a href="#" className="hover:text-[#C8102E] transition-colors">Resources</a>
          <a href="#" className="hover:text-[#C8102E] transition-colors">About</a>
          <a href="#" className="hover:text-[#C8102E] transition-colors">Contact</a>
        </div>
      </header>

      {/* Hero */}
      <section className="relative h-[100svh] w-full flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 w-full h-full">
          <img 
            src="/__mockup/images/lake-geneva-permanent-pier-sunrise-001.jpg" 
            alt="Lake Geneva Sunrise Pier" 
            className="w-full h-full object-cover object-center scale-105 animate-[pulse_20s_ease-in-out_infinite_alternate]"
          />
          <div className="absolute inset-0 hero-overlay mix-blend-multiply"></div>
          <div className="absolute inset-0 hero-overlay"></div>
        </div>

        <div className="relative z-10 container mx-auto px-6 max-w-5xl text-center flex flex-col items-center mt-20">
          <div className="glass-card p-12 md:p-16 flex flex-col items-center max-w-4xl border-t border-white/20 shadow-2xl">
            <span className="text-[#C8102E] uppercase tracking-[0.3em] text-sm md:text-base font-semibold mb-6 block">
              Just Add Water
            </span>
            <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl leading-tight mb-8 font-medium">
              Waterfront <br/><span className="italic font-light opacity-90">Elegance</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-300 font-light max-w-2xl mx-auto mb-10 leading-relaxed">
              Crafting legacy permanent piers and marine environments for Wisconsin's most discerning homeowners since 1990.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <Button className="bg-[#C8102E] hover:bg-white hover:text-[#0A1628] text-white rounded-none uppercase tracking-widest text-sm px-10 py-7 h-auto transition-all duration-300 w-full sm:w-auto">
                Explore Our Work
              </Button>
              <Button variant="outline" className="border-white/30 hover:border-white text-white hover:bg-white/5 rounded-none uppercase tracking-widest text-sm px-10 py-7 h-auto transition-all duration-300 w-full sm:w-auto bg-transparent">
                Request Consultation
              </Button>
            </div>
          </div>
        </div>
        
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-60 animate-bounce">
          <span className="text-xs uppercase tracking-widest">Scroll</span>
          <div className="w-[1px] h-12 bg-white/50"></div>
        </div>
      </section>

      {/* Products Highlights */}
      <section className="py-32 bg-[#0A1628] relative border-t border-white/5">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
            <div className="max-w-2xl">
              <h2 className="font-serif text-4xl md:text-6xl mb-6">Masterful<br/>Engineering</h2>
              <p className="text-slate-400 font-light text-lg leading-relaxed">
                We engineer and build marine infrastructure designed to withstand the test of time, ice, and generation. Uncompromising quality meets refined aesthetics.
              </p>
            </div>
            <a href="#" className="group flex items-center gap-3 text-sm uppercase tracking-widest font-medium hover:text-[#C8102E] transition-colors pb-2 border-b border-white/20 hover:border-[#C8102E]">
              View All Products
              <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" />
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Permanent Piers',
                desc: 'Built to withstand decades of harsh winters. Our signature steel and concrete permanent piers redefine your shoreline experience.',
                img: '/__mockup/images/door-county-green-bay-permanent-pier-aerial-001.jpg'
              },
              {
                title: 'Boat & PWC Lifts',
                desc: 'State-of-the-art lifting mechanisms that protect your investment while offering seamless, push-button access to the water.',
                img: '/__mockup/images/wisconsin-commercial-pier-baileys-harbor-aerial-001.png'
              },
              {
                title: 'Marine Contracting',
                desc: 'Comprehensive shoreline management, dredging, seawalls, and custom marine engineering for complex waterfront challenges.',
                img: '/__mockup/images/oconomowoc-beaver-lake-permanent-pier-001.jpg'
              }
            ].map((prod, i) => (
              <div key={i} className="group cursor-pointer relative overflow-hidden">
                <div className="aspect-[3/4] overflow-hidden relative">
                  <div className="absolute inset-0 bg-[#0A1628]/40 group-hover:bg-transparent transition-colors duration-700 z-10"></div>
                  <img 
                    src={prod.img} 
                    alt={prod.title} 
                    className="w-full h-full object-cover filter grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A1628] via-[#0A1628]/50 to-transparent z-10"></div>
                  
                  <div className="absolute bottom-0 left-0 w-full p-8 z-20 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <div className="w-10 h-[2px] bg-[#C8102E] mb-6 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 delay-100"></div>
                    <h3 className="font-serif text-2xl mb-3">{prod.title}</h3>
                    <p className="text-slate-400 text-sm font-light leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-200">
                      {prod.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Permanent */}
      <section className="py-32 bg-[#0d1b2e] relative overflow-hidden border-y border-white/5">
        <div className="container mx-auto px-6 max-w-7xl relative z-10">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div className="relative">
              <div className="aspect-square overflow-hidden rounded-sm relative">
                <img 
                  src="/__mockup/images/oconomowoc-nagawicka-lake-permanent-pier-aerial-001.jpg" 
                  alt="Quality Construction" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-[#0A1628]/20 mix-blend-overlay"></div>
              </div>
              <div className="absolute -bottom-10 -right-10 bg-[#C8102E] p-10 max-w-xs hidden md:block">
                <p className="font-serif text-3xl italic">"The last pier you will ever need to build."</p>
              </div>
            </div>

            <div>
              <span className="text-[#C8102E] uppercase tracking-[0.2em] text-sm font-semibold mb-4 block">The Summerset Standard</span>
              <h2 className="font-serif text-4xl md:text-5xl mb-8 leading-tight">Why Choose a Permanent Pier?</h2>
              
              <div className="space-y-12 mt-12">
                {[
                  { icon: Anchor, title: 'Unyielding Stability', desc: 'Deep-driven steel pilings combined with rigid concrete or composite decking create a platform that feels like an extension of land.' },
                  { icon: Shield, title: 'Four-Season Durability', desc: 'Engineered specifically to withstand Wisconsin ice shoves and freezing cycles. No more seasonal removal or spring installation.' },
                ].map((item, i) => (
                  <div key={i} className="flex gap-6">
                    <div className="shrink-0 mt-1">
                      <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center bg-white/5">
                        <item.icon size={20} className="text-[#C8102E]" />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xl font-serif mb-2">{item.title}</h3>
                      <p className="text-slate-400 font-light leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-12 pt-12 border-t border-white/10">
                <Button variant="link" className="text-white hover:text-[#C8102E] p-0 uppercase tracking-widest text-sm flex items-center gap-2 group">
                  Read our Seasonal vs Permanent Guide 
                  <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Markets / Locations */}
      <section className="py-32 relative bg-[#0A1628]">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="font-serif text-4xl md:text-5xl mb-6">Wisconsin's Premier Waters</h2>
            <p className="text-slate-400 font-light text-lg">
              Serving the most exclusive lakefront communities across the state with localized expertise and unparalleled craftsmanship.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8">
            {[
              'Lake Geneva', 'Oconomowoc', 'Madison', 'Door County',
              'Whitewater', 'Green Lake', 'Fox Chain'
            ].map((market, i) => (
              <a key={i} href="#" className="group relative h-32 md:h-48 overflow-hidden rounded-sm border border-white/5 bg-white/5 flex items-center justify-center text-center p-6 hover:border-white/20 transition-all duration-300">
                <span className="font-serif text-xl group-hover:text-[#C8102E] transition-colors relative z-10">{market}</span>
                <div className="absolute inset-0 bg-[url('/__mockup/images/door-county-lake-michigan-permanent-pier-001.jpg')] bg-cover bg-center opacity-0 group-hover:opacity-10 transition-opacity duration-500"></div>
              </a>
            ))}
            <a href="#" className="group relative h-32 md:h-48 flex items-center justify-center text-center p-6 hover:bg-white/5 transition-colors border border-dashed border-white/20">
              <span className="text-sm uppercase tracking-widest flex items-center gap-2 group-hover:text-[#C8102E] transition-colors">
                View All Markets <ChevronRight size={16} />
              </span>
            </a>
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="/__mockup/images/oconomowoc-okauchee-lake-permanent-pier-hero-001.jpg" 
            alt="Background" 
            className="w-full h-full object-cover filter brightness-50"
          />
          <div className="absolute inset-0 bg-[#0A1628]/80 mix-blend-multiply"></div>
        </div>
        
        <div className="container mx-auto px-6 relative z-10 max-w-4xl text-center">
          <Quote size={48} className="mx-auto text-[#C8102E] mb-10 opacity-50" />
          <h3 className="font-serif text-3xl md:text-5xl leading-snug mb-10 font-light">
            "The level of engineering and finish detail exceeded our expectations. Our shoreline was transformed from a functional necessity into the centerpiece of our property. It feels like it was always meant to be here."
          </h3>
          <p className="uppercase tracking-[0.2em] text-sm font-semibold text-slate-300">
            — The Anderson Family, Lake Geneva
          </p>
        </div>
      </section>

      {/* CTA Band */}
      <section className="py-24 bg-[#C8102E] relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('/__mockup/images/summerset-marine-construction-logo-white.png')] bg-no-repeat bg-center bg-[length:50%]"></div>
        <div className="container mx-auto px-6 relative z-10 max-w-5xl text-center flex flex-col items-center">
          <h2 className="font-serif text-4xl md:text-5xl mb-6 text-white">Ready to elevate your shoreline?</h2>
          <p className="text-white/80 font-light text-lg mb-10 max-w-2xl mx-auto">
            Schedule a site consultation with our engineering team to discuss the possibilities for your waterfront property.
          </p>
          <Button className="bg-white text-[#C8102E] hover:bg-[#0A1628] hover:text-white rounded-none uppercase tracking-widest text-sm px-12 py-8 h-auto transition-all duration-300">
            Request a Consultation
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#050B14] py-20 border-t border-white/10">
        <div className="container mx-auto px-6 max-w-7xl grid grid-cols-1 md:grid-cols-4 gap-12 text-sm font-light text-slate-400">
          <div className="md:col-span-1">
            <img 
              src="/__mockup/images/summerset-marine-construction-logo-white.png" 
              alt="Logo" 
              className="h-10 opacity-70 mb-8" 
            />
            <p className="mb-6 leading-relaxed">
              Wisconsin's premier builder of luxury permanent piers and marine infrastructure.
            </p>
            <p className="uppercase tracking-widest text-xs font-semibold text-white">Just Add Water.</p>
          </div>
          
          <div>
            <h4 className="text-white uppercase tracking-widest font-semibold mb-6">Products</h4>
            <ul className="space-y-4">
              <li><a href="#" className="hover:text-white transition-colors">Permanent Piers</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Boat & PWC Lifts</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Accessories</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Marine Contracting</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white uppercase tracking-widest font-semibold mb-6">Company</h4>
            <ul className="space-y-4">
              <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Markets</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white uppercase tracking-widest font-semibold mb-6">Contact</h4>
            <ul className="space-y-4">
              <li className="flex gap-3">
                <MapPin size={16} className="shrink-0 mt-1" />
                <span>W8008 State Hwy 12<br/>Whitewater, WI 53190</span>
              </li>
              <li><a href="tel:2622689252" className="hover:text-white transition-colors">(262) 268-9252</a></li>
              <li><a href="mailto:info@summersetmarine.com" className="hover:text-white transition-colors">info@summersetmarine.com</a></li>
            </ul>
          </div>
        </div>
        
        <div className="container mx-auto px-6 max-w-7xl mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-xs">
          <p>&copy; {new Date().getFullYear()} Summerset Marine Construction. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
