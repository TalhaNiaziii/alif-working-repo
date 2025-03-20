import FileManager from "@/components/file-manager"
import AssignmentGenerator from "@/components/assignment-generator"
import AssignmentSolver from "@/components/assignment-solver"

export default function AssignmentsPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Assignments</h1>
      <div className="space-y-6">
        <FileManager />
        <AssignmentGenerator />
        <AssignmentSolver />
      </div>
    </div>
  )
}

