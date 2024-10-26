import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation"; // Import navigation styles

export default function Listing() {
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const params = useParams();

  useEffect(() => {
    const fetchListing = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/listing/get/${params.listingId}`);
        const data = await res.json();
        if (data.success === false) throw new Error(data.message);
        console.log(data);
        setListing(data);
      } catch (err) {
        console.log(err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchListing();
  }, [params.listingId]);

  return (
    <main>
      {loading && <p className="text-center my-7 text-2xl">Loading...</p>}
      {error && (
        <p className="text-center my-7 text-2xl">Something went wrong!</p>
      )}
      {listing && !loading && !error && (
        <Swiper modules={[Navigation]} navigation>
          {listing.imageUrls.map((url) => (
            <SwiperSlide key={url}>
              <img
                src={url}
                className="w-full h-[40vh] md:h-[50vh] object-cover"
                alt="Listing Image"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </main>
  );
}
