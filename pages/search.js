import { useRouter } from "next/dist/client/router";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { format } from "date-fns";
import InfoCard from "../components/InfoCard";

export default function Search({ searchResults }) {
  const router = useRouter();
  const { location, startDate, endDate, noOfGuests } = router.query;

  const formattedStartDate = format(new Date(startDate), "dd MMMM yy");
  const formattedEndDate = format(new Date(endDate), "dd MMMM yy");
  const range = `${formattedStartDate} - ${formattedEndDate}`;

  return (
    <div>
      <Header placeholder={`${location} | ${range} | ${noOfGuests}`} />

      <main className="flex">
        <section className="flex-grow pt-14 px-6">
          <p className="text-sm">
            300+ Stays - {range} - for {noOfGuests} guests
          </p>

          <h1 className="text-2xl font-semibold mt-2 mb-6">
            Stays in {location}
          </h1>

          <div
            className="hidden lg:inline-flex mb-5 space-x-3 text-gray-800
		  whitespace-nowrap"
          >
            <p className="button">Cancelation Flexibility</p>
            <p className="button">Type of Place</p>
            <p className="button">Price</p>
            <p className="button">Rooms and Bed</p>
            <p className="button">More filters</p>
          </div>

          <div className="flex flex-col">
            {searchResults.map((item, idx) => (
              <InfoCard
                key={idx}
                location={item.location}
                description={item.description}
                img={item.img}
                price={item.price}
                star={item.star}
                title={item.title}
                total={item.total}
              />
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export async function getServerSideProps() {
  const searchResults = await fetch("https://links.papareact.com/isz").then(
    (res) => res.json()
  );

  return {
    props: {
      searchResults,
    },
  };
}
