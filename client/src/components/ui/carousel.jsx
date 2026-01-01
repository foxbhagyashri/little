import * as React from "react"
import Autoplay from "embla-carousel-autoplay"
import {
  Carousel as CarouselPrimitive,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel-base"

function Carousel({ opts, autoplay = false, children, ...props }) {
  const plugins = React.useMemo(() => {
    if (!autoplay) return []
    return [Autoplay(typeof autoplay === "object" ? autoplay : {})]
  }, [autoplay])

  return (
    <CarouselPrimitive opts={opts} plugins={plugins} {...props}>
      {children}
    </CarouselPrimitive>
  )
}

export { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious }
