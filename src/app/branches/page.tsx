import { getBranchesAction } from "src/actions/branches";
import BranchesView from "src/sections/BranchesView/view";

export default async function BranchesPage() {
  const result = await getBranchesAction();
  const initialBranches = result.success ? result.data : [];

  return <BranchesView initialBranches={initialBranches} />;
}