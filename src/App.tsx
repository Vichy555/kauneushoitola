import React, { useState, useEffect } from 'react';
import { Calendar, Star, Phone, Mail, MapPin, Check, Heart, Sparkles, Clock, Award } from 'lucide-react';

function App() {
  const [isVisible, setIsVisible] = useState({});
  const [timeLeft, setTimeLeft] = useState({ hours: 23, minutes: 45, seconds: 32 });

  // Countdown timer for urgency
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Intersection Observer for animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(prev => ({
              ...prev,
              [entry.target.id]: true
            }));
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('[id]').forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const handleBooking = () => {
    // In real implementation, this would open booking system
    alert('Varausjärjestelmä avautuu! (Booking system would open!)');
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="fixed top-0 w-full bg-white/95 backdrop-blur-sm shadow-sm z-50 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Sparkles className="w-8 h-8 text-rose-500" />
              <span className="text-xl font-bold text-gray-900">Bella Kauneus</span>
            </div>
            <nav className="hidden md:flex space-x-8">
              <a href="#palvelut" className="text-gray-700 hover:text-rose-500 transition-colors">Palvelut</a>
              <a href="#meista" className="text-gray-700 hover:text-rose-500 transition-colors">Meistä</a>
              <a href="#arvostelut" className="text-gray-700 hover:text-rose-500 transition-colors">Arvostelut</a>
            </nav>
            <button
              onClick={handleBooking}
              className="bg-rose-500 text-white px-6 py-2 rounded-full hover:bg-rose-600 transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Varaa Aika
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-20 pb-16 bg-gradient-to-br from-rose-50 to-pink-50 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-rose-500/5 to-pink-500/5"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 animate-fade-in-up">
              <div className="space-y-4">
                <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight">
                  Löydä <span className="text-rose-500">Luonnollinen</span> Kauneutesi
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed">
                  Ammattitaitoisia kauneushoitoja sydämessä Helsinkiä. Varaa aikasi jo tänään ja koe ero, jonka huippulaatuinen hoito tekee.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={handleBooking}
                  className="bg-rose-500 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-rose-600 transition-all duration-300 transform hover:scale-105 shadow-xl"
                >
                  <Calendar className="inline w-5 h-5 mr-2" />
                  Varaa Ilmainen Konsultaatio
                </button>
                <button className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-full text-lg font-semibold hover:border-rose-500 hover:text-rose-500 transition-all duration-300">
                  Katso Palvelut
                </button>
              </div>

              <div className="flex items-center space-x-6 pt-4">
                <div className="flex items-center space-x-1">
                  {[1,2,3,4,5].map(i => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                  <span className="ml-2 text-gray-600">5.0 (200+ arvostelua)</span>
                </div>
              </div>
            </div>

            <div className="relative">
              <img
                src="https://images.pexels.com/photos/3985360/pexels-photo-3985360.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Beauty treatment"
                className="rounded-2xl shadow-2xl w-full h-[600px] object-cover"
              />
              <div className="absolute -bottom-6 -left-6 bg-white rounded-xl p-6 shadow-xl">
                <div className="flex items-center space-x-4">
                  <div className="bg-rose-100 p-3 rounded-full">
                    <Award className="w-6 h-6 text-rose-500" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">Sertifioitu</div>
                    <div className="text-sm text-gray-600">Kauneusasiantuntija</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Urgency Banner */}
      <section className="bg-gradient-to-r from-rose-500 to-pink-500 text-white py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center space-x-4 text-center">
            <Clock className="w-5 h-5" />
            <span className="font-semibold">
              🔥 Rajoitettu aika! Varaa nyt ja saa 20% alennus ensimmäisestä käynnistä. Tarjous päättyy: {timeLeft.hours}t {timeLeft.minutes}min {timeLeft.seconds}s
            </span>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Miksi Asiakkaamme Rakastavat Meitä
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Yhdistämme vuosien kokemuksen, huippulaadun tuotteet ja henkilökohtaisen palvelun
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Heart className="w-8 h-8" />,
                title: "Henkilökohtainen Lähestymistapa",
                description: "Jokainen hoito räätälöidään juuri sinun ihosi tarpeisiin ja toiveisiin."
              },
              {
                icon: <Sparkles className="w-8 h-8" />,
                title: "Premium Tuotteet",
                description: "Käytämme vain parhaita kansainvälisiä brändejä ja luonnonmukaisia ainesosia."
              },
              {
                icon: <Award className="w-8 h-8" />,
                title: "Sertifioitu Asiantuntemus",
                description: "Yli 10 vuoden kokemus ja jatkuva kouluttautuminen alan uusimmissa tekniikoissa."
              }
            ].map((benefit, index) => (
              <div
                key={index}
                id={`benefit-${index}`}
                className={`text-center p-8 rounded-xl bg-gradient-to-br from-rose-50 to-pink-50 hover:shadow-lg transition-all duration-300 transform ${
                  isVisible[`benefit-${index}`] ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                }`}
                style={{
                  transitionDelay: `${index * 200}ms`
                }}
              >
                <div className="bg-rose-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 text-rose-500">
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="palvelut" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Suositut Palvelumme
            </h2>
            <p className="text-xl text-gray-600">
              Kattava valikoima hoitoja kauneuden ja hyvinvoinnin tarpeisiisi
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {[
              {
                image: "https://images.pexels.com/photos/3985411/pexels-photo-3985411.jpeg?auto=compress&cs=tinysrgb&w=800",
                title: "Kasvohoito & Puhdistus",
                price: "Alkaen 89€",
                features: ["Syvä puhdistus", "Kosteutus", "Anti-aging hoito", "LED-valohoito"],
                popular: true
              },
              {
                image: "https://images.pexels.com/photos/3997349/pexels-photo-3997349.jpeg?auto=compress&cs=tinysrgb&w=800",
                title: "Permanentti & Ripsienpidennys",
                price: "Alkaen 120€",
                features: ["Luonnollinen ilme", "Kestää 6-8 viikkoa", "Vedenkestävä", "Ammattitaito"],
                popular: false
              },
              {
                image: "https://images.pexels.com/photos/3985360/pexels-photo-3985360.jpeg?auto=compress&cs=tinysrgb&w=800",
                title: "Hieronta & Rentoutus",
                price: "Alkaen 75€",
                features: ["Stressin poisto", "Lihasjännityksen helpotus", "Verenkierron parantaminen", "Kokonaisvaltainen hyvinvointi"],
                popular: false
              },
              {
                image: "https://images.pexels.com/photos/3985329/pexels-photo-3985329.jpeg?auto=compress&cs=tinysrgb&w=800",
                title: "Kynsihoito & Geeli",
                price: "Alkaen 45€",
                features: ["Pitkäkestoinen", "Laaja värivalikoima", "Kynsien vahvistus", "Ammattitaitoinen toteutus"],
                popular: true
              }
            ].map((service, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                {service.popular && (
                  <div className="bg-rose-500 text-white text-center py-2 font-semibold">
                    ⭐ Suosituin Palvelu
                  </div>
                )}
                <div className="relative">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-64 object-cover"
                  />
                  <div className="absolute top-4 right-4 bg-white rounded-full px-4 py-2 shadow-lg">
                    <span className="text-rose-500 font-bold">{service.price}</span>
                  </div>
                </div>
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">{service.title}</h3>
                  <ul className="space-y-2 mb-6">
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center text-gray-600">
                        <Check className="w-5 h-5 text-green-500 mr-3" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <button
                    onClick={handleBooking}
                    className="w-full bg-rose-500 text-white py-3 rounded-full font-semibold hover:bg-rose-600 transition-all duration-300 transform hover:scale-105"
                  >
                    Varaa Tämä Palvelu
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="arvostelut" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Mitä Asiakkaamme Sanovat
            </h2>
            <p className="text-xl text-gray-600">
              Yli 500 tyytyväistä asiakasta ympäri Helsinkiä
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Maria K.",
                rating: 5,
                text: "Paras kauneussalogi missä olen käynyt! Henkilökunta on ammattitaitoista ja hoitotilat rauhallisia. Suosittelen lämpimästi!",
                service: "Kasvohoito"
              },
              {
                name: "Anna L.",
                rating: 5,
                text: "Ripsienpidennykseni näyttävät täydellisiltä ja kestävät todella hyvin. Tulen varmasti takaisin!",
                service: "Ripsienpidennus"
              },
              {
                name: "Sanna H.",
                rating: 5,
                text: "Hieronta oli juuri sitä mitä tarvitsin stressin ja jännityksen purkamiseen. Tunnelma oli rauhoittava ja rentouttava.",
                service: "Hieronta"
              }
            ].map((testimonial, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-rose-50 to-pink-50 rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-center mb-4">
                  {[1,2,3,4,5].map(i => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-700 mb-6 italic">"{testimonial.text}"</p>
                <div className="flex justify-between items-center">
                  <div>
                    <div className="font-semibold text-gray-900">{testimonial.name}</div>
                    <div className="text-sm text-gray-600">{testimonial.service}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="meista" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <img
                src="https://images.pexels.com/photos/3985330/pexels-photo-3985330.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Beauty salon interior"
                className="rounded-2xl shadow-xl w-full h-[500px] object-cover"
              />
            </div>
            <div className="space-y-6">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
                Tervetuloa Bella Kauneuteen
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                Olemme toimineet Helsingin sydämessä yli 10 vuotta ja palvelleet tuhansia tyytyväisiä asiakkaita. Tiimimme koostuu sertifioiduista kauneusasiantuntijoista, jotka jatkuvasti kehittävät osaamistaan.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                Uskomme, että jokainen ansaitsee tuntea itsensä kauniiksi ja itsevarmaaseksi. Siksi tarjoamme aina henkilökohtaista palvelua ja räätälöimme hoidot juuri sinun tarpeisiisi.
              </p>
              <div className="grid grid-cols-3 gap-6 pt-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-rose-500">500+</div>
                  <div className="text-gray-600">Tyytyväistä asiakasta</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-rose-500">10+</div>
                  <div className="text-gray-600">Vuotta kokemusta</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-rose-500">15+</div>
                  <div className="text-gray-600">Eri palvelua</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 bg-gradient-to-br from-rose-500 to-pink-600 text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl lg:text-5xl font-bold mb-6">
            Valmis Kokemaan Muutoksen?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Älä odota enää! Varaa aikasi jo tänään ja ala matkasi kohti luonnollista kauneutta.
          </p>
          
          <div className="bg-white/10 rounded-xl p-6 mb-8 backdrop-blur-sm">
            <div className="text-lg font-semibold mb-4">🎁 Erikoistarjous uusille asiakkaille:</div>
            <div className="text-2xl font-bold mb-2">20% ALENNUS + Ilmainen konsultaatio</div>
            <div className="text-sm opacity-80">Tarjous voimassa seuraavat {timeLeft.hours}t {timeLeft.minutes}min {timeLeft.seconds}s</div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={handleBooking}
              className="bg-white text-rose-500 px-8 py-4 rounded-full text-lg font-bold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-xl"
            >
              <Calendar className="inline w-5 h-5 mr-2" />
              Varaa Aika Nyt - 20% Alennus
            </button>
            <a
              href="tel:+358401234567"
              className="border-2 border-white text-white px-8 py-4 rounded-full text-lg font-bold hover:bg-white hover:text-rose-500 transition-all duration-300"
            >
              <Phone className="inline w-5 h-5 mr-2" />
              Soita: 040 123 4567
            </a>
          </div>

          <div className="mt-8 text-sm opacity-80">
            ✅ Ei sitovia sopimuksia • ✅ Rahat takaisin -takuu • ✅ Ammattitaitoinen palvelu
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Sparkles className="w-6 h-6 text-rose-500" />
                <span className="text-xl font-bold">Bella Kauneus</span>
              </div>
              <p className="text-gray-400">
                Helsingin luotettavin kauneussalong jo yli 10 vuoden ajan.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Yhteystiedot</h3>
              <div className="space-y-2 text-gray-400">
                <div className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4" />
                  <span>Mannerheimintie 12, Helsinki</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Phone className="w-4 h-4" />
                  <span>040 123 4567</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Mail className="w-4 h-4" />
                  <span>info@bellakauneus.fi</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Palvelut</h3>
              <ul className="space-y-2 text-gray-400">
                <li>Kasvohoidot</li>
                <li>Ripsienpidennus</li>
                <li>Hieronta</li>
                <li>Kynsihoito</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Aukioloajat</h3>
              <div className="space-y-1 text-gray-400">
                <div>Ma-Pe: 9:00-19:00</div>
                <div>La: 10:00-16:00</div>
                <div>Su: Suljettu</div>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 Bella Kauneus. Kaikki oikeudet pidätetään.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;