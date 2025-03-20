"use client"

import { Card } from "@/components/ui/card"

export default function StudioPanel() {
  return (
    <div className="h-full p-4 content-layer-darker border-l border-white/20 dark:border-gray-700/20">
      <Card className="card-gradient p-4">
        <h3 className="text-lg font-medium mb-4">Document Context</h3>
        <div className="space-y-4">
          <div>
            <h4 className="font-medium mb-2">Active Files</h4>
            <div className="text-sm text-muted-foreground">No files in context</div>
          </div>
          <div>
            <h4 className="font-medium mb-2">Knowledge Base</h4>
            <div className="text-sm text-muted-foreground">No knowledge base connected</div>
          </div>
        </div>
      </Card>
    </div>
  )
}

