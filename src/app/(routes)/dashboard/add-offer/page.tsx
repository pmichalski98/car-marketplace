import AddOfferForm from "./_components/add-offer-form"

function AddOfferPage() {
   return (
      <section className="flex  flex-col items-center justify-center">
         <h1 className="text-2xl font-bold">Dodaj ofertę </h1>
         <AddOfferForm />
      </section>
   )
}
export default AddOfferPage
