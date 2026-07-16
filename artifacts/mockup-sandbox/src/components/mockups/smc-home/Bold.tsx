import React from "react";
import { ArrowRight, Anchor, Shield, MapPin, Phone, Menu, X, ChevronRight } from "lucide-react";
import { Button } from "../../ui/button";

const BoldHome = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans antialiased flex flex-col" style={{ fontFamily: "'Inter', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@500;600;700&display=swap');
        .font-display { font-family: 'Space Grotesk', sans-serif; }
        .bg-navy { background-color: #0A1628; }
        .text-navy { color: #0A1628; }
        .bg-red-accent { background-color: #C8102E; }
        .text-red-accent { color: #C8102E; }
        .border-red-accent { border-color: #C8102E; }
      `}</style>

      {/* Navigation */}
      <nav className="fixed w-full z-50 bg-navy text-white border-b border-white/10 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-6 h-24 flex items-center justify-between">
          <div className="flex-shrink-0">
            <img src="/__mockup/images/summerset-marine-construction-logo-white.png" alt="Summerset Marine Construction" className="h-12" />
          </div>
          
          <div className="hidden lg:flex items-center space-x-8 font-medium text-sm tracking-wide">
            <a href="#" className="hover:text-red-accent transition-colors">PRODUCTS</a>
            <a href="#" className="hover:text-red-accent transition-colors">SERVICES</a>
            <a href="#" className="hover:text-red-accent transition-colors">MARKETS</a>
            <a href="#" className="hover:text-red-accent transition-colors">RESOURCES</a>
            <a href="#" className="hover:text-red-accent transition-colors">ABOUT</a>
            <a href="#" className="hover:text-red-accent transition-colors">CONTACT</a>
          </div>

          <div className="hidden lg:flex items-center space-x-6">
            <div className="flex items-center space-x-2 text-sm font-semibold">
              <Phone className="w-4 h-4 text-red-accent" />
              <span>(262) 555-0198</span>
            </div>
            <Button className="bg-red-accent hover:bg-red-700 text-white font-display tracking-wide uppercase h-12 px-8 rounded-none">
              Get a Consultation
            </Button>
          </div>

          <button className="lg:hidden text-white" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-navy pt-24 px-6 flex flex-col space-y-6 lg:hidden text-white font-display uppercase tracking-widest text-2xl">
          <a href="#" className="block border-b border-white/10 pb-4">Products</a>
          <a href="#" className="block border-b border-white/10 pb-4">Services</a>
          <a href="#" className="block border-b border-white/10 pb-4">Markets</a>
          <a href="#" className="block border-b border-white/10 pb-4">Resources</a>
          <a href="#" className="block border-b border-white/10 pb-4">About</a>
          <a href="#" className="block border-b border-white/10 pb-4">Contact</a>
          <Button className="bg-red-accent hover:bg-red-700 text-white w-full rounded-none h-14 mt-8">
            Get a Consultation
          </Button>
        </div>
      )}

      {/* Hero Section */}
      <section className="relative h-screen min-h-[800px] flex items-center pt-24 bg-navy overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="/__mockup/images/lake-geneva-permanent-pier-sunrise-001.jpg" 
            alt="Lake Geneva Sunrise" 
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-navy/90 via-navy/50 to-transparent"></div>
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-6">
          <div className="max-w-3xl">
            <div className="inline-block bg-red-accent text-white px-4 py-1.5 font-bold tracking-widest text-sm mb-6 font-display">
              EST. 1990 • WISCONSIN
            </div>
            <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold text-white leading-[0.9] tracking-tighter mb-8 uppercase">
              Engineer<br />
              The Edge<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/50">Of Your World.</span>
            </h1>
            <p className="text-lg md:text-xl text-white/80 max-w-xl mb-12 font-medium leading-relaxed">
              Permanent piers and custom marine construction for Wisconsin's most demanding shorelines. Build once. Enjoy forever.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button className="bg-red-accent hover:bg-red-700 text-white h-16 px-10 text-lg font-display uppercase tracking-widest rounded-none flex items-center justify-between group w-full sm:w-auto">
                <span>Start Your Project</span>
                <ArrowRight className="w-5 h-5 ml-4 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button variant="outline" className="h-16 px-10 text-lg font-display uppercase tracking-widest rounded-none border-2 border-white text-white hover:bg-white hover:text-navy w-full sm:w-auto bg-transparent">
                View Portfolio
              </Button>
            </div>
          </div>
        </div>

        {/* Specs Callout */}
        <div className="absolute bottom-0 right-0 hidden lg:flex bg-white/10 backdrop-blur-md border-l border-t border-white/20 text-white p-8">
          <div className="grid grid-cols-2 gap-12">
            <div>
              <div className="text-red-accent font-display text-4xl font-bold mb-1">2.5<span className="text-xl">X</span></div>
              <div className="text-xs tracking-widest uppercase text-white/60">Stronger than aluminum</div>
            </div>
            <div>
              <div className="text-red-accent font-display text-4xl font-bold mb-1">50<span className="text-xl">YR</span></div>
              <div className="text-xs tracking-widest uppercase text-white/60">Expected Lifespan</div>
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-24 bg-white relative z-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
            <div>
              <h2 className="font-display text-4xl md:text-6xl font-bold text-navy uppercase tracking-tight">Our Capabilities</h2>
              <div className="w-24 h-1.5 bg-red-accent mt-6"></div>
            </div>
            <p className="text-lg text-slate-500 max-w-md font-medium">
              We specialize in heavy-duty, permanent marine solutions designed to withstand winter ice and extreme conditions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Product 1 */}
            <div className="group relative bg-navy overflow-hidden cursor-pointer">
              <div className="absolute inset-0">
                <img src="/__mockup/images/wisconsin-commercial-pier-baileys-harbor-aerial-001.png" alt="Permanent Piers" className="w-full h-full object-cover opacity-40 group-hover:opacity-60 group-hover:scale-105 transition-all duration-700" />
              </div>
              <div className="relative z-10 p-10 h-full flex flex-col min-h-[400px]">
                <div className="w-12 h-12 bg-red-accent flex items-center justify-center mb-auto">
                  <Anchor className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-display text-3xl font-bold text-white uppercase tracking-tight mb-4">Permanent<br/>Piers</h3>
                  <div className="flex items-center text-red-accent font-bold text-sm tracking-widest uppercase group-hover:text-white transition-colors">
                    Explore Engineering <ArrowRight className="w-4 h-4 ml-2" />
                  </div>
                </div>
              </div>
            </div>

            {/* Product 2 */}
            <div className="group relative bg-navy overflow-hidden cursor-pointer">
              <div className="absolute inset-0">
                <img src="/__mockup/images/wisconsin-lifetime-standalone-boat-lift-001.jpg" alt="Boat Lifts" className="w-full h-full object-cover opacity-40 group-hover:opacity-60 group-hover:scale-105 transition-all duration-700" />
              </div>
              <div className="relative z-10 p-10 h-full flex flex-col min-h-[400px]">
                <div className="w-12 h-12 bg-red-accent flex items-center justify-center mb-auto">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-display text-3xl font-bold text-white uppercase tracking-tight mb-4">Boat & PWC<br/>Lifts</h3>
                  <div className="flex items-center text-red-accent font-bold text-sm tracking-widest uppercase group-hover:text-white transition-colors">
                    View Systems <ArrowRight className="w-4 h-4 ml-2" />
                  </div>
                </div>
              </div>
            </div>

            {/* Product 3 */}
            <div className="group relative bg-navy overflow-hidden cursor-pointer">
              <div className="absolute inset-0">
                <img src="/__mockup/images/wisconsin-marine-contracting-service-r1ver-002.jpg" alt="Marine Contracting" className="w-full h-full object-cover opacity-40 group-hover:opacity-60 group-hover:scale-105 transition-all duration-700" />
              </div>
              <div className="relative z-10 p-10 h-full flex flex-col min-h-[400px]">
                <div className="w-12 h-12 bg-red-accent flex items-center justify-center mb-auto">
                  <Menu className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-display text-3xl font-bold text-white uppercase tracking-tight mb-4">Marine<br/>Contracting</h3>
                  <div className="flex items-center text-red-accent font-bold text-sm tracking-widest uppercase group-hover:text-white transition-colors">
                    See Projects <ArrowRight className="w-4 h-4 ml-2" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Value Section - Why Permanent */}
      <section className="bg-slate-50 py-24 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="font-display text-red-accent font-bold tracking-widest text-sm uppercase mb-4">The Standard</div>
              <h2 className="font-display text-4xl md:text-5xl font-bold text-navy uppercase tracking-tight mb-8">Why Build<br/>Permanent?</h2>
              
              <div className="space-y-8">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 border-2 border-navy rounded-none flex items-center justify-center font-display font-bold text-navy text-xl">01</div>
                  <div>
                    <h4 className="font-display font-bold text-xl uppercase text-navy mb-2">Zero Seasonal Hassle</h4>
                    <p className="text-slate-600">Never install or remove your pier again. Our permanent structures are engineered to withstand the crushing force of Wisconsin winter ice.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 border-2 border-navy rounded-none flex items-center justify-center font-display font-bold text-navy text-xl">02</div>
                  <div>
                    <h4 className="font-display font-bold text-xl uppercase text-navy mb-2">Industrial Grade</h4>
                    <p className="text-slate-600">Built with deep-driven steel pilings and heavy-duty structural steel frames. This is commercial-grade construction for residential shorelines.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 border-2 border-navy rounded-none flex items-center justify-center font-display font-bold text-navy text-xl">03</div>
                  <div>
                    <h4 className="font-display font-bold text-xl uppercase text-navy mb-2">Lifetime Value</h4>
                    <p className="text-slate-600">A permanent pier isn't just an accessory; it's an architectural extension of your property that increases your home's total value.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="absolute -inset-4 bg-navy translate-x-4 translate-y-4 z-0"></div>
              <img src="/__mockup/images/door-county-lake-michigan-permanent-pier-001.jpg" alt="Permanent Pier Construction" className="relative z-10 w-full h-[600px] object-cover grayscale contrast-125" />
              <div className="absolute top-8 -left-8 z-20 bg-red-accent text-white p-6 shadow-2xl">
                <div className="font-display text-5xl font-bold mb-1">10k+</div>
                <div className="font-display tracking-widest text-sm uppercase">Pilings Driven</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Markets Section */}
      <section className="py-24 bg-navy text-white overflow-hidden relative">
        <div className="absolute inset-0 z-0">
          <img src="/__mockup/images/oconomowoc-nagawicka-lake-permanent-pier-aerial-001.jpg" alt="Wisconsin Lakes" className="w-full h-full object-cover opacity-10" />
        </div>
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl md:text-5xl font-bold uppercase tracking-tight mb-6">Wisconsin's Premier Waters</h2>
            <p className="text-white/70 max-w-2xl mx-auto font-medium text-lg">We serve the most exclusive lakefront communities across the state, bringing industrial-strength engineering to luxury properties.</p>
          </div>

          <div className="flex flex-wrap justify-center gap-4 md:gap-6">
            {['Lake Geneva', 'Oconomowoc', 'Madison', 'Whitewater', 'Green Lake', 'Fox Chain', 'Door County'].map((market) => (
              <div key={market} className="group flex items-center bg-white/5 hover:bg-red-accent transition-colors duration-300 border border-white/20 px-6 py-4 cursor-pointer">
                <MapPin className="w-5 h-5 mr-3 text-red-accent group-hover:text-white" />
                <span className="font-display font-bold uppercase tracking-wider">{market}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Projects Gallery */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 mb-12 flex justify-between items-end">
          <div>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-navy uppercase tracking-tight">Recent Works</h2>
            <div className="w-24 h-1.5 bg-red-accent mt-6"></div>
          </div>
          <Button variant="link" className="text-navy font-bold hover:text-red-accent font-display tracking-widest uppercase hidden md:flex items-center">
            View All Projects <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        </div>

        <div className="flex overflow-x-auto pb-12 snap-x snap-mandatory hide-scrollbar pl-6 md:pl-[calc((100vw-80rem)/2)] pr-6 gap-6">
          <div className="snap-center shrink-0 w-[85vw] md:w-[600px] group cursor-pointer">
            <div className="relative h-[400px] overflow-hidden mb-6 bg-slate-100">
              <img src="/__mockup/images/oconomowoc-beaver-lake-permanent-pier-001.jpg" alt="Beaver Lake" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
            </div>
            <h3 className="font-display font-bold text-2xl text-navy uppercase tracking-tight mb-2">Beaver Lake Residence</h3>
            <p className="text-slate-500 font-medium">Custom Steel Frame • Sun Deck • Integrated Boat Lift</p>
          </div>
          
          <div className="snap-center shrink-0 w-[85vw] md:w-[600px] group cursor-pointer">
            <div className="relative h-[400px] overflow-hidden mb-6 bg-slate-100">
              <img src="/__mockup/images/door-county-green-bay-permanent-pier-aerial-001.jpg" alt="Door County" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
            </div>
            <h3 className="font-display font-bold text-2xl text-navy uppercase tracking-tight mb-2">Green Bay Harbor</h3>
            <p className="text-slate-500 font-medium">Commercial Grade • Deep Water Pilings • Breakwater</p>
          </div>

          <div className="snap-center shrink-0 w-[85vw] md:w-[600px] group cursor-pointer">
            <div className="relative h-[400px] overflow-hidden mb-6 bg-slate-100">
              <img src="/__mockup/images/lake-geneva-geneva-lake-permanent-pier-aerial-001.jpg" alt="Lake Geneva" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
            </div>
            <h3 className="font-display font-bold text-2xl text-navy uppercase tracking-tight mb-2">Geneva Lake Estate</h3>
            <p className="text-slate-500 font-medium">Heritage Design • Twin Canopy Lifts • Entertaining Platform</p>
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="py-32 bg-slate-100 relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-16 bg-red-accent"></div>
        <div className="max-w-4xl mx-auto px-6 text-center">
          <svg className="w-12 h-12 mx-auto text-navy/20 mb-8" fill="currentColor" viewBox="0 0 24 24">
            <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
          </svg>
          <p className="text-2xl md:text-4xl font-display font-medium text-navy leading-tight mb-10">
            "The engineering precision Summerset brought to our lakefront is unmatched. Our pier survived the harshest ice shove in decades without a single bent piling."
          </p>
          <div className="font-bold text-navy uppercase tracking-widest text-sm">
            J. Reynolds <span className="text-red-accent mx-2">•</span> Oconomowoc Lake
          </div>
        </div>
      </section>

      {/* CTA Band */}
      <section className="bg-red-accent text-white py-20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-[url('/__mockup/images/wisconsin-commercial-pier-baileys-harbor-aerial-001.png')] bg-cover bg-center mix-blend-overlay opacity-30"></div>
        <div className="max-w-7xl mx-auto px-6 relative z-10 flex flex-col md:flex-row items-center justify-between gap-10">
          <div>
            <h2 className="font-display text-4xl md:text-6xl font-bold uppercase tracking-tight mb-4 text-white">Ready to Build?</h2>
            <p className="text-white/90 text-xl font-medium">Schedule a site consultation with our engineering team.</p>
          </div>
          <Button className="bg-navy hover:bg-slate-900 text-white h-20 px-12 text-xl font-display uppercase tracking-widest rounded-none shadow-2xl shrink-0">
            Request Consultation
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-navy pt-24 pb-12 border-t-8 border-slate-900 text-white/70">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div>
            <img src="/__mockup/images/summerset-marine-construction-logo-white.png" alt="SMC Logo" className="h-10 mb-8 opacity-90" />
            <p className="text-sm font-medium mb-6">Wisconsin's premier builder of permanent piers, boat lifts, and custom waterfront solutions.</p>
            <div className="flex items-center space-x-2 text-white font-bold font-display tracking-widest">
              <span className="text-red-accent">JUST ADD WATER</span>
            </div>
          </div>
          
          <div>
            <h4 className="text-white font-display font-bold uppercase tracking-widest mb-6">Capabilities</h4>
            <ul className="space-y-4 text-sm font-medium">
              <li><a href="#" className="hover:text-white transition-colors">Permanent Piers</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Boat Lifts</a></li>
              <li><a href="#" className="hover:text-white transition-colors">PWC Lifts</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Marine Contracting</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-display font-bold uppercase tracking-widest mb-6">Markets</h4>
            <ul className="space-y-4 text-sm font-medium">
              <li><a href="#" className="hover:text-white transition-colors">Lake Geneva</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Oconomowoc</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Door County</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Madison</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-display font-bold uppercase tracking-widest mb-6">Contact</h4>
            <ul className="space-y-4 text-sm font-medium">
              <li className="flex items-start">
                <MapPin className="w-5 h-5 text-red-accent mr-3 shrink-0" />
                <span>W9040 State Road 59<br/>Whitewater, WI 53190</span>
              </li>
              <li className="flex items-center">
                <Phone className="w-5 h-5 text-red-accent mr-3 shrink-0" />
                <span>(262) 555-0198</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto px-6 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center text-xs font-medium uppercase tracking-wider">
          <p>&copy; {new Date().getFullYear()} Summerset Marine Construction.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default BoldHome;
