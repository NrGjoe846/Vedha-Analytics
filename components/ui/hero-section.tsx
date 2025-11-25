import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Button } from './button'
import { InfiniteSlider } from './infinite-slider'
import { ProgressiveBlur } from './progressive-blur'
import { cn } from '../../lib/utils'
import { generateTagline } from '../../services/gemini'

export function HeroSection() {
    const [tagline, setTagline] = useState<string>("Premium IT, AI & Government Solutions");
    const [isLoadingTagline, setIsLoadingTagline] = useState(true);

    useEffect(() => {
        const fetchTagline = async () => {
            const result = await generateTagline();
            setTagline(result);
            setIsLoadingTagline(false);
        };
        fetchTagline();
    }, []);

    return (
        <main className="overflow-x-hidden relative bg-[#030712] text-white">
            <section>
                <div className="pb-24 pt-24 md:pb-32 lg:pb-56 lg:pt-32">
                    <div className="relative mx-auto flex max-w-7xl flex-col px-6 lg:block">
                        <div className="mx-auto max-w-lg text-center lg:ml-0 lg:w-1/2 lg:text-left z-20 relative">
                            <div className="inline-block px-4 py-1.5 mb-6 rounded-full border border-vedha-blue/30 bg-vedha-blue/10 text-vedha-blue text-xs font-bold tracking-widest uppercase animate-fade-in-up">
                                Gemini 3 Powered Intelligence
                            </div>
                            <h1 className="mt-4 max-w-2xl text-balance text-4xl font-display font-bold md:text-6xl lg:mt-6 xl:text-7xl">
                                Innovating India Through <span className="text-transparent bg-clip-text bg-gradient-to-r from-vedha-blue to-vedha-purple">Technology & AI</span>
                            </h1>
                            
                            <div className="mt-8 h-20">
                                {isLoadingTagline ? (
                                    <div className="h-6 w-3/4 bg-white/10 rounded animate-pulse mx-auto lg:mx-0"></div>
                                ) : (
                                    <p className="max-w-2xl text-pretty text-lg text-gray-400 italic border-l-2 border-vedha-purple pl-4">
                                        "{tagline}"
                                    </p>
                                )}
                            </div>

                            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row lg:justify-start">
                                <Button
                                    asChild
                                    size="lg"
                                    className="px-8 py-6 bg-vedha-blue hover:bg-blue-600 text-white rounded-full text-base font-semibold shadow-[0_0_20px_rgba(59,130,246,0.3)] transition-all hover:scale-105">
                                    <Link to="/services">
                                        <span className="text-nowrap">Explore Services</span>
                                    </Link>
                                </Button>
                                <Button
                                    asChild
                                    size="lg"
                                    variant="ghost"
                                    className="px-8 py-6 text-base text-gray-300 hover:text-white hover:bg-white/10 rounded-full border border-white/10">
                                    <Link to="/contact">
                                        <span className="text-nowrap">Request Consultation</span>
                                    </Link>
                                </Button>
                            </div>
                        </div>
                        
                        {/* Hero Image / Graphic */}
                        <div className="pointer-events-none mt-12 lg:absolute lg:inset-0 lg:-right-20 lg:-top-20 lg:mt-0 lg:h-full lg:w-2/3 lg:object-contain z-10 opacity-80 mix-blend-lighten">
                             {/* Abstract Tech Graphic */}
                             <img
                                className="w-full h-full object-cover lg:object-right mask-image-gradient"
                                src="https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=2070&auto=format&fit=crop" 
                                alt="Abstract Technology"
                             />
                             <div className="absolute inset-0 bg-gradient-to-r from-[#030712] via-[#030712]/50 to-transparent"></div>
                             <div className="absolute inset-0 bg-gradient-to-t from-[#030712] via-transparent to-transparent"></div>
                        </div>
                    </div>
                </div>
            </section>
            
            {/* Logo Marquee */}
            <section className="bg-background pb-16 md:pb-24 border-b border-white/5">
                <div className="group relative m-auto max-w-6xl px-6">
                    <div className="flex flex-col items-center md:flex-row">
                        <div className="md:max-w-44 md:border-r border-white/10 md:pr-6 mb-8 md:mb-0">
                            <p className="text-center md:text-end text-sm text-gray-500 uppercase tracking-widest font-semibold">Trusted by<br/>Government & Tech</p>
                        </div>
                        <div className="relative py-2 md:w-[calc(100%-11rem)] w-full overflow-hidden">
                            <InfiniteSlider
                                durationOnHover={20}
                                duration={40}
                                gap={60}>
                                {['Ministry of IT', 'Digital India', 'Smart City', 'Cyber Cell', 'Tech Corp', 'GovCloud', 'AI Research', 'InfraTech'].map((logo, i) => (
                                    <div key={i} className="flex items-center justify-center px-4">
                                        <span className="text-xl font-display font-bold text-gray-700 hover:text-vedha-blue transition-colors cursor-default whitespace-nowrap">
                                            {logo}
                                        </span>
                                    </div>
                                ))}
                            </InfiniteSlider>

                            <div className="bg-gradient-to-r from-[#030712] to-transparent absolute inset-y-0 left-0 w-20 z-10"></div>
                            <div className="bg-gradient-to-l from-[#030712] to-transparent absolute inset-y-0 right-0 w-20 z-10"></div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    )
}