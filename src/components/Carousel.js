import { useEffect, useState, useRef } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { Image, Box, useBreakpointValue } from "@chakra-ui/react";

import "./Carousel.css";

const DRAG_BUFFER = 0;
const VELOCITY_THRESHOLD = 500;
const GAP = 16;
const SPRING_OPTIONS = { type: "spring", stiffness: 300, damping: 30 };

// Separate component for carousel items to properly use hooks
const CarouselItem = ({ item, index, x, currentIndex, totalItems, itemWidth, trackItemOffset, effectiveTransition, round }) => {
  const range = [
    -(index + 1) * trackItemOffset,
    -index * trackItemOffset,
    -(index - 1) * trackItemOffset,
  ];
  const outputRange = [90, 0, -90];
  const rotateY = useTransform(x, range, outputRange, { clamp: false });
  const opacity = useTransform(
    rotateY,
    [-90, -60, -30, 0, 30, 60, 90],
    [0.5, 0.7, 0.9, 1, 0.9, 0.7, 0.5]
  );

  return (
    <motion.div
      key={index}
      className={`carousel-item ${round ? "round" : ""}`}
      style={{
        width: itemWidth,
        height: round ? itemWidth : "auto",
        rotateY: rotateY,
        opacity: opacity,
        zIndex: index === currentIndex % totalItems ? 10 : 1,
        ...(round && { borderRadius: "50%" }),
      }}
      transition={effectiveTransition}
    >
      <Box
        height="100%"
        width="100%"
        overflow="hidden"
        borderRadius={round ? "50%" : "xl"}
        boxShadow="none"
      >
        <Image
          src={item.src}
          alt={item.alt || "Health image"}
          objectFit="cover"
          height="100%"
          width="100%"
          fallbackSrc="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='600' height='400' viewBox='0 0 600 400' %3E%3Crect width='100%25' height='100%25' fill='%23319795'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='sans-serif' font-size='24px' fill='white'%3EHealth Monitoring%3C/text%3E%3C/svg%3E"
        />
      </Box>
    </motion.div>
  );
};

export default function Carousel({
  items = [],
  baseWidth = 450,
  autoplay = true,
  autoplayDelay = 2000,
  pauseOnHover = true,
  loop = true,
  round = false,
}) {
  // Handle responsive width
  const responsiveWidth = useBreakpointValue(
    typeof baseWidth === 'object' ? baseWidth : { base: baseWidth }
  );
  
  const containerPadding = 8;
  const itemWidth = responsiveWidth - containerPadding * 2;
  const trackItemOffset = itemWidth + GAP;

  const carouselItems = loop ? [...items, items[0]] : items;
  const [currentIndex, setCurrentIndex] = useState(0);
  const x = useMotionValue(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isResetting, setIsResetting] = useState(false);

  const containerRef = useRef(null);
  useEffect(() => {
    if (pauseOnHover && containerRef.current) {
      const container = containerRef.current;
      const handleMouseEnter = () => setIsHovered(true);
      const handleMouseLeave = () => setIsHovered(false);
      container.addEventListener("mouseenter", handleMouseEnter);
      container.addEventListener("mouseleave", handleMouseLeave);
      return () => {
        container.removeEventListener("mouseenter", handleMouseEnter);
        container.removeEventListener("mouseleave", handleMouseLeave);
      };
    }
  }, [pauseOnHover]);

  useEffect(() => {
    if (autoplay && (!pauseOnHover || !isHovered)) {
      const timer = setInterval(() => {
        setCurrentIndex((prev) => {
          if (prev === items.length - 1 && loop) {
            return prev + 1;
          }
          if (prev === carouselItems.length - 1) {
            return loop ? 0 : prev;
          }
          return prev + 1;
        });
      }, autoplayDelay);
      return () => clearInterval(timer);
    }
  }, [
    autoplay,
    autoplayDelay,
    isHovered,
    loop,
    items.length,
    carouselItems.length,
    pauseOnHover,
  ]);

  const effectiveTransition = isResetting ? { duration: 0 } : SPRING_OPTIONS;

  const handleAnimationComplete = () => {
    if (loop && currentIndex === carouselItems.length - 1) {
      setIsResetting(true);
      x.set(0);
      setCurrentIndex(0);
      setTimeout(() => setIsResetting(false), 50);
    }
  };

  const handleDragEnd = (_, info) => {
    const offset = info.offset.x;
    const velocity = info.velocity.x;
    if (offset < -DRAG_BUFFER || velocity < -VELOCITY_THRESHOLD) {
      if (loop && currentIndex === items.length - 1) {
        setCurrentIndex(currentIndex + 1); // Go to clone.
      } else {
        setCurrentIndex((prev) => Math.min(prev + 1, carouselItems.length - 1));
      }
    } else if (offset > DRAG_BUFFER || velocity > VELOCITY_THRESHOLD) {
      if (loop && currentIndex === 0) {
        setCurrentIndex(items.length - 1);
      } else {
        setCurrentIndex((prev) => Math.max(prev - 1, 0));
      }
    }
  };

  const dragProps = loop
    ? {}
    : {
      dragConstraints: {
        left: -trackItemOffset * (carouselItems.length - 1),
        right: 0,
      },
    };

  return (
    <div
      ref={containerRef}
      className={`carousel-container ${round ? "round" : ""}`}
      style={{
        width: `${responsiveWidth}px`,
        ...(round && { height: `${responsiveWidth}px`, borderRadius: "50%" }),
      }}
    >
      <motion.div
        className="carousel-track"
        drag="x"
        {...dragProps}
        style={{
          width: itemWidth,
          gap: `${GAP}px`,
          perspective: 1000,
          perspectiveOrigin: `${currentIndex * trackItemOffset + itemWidth / 2}px 50%`,
          x,
        }}
        onDragEnd={handleDragEnd}
        animate={{ x: -(currentIndex * trackItemOffset) }}
        transition={effectiveTransition}
        onAnimationComplete={handleAnimationComplete}
      >
        {carouselItems.map((item, index) => (
          <CarouselItem
            key={index}
            item={item}
            index={index}
            x={x}
            currentIndex={currentIndex}
            totalItems={items.length}
            itemWidth={itemWidth}
            trackItemOffset={trackItemOffset}
            effectiveTransition={effectiveTransition}
            round={round}
          />
        ))}
      </motion.div>
      <div className={`carousel-indicators-container ${round ? "round" : ""}`}>
        <div className="carousel-indicators">
          {items.map((_, index) => (
            <motion.div
              key={index}
              className={`carousel-indicator ${currentIndex % items.length === index ? "active" : "inactive"
                }`}
              animate={{
                scale: currentIndex % items.length === index ? 1.2 : 1,
              }}
              onClick={() => setCurrentIndex(index)}
              transition={{ duration: 0.15 }}
            />
          ))}
        </div>
      </div>
    </div>
  );
} 