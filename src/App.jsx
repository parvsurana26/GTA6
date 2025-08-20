import React, { useState } from 'react'
import { useGSAP } from '@gsap/react'
import gsap, { ScrollTrigger } from 'gsap/all'
import 'remixicon/fonts/remixicon.css'

gsap.registerPlugin(ScrollTrigger)

const App = () => {
  const [showContent, setShowContent] = useState(false)

  useGSAP(() => {
    const tl = gsap.timeline()

    tl.to('.vi-mask-group', {
      rotate: 10,
      duration: 2,
      ease: 'power4.easeInOut',
      transformOrigin: "50% 50%",
    })
      .to('.vi-mask-group', {
        scale: 10,
        duration: 2,
        delay: -1.8,
        ease: 'Expo.easeInOut',
        transformOrigin: "50% 50%",
        opacity: 0,
        onUpdate: function () {
          if (this.progress() >= 0.8) {
            document.querySelector('.svg')?.remove()
            setShowContent(true)
            this.kill()
          }
        }
      })
  })

  useGSAP(() => {
    if (!showContent) return

    gsap.set('.main', {
      scale: 1.7,
      rotate: -10
    })

    gsap.set('.sky', {
      scale: 1.9,
      rotate: -20
    })

    gsap.set('.bg', {
      scale: 1.5,
      rotate: -3
    })

    gsap.to('.main', {
      scale: 1,
      rotate: 0,
      duration: 2,
      delay: -1,
      ease: 'Expo.easeInOut'
    })

    gsap.to('.sky', {
      scale: 1.4,
      rotate: 0,
      duration: 2,
      delay: -.8,
      ease: 'Expo.easeInOut'
    })

    gsap.to('.bg', {
      scale: 1.2,
      rotate: 0,
      duration: 2,
      delay: -.8,
      ease: 'Expo.easeInOut'
    })

    const main = document.querySelector('.main')
    const handleMouseMove = (e) => {
      const xMove = (e.clientX / window.innerWidth - 0.5) * 40
      
      gsap.to('.main .text', {
        x: `${xMove * 0.4}%`,
        duration: 1
      })

      gsap.to('.sky', {
        x: xMove * 0.5,
        duration: 1
      })

      gsap.to('.bg', {
        x: xMove * 0.8,
        duration: 1
      })
    }

    main?.addEventListener('mousemove', handleMouseMove)

    return () => {
      main?.removeEventListener('mousemove', handleMouseMove)
    }
  }, [showContent])

  useGSAP(() => {
    if (!showContent) return

    // Characters Section Animation
    gsap.from('.character-card', {
      scrollTrigger: {
        trigger: '.characters-section',
        start: 'top center',
        end: 'bottom center',
        toggleActions: 'play none none reverse'
      },
      y: 100,
      opacity: 0,
      duration: 1,
      stagger: 0.2
    })

    // Gallery Section Animation
    gsap.from('.gallery-item', {
      scrollTrigger: {
        trigger: '.gallery-section',
        start: 'top center',
        toggleActions: 'play none none reverse'
      },
      y: 50,
      opacity: 0,
      duration: 0.5,
      stagger: 0.2
    })

    // Pre-order Section Animation
    gsap.from('.preorder-content', {
      scrollTrigger: {
        trigger: '.preorder-section',
        start: 'top center',
        toggleActions: 'play none none reverse'
      },
      y: 100,
      opacity: 0,
      duration: 1
    })

    // Showcase Section Animations
    gsap.utils.toArray('.showcase-card').forEach((card, index) => {
      const content = card.querySelector('.showcase-content');
      const image = card.querySelector('.showcase-image');
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: card,
          start: 'top center',
          end: 'bottom center',
          toggleActions: 'play none none reverse'
        }
      });

      if (index % 2 === 0) {
        tl.from(content, {
          x: -100,
          opacity: 0,
          duration: 1,
          ease: 'power3.out'
        })
        .from(image, {
          x: 100,
          opacity: 0,
          duration: 1,
          ease: 'power3.out'
        }, '-=0.5');
      } else {
        tl.from(content, {
          x: 100,
          opacity: 0,
          duration: 1,
          ease: 'power3.out'
        })
        .from(image, {
          x: -100,
          opacity: 0,
          duration: 1,
          ease: 'power3.out'
        }, '-=0.5');
      }

      // Text reveal animations
      gsap.from(card.querySelectorAll('.gsap-reveal'), {
        scrollTrigger: {
          trigger: card,
          start: 'top center',
          toggleActions: 'play none none reverse'
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2
      });
    });

    // Parallax effect on scroll
    gsap.utils.toArray('.showcase-image').forEach(image => {
      gsap.to(image, {
        yPercent: 20,
        ease: 'none',
        scrollTrigger: {
          trigger: image,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true
        }
      });
    });

    // Enhanced Showcase Section Animations
    gsap.utils.toArray('.showcase-card').forEach((card, index) => {
      const content = card.querySelector('.showcase-content');
      const image = card.querySelector('.showcase-image');
      const color = card.dataset.color;

      // Create timeline for each card
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: card,
          start: 'top center+=100',
          end: 'bottom center',
          toggleActions: 'play none none reverse',
          scrub: false
        }
      });

      // Set initial states
      gsap.set(content, { perspective: 1000 });
      gsap.set(image, { scale: 1.2, opacity: 0 });

      if (index % 2 === 0) {
        tl.from(content, {
          rotateY: -30,
          x: -200,
          opacity: 0,
          duration: 1.5,
          ease: 'power3.out'
        })
        .from(image, {
          rotateY: 30,
          x: 200,
          opacity: 0,
          scale: 1.5,
          duration: 1.5,
          ease: 'power3.out'
        }, '-=1.3');
      } else {
        tl.from(content, {
          rotateY: 30,
          x: 200,
          opacity: 0,
          duration: 1.5,
          ease: 'power3.out'
        })
        .from(image, {
          rotateY: -30,
          x: -200,
          opacity: 0,
          scale: 1.5,
          duration: 1.5,
          ease: 'power3.out'
        }, '-=1.3');
      }

      // Parallax effect with depth
      gsap.to(image, {
        y: '20%',
        scrollTrigger: {
          trigger: card,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true
        }
      });

      // Mouse movement effect
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        gsap.to(image, {
          duration: 1,
          rotateX: ((y - centerY) / centerY) * -5,
          rotateY: ((x - centerX) / centerX) * 5,
          ease: 'power3.out'
        });
      });

      card.addEventListener('mouseleave', () => {
        gsap.to(image, {
          duration: 1,
          rotateX: 0,
          rotateY: 0,
          ease: 'power3.out'
        });
      });
    });

    // Features section animations
    gsap.utils.toArray('.feature-card').forEach((card, index) => {
      const content = card.querySelector('.feature-content');
      const image = card.querySelector('.feature-image-container');
      
      gsap.set(card, { opacity: 1 }); // Reset opacity
      
      gsap.from(content, {
        scrollTrigger: {
          trigger: card,
          start: 'top center+=100',
          toggleActions: 'play none none reverse'
        },
        x: index % 2 === 0 ? -100 : 100,
        opacity: 0,
        duration: 1.2,
        ease: 'power3.out'
      });
      
      gsap.from(image, {
        scrollTrigger: {
          trigger: card,
          start: 'top center+=100',
          toggleActions: 'play none none reverse'
        },
        x: index % 2 === 0 ? 100 : -100,
        opacity: 0,
        duration: 1.2,
        ease: 'power3.out',
        delay: 0.2
      });
    });
  }, [showContent])

  // Update the characters array with import paths
  const characters = [
    {
      name: "Lucia",
      description: "A former cartel enforcer seeking redemption in Vice City",
      image: "/character1.png"  // Use absolute path from public folder
    },
    {
      name: "Jason",
      description: "An ex-military operative turned street racer with a mysterious past",
      image: "/character2.png"
    },
    {
      name: "Marcus",
      description: "A tech genius hacker who controls Vice City's digital underground",
      image: "/character3.png"
    }
  ]



  const galleryImages = [
    {
      url: "./gallery1.png",
      title: "Vice City Nights"
    },
    {
      url: "./gallery2.png",
      title: "Beach Paradise"
    },
    {
      url: "./gallery3.png",
      title: "Street Racing"
    },
    {
      url: "./gallery4.png",
      title: "Downtown Life"
    }
  ]

  // Update the gameFeatures array with proper image paths and gradients
  const gameFeatures = [
    {
      icon: "ri-map-pin-line",
      title: "Dynamic Open World",
      description: "Explore a living, breathing Vice City with dynamic weather and day-night cycles",
      image: "/showcase1.png",
      gradient: "from-orange-500 to-red-500"
    },
    {
      icon: "ri-steering-2-line", 
      title: "Advanced Driving",
      description: "Experience next-gen vehicle physics and the most extensive vehicle roster ever",
      image: "/showcase2.png",
      gradient: "from-blue-500 to-purple-500"
    },
    {
      icon: "ri-sword-line",
      title: "Combat Evolution",
      description: "Master the most sophisticated combat system in GTA history",
      image: "/showcase3.png",
      gradient: "from-red-500 to-pink-500"
    }
  ];

  return (
    <>
      <div className='svg flex items-center justify-center fixed top-0 left-0 w-full h-full z-[100] overflow-hidden bg-[#000]'>
        <svg viewBox='0 0 800 600' preserveAspectRatio='xMidYMid slice'>
          <defs>
            <mask id="viMask">
              <rect width="100%" height="100%" fill="black" />
              <g className='vi-mask-group'>
                <text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle" fontSize="250" fill="white" fontFamily="Arial Black">
                  VI
                </text>
              </g>
            </mask>
          </defs>
          <image
            href='./bg.png'
            width="100%"
            height="100%"
            preserveAspectRatio="xMidYMid slice"
            mask="url(#viMask)"
          />
        </svg>
      </div>

      {showContent && (
        <div className="content-wrapper">
          {/* Main section */}
          <div className="main w-full h-full">
            <div className="landing relative overflow-hidden w-full h-screen bg-black">
              <div className='navbar absolute top-0 left-0 w-full py-10 px-10 z-[10]'>
                <div className='logo flex gap-7'>
                  <div className='lines flex flex-col gap-[5px]'>
                    <div className='line w-12 h-1 bg-white'></div>
                    <div className='line w-6 h-1 bg-white'></div>
                    <div className='line w-4 h-1 bg-white'></div>
                  </div>
                  <h3 className='text-2xl -mt-[8px] leading-none text-white'>Rockstar</h3>
                </div>
              </div>
              <div className="imagesdiv relative w-full h-screen overflow-hidden">
              {/* Sky Layer */}
              <img
                className="sky absolute top-0 left-0 w-full h-full object-cover"
                src="./sky.png"
                alt="sky"
              />

              {/* Buildings / Palm Trees */}
              <img
                className="bg absolute top-0 left-0 w-full h-full object-cover"
                src="./bg.png"
                alt="background buildings"
              />

              <div className='text text-white flex flex-col gap-2 absolute top-5 left-1/2 -translate-x-1/2 '>
                  <h1 className='text-[7rem] leading-none -ml-65'>grand</h1>
                  <h1 className='text-[7rem] leading-none -ml-35'>theft</h1>
                  <h1 className='text-[7rem] leading-none -ml-55'>auto</h1>
                </div>

              {/* Girl in the front */}
              <img
                className="absolute character bottom-0 left-1/2 -translate-x-1/2 translate-y-[30%] w-[450px] md:w-[570px] z-10  "
                src="./girlbg.png"
                alt="girl"
              />
            
              </div>
              <div className='btmbar text-white absolute bottom-0 left-0 w-full py-15 px-10 bg-gradient-to-t from-black to-transparent z-30' >
                <div className='flex gap-4 items-center'>
                  <i className="text-4xl ri-arrow-down-line"></i>
                  <h3 className='text-xl '>Scroll Down</h3>
                </div>
                <img className='absolute top-1/2 left-1/2  -translate-x-1/2 -translate-y-1/2 h-[55px] z-20' src="./ps5.png" alt="" />
              </div>
            </div>
          </div>

          {/* Second section */}
          <div className='w-full h-screen flex items-center justify-center bg-black px-10'>
            <div className='cntnr w-full h-[80%] flex text-white'>
                 <div className='limg relative w-1/2 h-full'>
                <img className='absolute scale-[0.7] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2' src="./imag.png" alt="" />
              </div>
              <div className='rg w-[40%] py-5'>
                <h1 className='text-6xl'>Still Running</h1>
                <h1 className='text-6xl'>Not Hunting</h1>
                <p className='mt-10 text-l font-[Arial]'>
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit. 
                  Sed error adipisci, eveniet rem commodi possimus accusantium sequi 
                  fuga tenetur est sunt natus reprehenderit soluta exercitationem. Dolorum ad perferendis sunt assumenda!
                  </p>
                  <p className='mt-3 text-l font-[Arial]'>
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit. 
                  Sed error adipisci, eveniet rem commodi possimus accusantium sequi 
                  fuga tenetur est sunt natus reprehenderit soluta exercitationem. Dolorum ad perferendis sunt assumenda!
                  </p>
                   <p className='mt-10 text-l font-[Arial]'>
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit. 
                  Sed error adipisci, eveniet rem commodi possimus accusantium sequi 
                  fuga tenetur est sunt natus reprehenderit soluta exercitationem. Dolorum ad perferendis sunt assumenda!
                  </p>
                  <button className='bg-yellow-500 px-5 py-5 text-black text-2xl mt-5 rounded'>Download Now</button>
              </div>
              </div>
            </div>
            <div className='w-full min-h-screen bg-black text-white'>
              {/* Characters Section */}
              <div className="characters-section py-32 relative">
  <h2 className='text-8xl text-center mb-24 relative'>
    <span className='block text-[#ff6b00] opacity-20 absolute top-0 left-1/2 -translate-x-1/2 scale-125 blur-sm'>
      Meet The Crew
    </span>
    <span className='block relative text-white'>
      Meet The Crew
    </span>
  </h2>

  <div className="characters-wrapper">
    {characters.map((character, index) => (
      <div 
        key={index} 
        className="character-card"
        onMouseMove={(e) => {
          const card = e.currentTarget;
          const rect = card.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          
          const rotateY = ((x / rect.width) - 0.5) * 15;
          const rotateX = ((y / rect.height) - 0.5) * -15;
          
          card.style.transform = `
            perspective(1000px)
            rotateX(${rotateX}deg)
            rotateY(${rotateY}deg)
            translateZ(30px)
            scale(1.05)
          `;
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = `
            perspective(1000px)
            rotateX(0)
            rotateY(0)
            translateZ(0)
            scale(1)
          `;
        }}
      >
        <div className="character-image-wrapper">
          <img 
            src={character.image} 
            alt={character.name}
            className="character-image"
          />
          <div className="character-overlay" />
        </div>
        
        <div className="character-content">
          <h3 className="character-title">{character.name}</h3>
          <p className="character-description">{character.description}</p>
        </div>
      </div>
    ))}
  </div>
</div>

              {/* Dynamic Showcase Section */}
              <div className='showcase-section relative min-h-screen py-32 bg-black'>
  {/* Background video or image */}
  <div className="absolute inset-0 z-0">
    <img 
      src="/gta-vice-city-bg.png" 
      alt="background"
      className="w-full h-full object-cover opacity-20"
    />
    <div className="absolute inset-0 bg-gradient-to-b from-black via-black/50 to-black"></div>
  </div>

  <div className="relative z-10 max-w-7xl mx-auto px-6">
    <h2 className="text-8xl mb-32 text-center font-bold">
      <span className="block bg-gradient-to-r from-orange-500 to-red-500 text-transparent bg-clip-text">
        Game Features
      </span>
    </h2>

    <div className="flex flex-col gap-32">
      {gameFeatures.map((feature, index) => (
        <div 
          key={index} 
          className={`flex ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'} 
            items-center gap-16 opacity-0 feature-card`}
        >
          <div className="w-1/2 feature-content">
            <div className="mb-6">
              <i className={`${feature.icon} text-6xl bg-gradient-to-r ${feature.gradient} 
                text-transparent bg-clip-text`}></i>
            </div>
            <h3 className="text-5xl font-bold mb-6 text-white">{feature.title}</h3>
            <p className="text-xl text-gray-400 mb-8">{feature.description}</p>
            <button className={`px-8 py-4 rounded-lg bg-gradient-to-r ${feature.gradient} 
              text-white text-xl transform transition-transform hover:scale-105`}>
              Learn More
            </button>
          </div>
          
          <div className="w-1/2 feature-image-container relative h-[600px] rounded-xl overflow-hidden">
            <img 
              src={feature.image}
              alt={feature.title}
              className="w-full h-full object-cover scale-110 transition-transform 
                duration-700 hover:scale-100"
            />
            <div className={`absolute inset-0 bg-gradient-to-r ${feature.gradient} 
              opacity-20 mix-blend-overlay`}></div>
          </div>
        </div>
      ))}
    </div>
  </div>
</div>

              {/* Gallery Section */}
              <div className='gallery-section py-20 px-10 bg-black'>
                <h2 className='text-7xl mb-16 font-bold text-center'>Visual Showcase</h2>
                <div className='grid grid-cols-1 md:grid-cols-4 gap-4'>
                  {galleryImages.map((image, index) => (
                    <div key={index} className={`gallery-item relative group overflow-hidden rounded-xl
                      ${index === 0 ? 'md:col-span-2 md:row-span-2' : ''}`}>
                      <img src={image.url} alt={image.title} 
                        className='w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 scale-[1.2]' />
                      <div className='absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100
                        transition-opacity duration-500 flex flex-col justify-center items-center'>
                        <i className="ri-zoom-in-line text-5xl mb-4"></i>
                        <h4 className='text-2xl font-bold'>{image.title}</h4>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Pre-order Section */}
              <div className='preorder-section relative h-screen flex items-center justify-center overflow-hidden'>
                <div className='absolute inset-0 bg-black/70 z-10'></div>
                <video autoPlay muted loop className='absolute w-full h-full object-cover'>
                  <source src="./preorder-bg.mp4" type="video/mp4" />
                </video>
                <div className='preorder-content relative z-20 text-center max-w-5xl mx-auto px-6'>
                  <h2 className='text-8xl mb-8 font-bold bg-clip-text text-transparent 
                    bg-gradient-to-r from-yellow-500 via-red-500 to-purple-500'>
                    Pre-order Now
                  </h2>
                  <p className='text-2xl mb-12 text-gray-300 max-w-3xl mx-auto'>
                    Be among the first to experience the next chapter in the Grand Theft Auto series.
                  </p>
                  <div className='flex gap-8 justify-center'>
                    <button className='group relative px-8 py-4 bg-yellow-500 rounded-lg overflow-hidden'>
                      <div className='absolute inset-0 bg-white transition-transform duration-300 
                        transform translate-y-full group-hover:translate-y-0'></div>
                      <span className='relative z-10 text-2xl font-bold text-black transition-colors 
                        duration-300 group-hover:text-yellow-500'>
                        Standard Edition $59.99
                      </span>
                    </button>
                    <button className='group relative px-8 py-4 rounded-lg overflow-hidden
                      bg-gradient-to-r from-purple-600 to-pink-600'>
                      <div className='absolute inset-0 bg-gradient-to-r from-pink-600 to-purple-600 
                        transition-transform duration-300 transform translate-y-full group-hover:translate-y-0'></div>
                      <span className='relative z-10 text-2xl font-bold'>
                        Ultimate Edition $79.99
                      </span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Newsletter Section */}
              <div className='newsletter-section py-20 px-10 bg-[#1a1a1a]'>
                <div className='max-w-4xl mx-auto text-center'>
                  <h2 className='text-4xl mb-6'>Stay Updated</h2>
                  <p className='mb-8'>Subscribe to our newsletter for exclusive content and updates</p>
                  <div className='flex gap-4 justify-center'>
                    <input 
                      type="email" 
                      placeholder="Enter your email" 
                      className='bg-black border border-gray-800 px-6 py-3 w-96 rounded focus:outline-none focus:border-yellow-500'
                    />
                    <button className='bg-yellow-500 px-8 py-3 text-black rounded hover:bg-yellow-400 transition-colors'>
                      Subscribe
                    </button>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <footer className='py-10 px-10 border-t border-gray-800'>
                <div className='flex justify-between items-center'>
                  <div className='flex items-center gap-4'>
                    <img src="./rockstar-logo.png" alt="Rockstar Games" className='h-12' />
                    <p className='text-gray-400'>© 2025 Rockstar Games</p>
                  </div>
                  <div className='flex gap-6'>
                    <i className="ri-twitter-x-line text-2xl hover:text-yellow-500 cursor-pointer"></i>
                    <i className="ri-facebook-fill text-2xl hover:text-yellow-500 cursor-pointer"></i>
                    <i className="ri-instagram-line text-2xl hover:text-yellow-500 cursor-pointer"></i>
                    <i className="ri-youtube-fill text-2xl hover:text-yellow-500 cursor-pointer"></i>
                  </div>
                </div>
              </footer>
            </div>
          </div>
      )}
    </>
  )
}

export default App