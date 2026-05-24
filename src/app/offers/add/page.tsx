import AddOfferView from "@/sections/OffersView/AddOfferView";

type AddOfferPageProps = {
  searchParams: Promise<{ mode?: string }>;
};

export default async function AddOfferPage({ searchParams }: AddOfferPageProps) {
  const { mode } = await searchParams;

  return <AddOfferView mode={mode === "edit" ? "edit" : "create"} />;
}
