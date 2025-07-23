"use client"

import { useEffect, useRef } from "react"

interface VideoBackgroundProps {
  videoId: string
}

export default function VideoBackground({ videoId }: VideoBackgroundProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null)

  useEffect(() => {
    // Create YouTube Player API script
    const tag = document.createElement("script")
    tag.src = "https://www.youtube.com/iframe_api"
    const firstScriptTag = document.getElementsByTagName("script")[0]
    firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag)

    // Initialize player when API is ready
    ;(window as any).onYouTubeIframeAPIReady = () => {
      new (window as any).YT.Player(iframeRef.current!, {
        videoId: videoId,
        playerVars: {
          autoplay: 1,
          controls: 0,
          disablekb: 1,
          fs: 0,
          iv_load_policy: 3,
          loop: 1,
          modestbranding: 1,
          playsinline: 1,
          rel: 0,
          showinfo: 0,
          mute: 1, // Must be muted for autoplay
        },
        events: {
          onReady: (event: any) => {
            event.target.playVideo()
          },
          onStateChange: (event: any) => {
            // Loop the video when it ends
            if (event.data === (window as any).YT.PlayerState.ENDED) {
              event.target.playVideo()
            }
          },
        },
      })
    }
  }, [videoId])

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute inset-0 flex items-center justify-center">
        <iframe
          ref={iframeRef}
          id="youtube-player"
          className="absolute w-[100vw] h-[56.25vw] min-h-[100vh] min-w-[177.77vh]"
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  )
}