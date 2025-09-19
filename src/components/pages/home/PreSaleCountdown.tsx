"use client";

import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { BorderBeam } from "@/components/magicui/border-beam";
import { MagicCard } from "@/components/magicui/magic-card";
import AnimatedGradientText from "@/components/magicui/animated-gradient-text";
import { Button } from "@/components/ui/button";
import { Clock, Zap } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import { PRESALE_END_DATE } from "@/utils/presale-utils";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

interface PreSaleCountdownProps {
  className?: string;
  showBuyButton?: boolean;
  onBuyClick?: () => void;
  compact?: boolean;
  onExpiryChange?: (isExpired: boolean) => void;
}

export default function PreSaleCountdown({ 
  className, 
  showBuyButton = true, 
  onBuyClick,
  compact = false,
  onExpiryChange
}: PreSaleCountdownProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [isExpired, setIsExpired] = useState(false);

  // Use the centralized pre-sale end date
  const targetDate = PRESALE_END_DATE;

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const target = targetDate.getTime();
      const difference = target - now;

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        setTimeLeft({ days, hours, minutes, seconds });
        if (isExpired) {
          setIsExpired(false);
          onExpiryChange?.(false);
        }
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        if (!isExpired) {
          setIsExpired(true);
          onExpiryChange?.(true);
        }
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, []);

  const timeUnits = [
    { label: "Days", value: timeLeft.days },
    { label: "Hours", value: timeLeft.hours },
    { label: "Minutes", value: timeLeft.minutes },
    { label: "Seconds", value: timeLeft.seconds },
  ];

  if (compact) {
    return (
      <div className={cn("flex flex-col items-center space-y-4", className)}>
        <AnimatedGradientText className="text-sm">
          <Clock className="mr-2 h-4 w-4" />
          Pre-Sale Ends Soon
        </AnimatedGradientText>
        
        <div className="flex items-center space-x-2 text-sm">
          {timeUnits.map((unit, index) => (
            <React.Fragment key={unit.label}>
              <div className="flex flex-col items-center">
                <div className="bg-gradient-to-r from-[#5F9FE7] to-[#154C89] text-white px-2 py-1 rounded-md font-bold min-w-[40px] text-center">
                  {unit.value.toString().padStart(2, "0")}
                </div>
                <span className="text-xs text-muted-foreground mt-1">{unit.label}</span>
              </div>
              {index < timeUnits.length - 1 && (
                <span className="text-muted-foreground">:</span>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className={cn("w-full max-w-4xl mx-auto", className)}>
      <MagicCard
        className="relative overflow-hidden bg-gradient-to-br from-background/80 to-background/40 backdrop-blur-sm border-white/10"
        gradientColor="#5F9FE7"
        gradientOpacity={0.1}
      >
        <BorderBeam size={250} duration={12} delay={9} />
        
        <div className="relative z-10 p-6 md:p-8 lg:p-12">
          {/* Header */}
          <div className="text-center mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <AnimatedGradientText className="mb-4 text-lg">
                <Zap className="mr-2 h-5 w-5" />
                Limited Time Offer
              </AnimatedGradientText>
            </motion.div>
            
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4"
            >
              Pre-Sale Ends In
            </motion.h2>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-muted-foreground text-lg max-w-2xl mx-auto"
            >
              Don't miss your chance to get ACCES tokens at the best price. 
              Secure your position in the future of gaming!
            </motion.p>
          </div>

          {/* Countdown Display */}
          {!isExpired ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-8"
            >
              {timeUnits.map((unit, index) => (
                <motion.div
                  key={unit.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                  className="relative group"
                >
                  <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#5F9FE7]/20 to-[#154C89]/20 backdrop-blur-sm border border-white/10 p-4 md:p-6 text-center transition-all duration-300 group-hover:scale-105 group-hover:shadow-lg group-hover:shadow-[#5F9FE7]/20">
                    <div className="absolute inset-0 bg-gradient-to-br from-[#5F9FE7]/10 to-[#154C89]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    
                    <div className="relative z-10">
                      <motion.div
                        key={unit.value}
                        initial={{ scale: 1.2, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.3 }}
                        className="text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-[#5F9FE7] to-[#154C89] bg-clip-text text-transparent mb-2"
                      >
                        {unit.value.toString().padStart(2, "0")}
                      </motion.div>
                      
                      <div className="text-sm md:text-base text-muted-foreground font-medium uppercase tracking-wider">
                        {unit.label}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-8"
            >
              <div className="text-4xl md:text-5xl font-bold text-red-500 mb-4">
                Pre-Sale Ended
              </div>
              <p className="text-muted-foreground text-lg">
                The pre-sale has concluded. Thank you for your interest!
              </p>
            </motion.div>
          )}

          {/* Call to Action */}
          {showBuyButton && !isExpired && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="text-center"
            >
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                {onBuyClick ? (
                  isExpired ? (
                    <Button
                      disabled
                      size="lg"
                      className="relative bg-gray-500 text-white font-semibold px-8 py-4 rounded-xl cursor-not-allowed"
                    >
                      <span className="relative z-10 flex items-center">
                        <Clock className="mr-2 h-5 w-5" />
                        Pre-Sale Ended
                      </span>
                    </Button>
                  ) : (
                    <Button
                      onClick={onBuyClick}
                      size="lg"
                      className="relative group bg-gradient-to-r from-[#5F9FE7] to-[#154C89] hover:from-[#447ab8] hover:to-[#0f3a6b] text-white font-semibold px-8 py-4 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-[#5F9FE7]/30"
                    >
                      <span className="relative z-10 flex items-center">
                        <Zap className="mr-2 h-5 w-5" />
                        Buy ACCES Now
                      </span>
                      <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl" />
                    </Button>
                  )
                ) : (
                  isExpired ? (
                    <Button
                      disabled
                      size="lg"
                      className="relative bg-gray-500 text-white font-semibold px-8 py-4 rounded-xl cursor-not-allowed"
                    >
                      <span className="relative z-10 flex items-center">
                        <Clock className="mr-2 h-5 w-5" />
                        Pre-Sale Ended
                      </span>
                    </Button>
                  ) : (
                    <Button
                      asChild
                      size="lg"
                      className="relative group bg-gradient-to-r from-[#5F9FE7] to-[#154C89] hover:from-[#447ab8] hover:to-[#0f3a6b] text-white font-semibold px-8 py-4 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-[#5F9FE7]/30"
                    >
                      <Link href="/buy-acces">
                        <span className="relative z-10 flex items-center">
                          <Zap className="mr-2 h-5 w-5" />
                          Buy ACCES Now
                        </span>
                        <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl" />
                      </Link>
                    </Button>
                  )
                )}
                
                <div className="text-sm text-muted-foreground">
                  <span className="font-semibold text-[#5F9FE7]">Current Price:</span> $0.20
                  <span className="mx-2">•</span>
                  <span className="font-semibold text-orange-500">Next Price:</span> $0.25
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </MagicCard>
    </div>
  );
}
