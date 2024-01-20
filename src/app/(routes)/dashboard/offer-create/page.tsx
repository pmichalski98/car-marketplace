import AddOfferForm from "./_components/add-offer-form"

function AddOfferPage() {
   return (
      <section className="flex h-full flex-col items-center py-10">
         <h1 className="text-2xl font-bold">Dodaj ofertę </h1>
         <AddOfferForm />
      </section>
   )
}
export default AddOfferPage
