"use client";

import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { BorderBeam } from "@/components/magicui/border-beam";
import { MagicCard } from "@/components/magicui/magic-card";
import AnimatedGradientText from "@/components/magicui/animated-gradient-text";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, ExternalLink, TrendingUp, Calendar, CheckCircle, ArrowRight, ChevronLeft, ChevronRight, Play, Pause } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { EXCHANGE_LISTINGS, getListingStatus, getTimeUntilListing, type ExchangeListing } from "@/data/ExchangeListings";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isListed: boolean;
}

export default function ExchangeListings() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [timeLeftMap, setTimeLeftMap] = useState<Record<string, TimeLeft>>({});
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Update countdown timers
  useEffect(() => {
    const updateTimers = () => {
      const newTimeLeftMap: Record<string, TimeLeft> = {};
      EXCHANGE_LISTINGS.forEach(listing => {
        // Use listing date for countdown
        const countdownDate = listing.listingDate;
        // Only calculate countdown if we have a valid date
        if (countdownDate && countdownDate !== '') {
          newTimeLeftMap[listing.id] = getTimeUntilListing(countdownDate);
        } else {
          // For listings without dates, return a default state
          newTimeLeftMap[listing.id] = { days: 0, hours: 0, minutes: 0, seconds: 0, isListed: false };
        }
      });
      setTimeLeftMap(newTimeLeftMap);
    };

    updateTimers();
    const timer = setInterval(updateTimers, 3000);
    return () => clearInterval(timer);
  }, []);

  // Auto-slider effect
  useEffect(() => {
    if (!isAutoPlaying) return;

    const autoSlideTimer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % EXCHANGE_LISTINGS.length);
    }, 3000); // Change slide every 3 seconds

    return () => clearInterval(autoSlideTimer);
  }, [isAutoPlaying]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % EXCHANGE_LISTINGS.length);
    setIsAutoPlaying(false); // Pause auto-play when user interacts
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + EXCHANGE_LISTINGS.length) % EXCHANGE_LISTINGS.length);
    setIsAutoPlaying(false); // Pause auto-play when user interacts
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false); // Pause auto-play when user interacts
  };

  const toggleAutoPlay = () => {
    setIsAutoPlaying(!isAutoPlaying);
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <AnimatedGradientText className="mb-6 text-lg">
          <TrendingUp className="mr-2 h-5 w-5" />
          Exchange Listings
        </AnimatedGradientText>
        
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
          ACCES Goes <span className="bg-gradient-to-r from-[#5F9FE7] to-[#154C89] bg-clip-text text-transparent">Live</span>
        </h2>
        
        <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
          Get ready for ACCES token listings on major exchanges. Track countdown timers, 
          prepare for trading, and be among the first to access ACCES on these platforms.
        </p>
      </motion.div>

      {/* Main Slider Container */}
      <div className="relative">
        {/* Navigation Buttons */}
        <Button
          variant="outline"
          size="icon"
          onClick={prevSlide}
          className="absolute -left-6 md:-left-12 top-1/2 -translate-y-1/2 z-10 bg-background/80 backdrop-blur-sm border-white/20 hover:bg-background/90"
          aria-label="Previous exchange listing"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        
        <Button
          variant="outline"
          size="icon"
          onClick={nextSlide}
          className="absolute -right-6 md:-right-12 top-1/2 -translate-y-1/2 z-10 bg-background/80 backdrop-blur-sm border-white/20 hover:bg-background/90"
          aria-label="Next exchange listing"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>

        {/* Play/Pause Button */}
        <Button
          variant="outline"
          size="icon"
          onClick={toggleAutoPlay}
          className="absolute top-4 right-4 z-10 bg-background/80 backdrop-blur-sm border-white/20 hover:bg-background/90"
          aria-label={isAutoPlaying ? "Pause auto-slide" : "Resume auto-slide"}
        >
          {isAutoPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
        </Button>

        {/* Cards Container */}
        <div className="overflow-hidden rounded-3xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: 300 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -300 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            >
              <ExchangeCard
                listing={EXCHANGE_LISTINGS[currentSlide]}
                timeLeft={timeLeftMap[EXCHANGE_LISTINGS[currentSlide]?.id] || { days: 0, hours: 0, minutes: 0, seconds: 0, isListed: false }}
              />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Slide Indicators */}
        <div className="flex justify-center mt-8 space-x-2">
          {EXCHANGE_LISTINGS.map((_, index) => (
            <button
              title={`Go to slide ${index + 1}`}
              key={index}
              onClick={() => goToSlide(index)}
              className={cn(
                "w-3 h-3 rounded-full transition-all duration-300",
                index === currentSlide
                  ? "bg-gradient-to-r from-[#5F9FE7] to-[#154C89] scale-125"
                  : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
              )}
            />
          ))}
        </div>
      </div>

      {/* All Listings Preview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="mt-16"
      >
        <h3 className="text-2xl font-bold text-center mb-8">All Exchange Listings</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {EXCHANGE_LISTINGS.map((listing, index) => (
            <motion.div
              key={listing.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              onClick={() => goToSlide(index)}
              className="cursor-pointer"
            >
              <MiniExchangeCard
                listing={listing}
                timeLeft={timeLeftMap[listing.id] || { days: 0, hours: 0, minutes: 0, seconds: 0, isListed: false }}
                isActive={index === currentSlide}
              />
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

function ExchangeCard({ listing, timeLeft }: { listing: ExchangeListing; timeLeft: TimeLeft }) {
  const status = getListingStatus(listing);
  
  return (
    <MagicCard
      className="relative overflow-hidden bg-gradient-to-br from-background/80 to-background/40 backdrop-blur-sm border-white/10"
      gradientColor={listing.colors.primary}
      gradientOpacity={0.1}
    >
      <BorderBeam size={300} duration={15} delay={0} />
      
      <div className="relative z-10 p-8 md:p-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Exchange Info */}
          <div className="space-y-6">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/20 flex items-center justify-center p-2">
                <Image
                  src={listing.logo}
                  alt={`${listing.name} logo`}
                  width={48}
                  height={48}
                  className={cn(
                    "w-12 h-12 object-contain",
                    listing.id === 'bitmart' && "brightness-0 invert",
                    listing.id === 'bingx' && "logo-bingx"
                  )}
                />
              </div>
              <div>
                <h3 className="text-3xl font-bold text-foreground">{listing.name}</h3>
                <Badge 
                  variant="outline" 
                  className="mt-1"
                  style={{ borderColor: listing.colors.accent, color: listing.colors.accent }}
                >
                  {listing.zone}
                </Badge>
              </div>
            </div>

            <p className="text-muted-foreground text-lg leading-relaxed text-left">
              {listing.description}
            </p>

            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 rounded-full bg-gradient-to-r from-[#5F9FE7] to-[#154C89]" />
                    <span className="text-foreground font-medium">Trading Pair: {listing.tradingPair}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 rounded-full bg-gradient-to-r from-[#5F9FE7] to-[#154C89]" />
                    <span className="text-foreground font-medium">Trading Zone: {listing.zone}</span>
                  </div>
                </div>
                
                <div className="space-y-3">
                  {listing.depositDate && (
                    <div className="flex items-center space-x-3">
                      <Calendar className="w-4 h-4 text-muted-foreground" />
                      <span className="text-muted-foreground">
                        <span className="font-medium">Deposit:</span> {new Date(listing.depositDate).toLocaleDateString('en-US', { 
                          month: '2-digit', 
                          day: '2-digit', 
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                          timeZoneName: 'short'
                        })}
                      </span>
                    </div>
                  )}
                  <div className="flex items-center space-x-3">
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                    <span className="text-muted-foreground">
                      <span className="font-medium">Trading:</span> {listing.listingDate && listing.listingDate !== '' 
                        ? new Date(listing.listingDate).toLocaleDateString('en-US', { 
                            month: '2-digit', 
                            day: '2-digit', 
                            year: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit',
                            timeZoneName: 'short'
                          })
                        : 'Stay tuned'
                      }
                    </span>
                  </div>
                  {listing.withdrawalDate && (
                    <div className="flex items-center space-x-3">
                      <Calendar className="w-4 h-4 text-muted-foreground" />
                      <span className="text-muted-foreground">
                        <span className="font-medium">Withdrawal:</span> {listing.withdrawalDate && listing.withdrawalDate !== '' 
                          ? new Date(listing.withdrawalDate).toLocaleDateString('en-US', { 
                              month: '2-digit', 
                              day: '2-digit', 
                              year: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit',
                              timeZoneName: 'short'
                            })
                          : 'Stay tuned'
                        }
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {listing.features.map((feature, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span className="text-sm text-foreground">{feature}</span>
                </div>
              ))}
            </div>

            <div className="flex space-x-4">
              <Button
                variant="outline"
                asChild
                className="border-white/20 hover:bg-white/5"
              >
                <a href={listing.announcementUrl} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Announcement
                </a>
              </Button>
              
              <Button
                variant="outline"
                asChild
                className="border-white/20 hover:bg-white/5"
              >
                <a href="https://docs.metacces.com/whitepaper/acces-coin/metacces-listings-roadmap" target="_blank" rel="noopener noreferrer">
                  <TrendingUp className="w-4 h-4 mr-2" />
                  Listing Roadmap
                </a>
              </Button>
              
              {timeLeft.isListed && (
                <Button
                  asChild
                  className="bg-gradient-to-r from-[#5F9FE7] to-[#154C89] hover:from-[#447ab8] hover:to-[#0f3a6b]"
                >
                  <a href={listing.tradingUrl} target="_blank" rel="noopener noreferrer">
                    <TrendingUp className="w-4 h-4 mr-2" />
                    Trade Now
                  </a>
                </Button>
              )}
            </div>
          </div>

          {/* Right Side - Countdown */}
          <div className="flex flex-col items-center justify-center">
            {timeLeft.isListed ? (
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="text-center space-y-6"
              >
                <div className="w-24 h-24 rounded-full bg-gradient-to-r from-green-500 to-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCircle className="w-12 h-12 text-white" />
                </div>
                <div>
                  <h4 className="text-3xl font-bold text-green-500 mb-2">Now Listed!</h4>
                  <p className="text-muted-foreground">ACCES is now available for trading</p>
                </div>
                <Button
                  size="lg"
                  asChild
                  className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700"
                >
                  <a href={listing.tradingUrl} target="_blank" rel="noopener noreferrer">
                    Start Trading
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </a>
                </Button>
              </motion.div>
            ) : (
              <div className="text-center space-y-6">
                {(listing.listingDate && listing.listingDate !== '') ? (
                  <>
                    <div className="flex items-center justify-center space-x-2 mb-4">
                      <Clock className="w-5 h-5 text-[#5F9FE7]" />
                      <span className="text-lg font-medium text-[#5F9FE7]">
                        Listing In
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {[
                        { label: "Days", value: timeLeft.days },
                        { label: "Hours", value: timeLeft.hours },
                        { label: "Minutes", value: timeLeft.minutes },
                        { label: "Seconds", value: timeLeft.seconds },
                      ].map((unit, index) => (
                        <motion.div
                          key={unit.label}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.4, delay: index * 0.1 }}
                          className="relative group"
                        >
                          <div 
                            className={cn(
                              "relative overflow-hidden rounded-2xl backdrop-blur-sm border border-white/10 p-4 text-center transition-all duration-300 group-hover:scale-105",
                              listing.id === 'lbank' ? "countdown-card-lbank" : 
                              listing.id === 'bitmart' ? "countdown-card-bitmart" :
                              listing.id === 'bingx' ? "countdown-card-bingx" : "countdown-card-mexc"
                            )}
                          >
                            <motion.div
                              key={unit.value}
                              initial={{ scale: 1.2, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}
                              transition={{ duration: 0.3 }}
                              className={cn(
                                "text-2xl md:text-3xl font-bold mb-1",
                                listing.id === 'lbank' ? "countdown-text-lbank" : 
                                listing.id === 'bitmart' ? "countdown-text-bitmart" :
                                listing.id === 'bingx' ? "countdown-text-bingx" : "countdown-text-mexc"
                              )}
                            >
                              {unit.value.toString().padStart(2, "0")}
                            </motion.div>
                            <div className="text-xs md:text-sm text-muted-foreground font-medium uppercase tracking-wider">
                              {unit.label}
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </>
                ) : (
                  <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="text-center space-y-6"
                  >
                    <div className="w-24 h-24 rounded-full bg-gradient-to-r from-[#5F9FE7] to-[#154C89] flex items-center justify-center mx-auto">
                      <Clock className="w-12 h-12 text-white" />
                    </div>
                    <div>
                      <h4 className="text-3xl font-bold text-[#5F9FE7] mb-2">Listing Soon</h4>
                      <p className="text-muted-foreground">Stay tuned for official announcement</p>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      {listing.features.map((feature, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          <span className="text-sm text-foreground">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </MagicCard>
  );
}

function MiniExchangeCard({ listing, timeLeft, isActive }: { listing: ExchangeListing; timeLeft: TimeLeft; isActive: boolean }) {
  return (
    <div 
      className={cn(
        "relative overflow-hidden rounded-2xl backdrop-blur-sm border transition-all duration-300 p-6 hover:scale-105",
        isActive 
          ? "border-[#5F9FE7] bg-gradient-to-br from-[#5F9FE7]/10 to-[#154C89]/5" 
          : "border-white/10 bg-gradient-to-br from-white/5 to-white/2 hover:border-white/20"
      )}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/20 flex items-center justify-center p-1">
            <Image
              src={listing.logo}
              alt={`${listing.name} logo`}
              width={32}
              height={32}
              className={cn(
                "w-8 h-8 object-contain",
                listing.id === 'bitmart' && "brightness-0 invert",
                listing.id === 'bingx' && "logo-bingx"
              )}
            />
          </div>
          <div>
            <h4 className="font-bold text-foreground">{listing.name}</h4>
            <p className="text-sm text-muted-foreground">{listing.tradingPair}</p>
          </div>
        </div>
        <Badge 
          variant="outline" 
          className="text-xs"
          style={{ borderColor: listing.colors.accent, color: listing.colors.accent }}
        >
          {listing.zone}
        </Badge>
      </div>

      {timeLeft.isListed ? (
        <div className="flex items-center justify-between">
          <span className="text-green-500 font-medium flex items-center">
            <CheckCircle className="w-4 h-4 mr-1" />
            Listed
          </span>
          <Button size="sm" variant="outline">
            Trade
          </Button>
        </div>
      ) : !listing.listingDate || listing.listingDate === '' ? (
        <div className="text-center">
          <div className="text-sm text-muted-foreground mb-2">Listing Soon</div>
          <div className="text-xs text-foreground">Stay tuned</div>
        </div>
      ) : (
        <div className="text-center">
          <div className="text-sm text-muted-foreground mb-2">Listing in</div>
          <div className="flex justify-center space-x-2 text-sm font-mono">
            <span className="text-foreground">{timeLeft.days}d</span>
            <span className="text-foreground">{timeLeft.hours}h</span>
            <span className="text-foreground">{timeLeft.minutes}m</span>
          </div>
        </div>
      )}
    </div>
  );
}
