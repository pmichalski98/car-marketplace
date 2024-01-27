import AddOfferForm from "./_components/add-offer-form"

function AddOfferPage() {
   return (
      <main className="mt-20 ">
         <h1 className="text-center text-3xl font-bold">Dodaj ofertę </h1>
         <section className="mt-10 px-4 lg:px-10">
            <AddOfferForm />
         </section>
      </main>
   )
}
export default AddOfferPage
