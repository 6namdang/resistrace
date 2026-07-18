import { useState } from "react"

import { AppHeader } from "@/components/layout/app-header"
import { AppSidebar } from "@/components/layout/app-sidebar"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { TooltipProvider } from "@/components/ui/tooltip"
import { AnalyzePage } from "@/pages/analyze-page"
import { DashboardPage } from "@/pages/dashboard-page"
import { LibraryPage } from "@/pages/library-page"
import type { GenomeSelection } from "@/types/genome"
import type { AppSection } from "@/types/navigation"
import type { WorkflowStep } from "@/types/workflow"

export default function App() {
  const [selectedGenome, setSelectedGenome] =
    useState<GenomeSelection | null>(null)
  const [currentStep, setCurrentStep] = useState<WorkflowStep>("upload")
  const [currentSection, setCurrentSection] =
    useState<AppSection>("workbench")

  function handleGenomeChange(genome: GenomeSelection | null) {
    setSelectedGenome(genome)
    if (!genome) {
      setCurrentStep("upload")
    }
  }

  return (
    <TooltipProvider>
      <SidebarProvider>
        <AppSidebar
          currentSection={currentSection}
          onNavigate={setCurrentSection}
        />
        <SidebarInset className="!w-0 min-w-0 overflow-hidden">
          <AppHeader currentStep={currentStep} />
          <main className="flex-1 overflow-auto">
            {currentSection !== "workbench" ? (
              <LibraryPage
                section={currentSection}
                selectedGenome={selectedGenome}
                onOpenWorkbench={() => setCurrentSection("workbench")}
              />
            ) : currentStep === "upload" || !selectedGenome ? (
              <DashboardPage
                selectedGenome={selectedGenome}
                onSelectedGenomeChange={handleGenomeChange}
                onContinue={() => setCurrentStep("analyze")}
              />
            ) : (
              <AnalyzePage
                selectedGenome={selectedGenome}
                onBack={() => setCurrentStep("upload")}
              />
            )}
          </main>
        </SidebarInset>
      </SidebarProvider>
    </TooltipProvider>
  )
}
