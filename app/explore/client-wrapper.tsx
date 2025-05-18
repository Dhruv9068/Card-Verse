"use client"

import dynamic from "next/dynamic"

// Import the client component with dynamic import to ensure it only runs on the client
const ExploreClient = dynamic(() => import("./explore-client"), {
  ssr: false,
  loading: () => null,
})

export default function ClientWrapper() {
  return <ExploreClient />
}
