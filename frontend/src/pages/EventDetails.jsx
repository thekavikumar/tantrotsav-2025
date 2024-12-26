import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import useAuthStore from "../store/authStore";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function EventDetails() {
  const navigate = useNavigate();

  const { user, setUser } = useAuthStore();
  const [isLoading, setIsLoading] = useState(false);
  const { eventId } = useParams();
  const [event, setEvent] = useState(null);

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/events/${eventId}`
        );
        setEvent(response.data);
      } catch (error) {
        console.error("Error fetching event details:", error);
      }
    };

    fetchEventDetails();
  }, [eventId]);

  if (!event) return <div>Loading...</div>;

  const addToCart = async () => {
    if (!user) {
      toast.error("Please sign in to add to cart");
      return;
    }

    setIsLoading(true);

    try {
      // Fetch user's cart to check for any conflicting events
      const cartResponse = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/users/${user.email}/cart`
      );
      const cartItems = cartResponse.data.cart;

      // Create a Date object for the event time
      const eventDateTime = new Date(`${event.date} ${event.time}`);

      // Check for events with the same date and time in the user's cart
      const isConflict = cartItems.some((item) => {
        const cartEventDateTime = new Date(
          `${item.eventId.date} ${item.eventId.time}`
        );
        return cartEventDateTime.getTime() === eventDateTime.getTime();
      });

      if (isConflict) {
        toast.error("You already have an event at the same time in your cart.");
        setIsLoading(false);
        return;
      }

      // Proceed to add the event to the cart if no conflict
      // eslint-disable-next-line no-unused-vars
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/users/${user.email}/cart`,
        { eventId: event._id }
      );

      // Refetch updated user data
      const updatedUserResponse = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/auth/${user.email}`
      );

      // Update the Zustand store with new user data
      setUser(updatedUserResponse.data.user);

      toast.success("Event added to cart successfully!");
    } catch (error) {
      if (error.response?.data?.error === "Event is already in your cart") {
        toast.error("This event is already in your cart!");
      } else {
        toast.error(
          error.response?.data?.error ||
            "Failed to add event to cart. Try again!"
        );
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="min-h-screen h-auto bg-slate-200 p-4 sm:p-6 md:p-8 lg:p-20">
        <button
          className="mt-16 mb-4 sm:mt-0 md:mt-0 text-white py-2 px-3 bg-sky-500 w-fit rounded-lg hover:bg-sky-600 hover:text-white"
          onClick={() => {
            navigate("/events");
          }}
        >
          Back
        </button>
        <div className="flex flex-col lg:flex-row justify-center items-start lg:items-stretch gap-6 lg:gap-8">
          {/* Left Section (Image Placeholder) */}
          <img
            src={event.thumbnail || "/default-thumbnail.jpg"}
            alt={event.title}
            className="w-full lg:w-1/2 rounded-2xl object-cover"
          />

          {/* Right Section (Content) */}
          <div className="w-full lg:pl-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between gap-2 sm:gap-0">
                <h1 className="text-xl font-extrabold sm:test-2xl">
                  {event.title}
                </h1>
                {event.documents && (
                  <a
                    href={event.documents}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <button className="test-xl sm:test-2xl block text-center bg-blue-600 text-white py-1.5 px-3 rounded-lg hover:bg-blue-800 transition">
                      Download Document
                    </button>
                  </a>
                )}
              </div>
              <p className="mt-2">
                <span className="text-sm sm:text-base font-bold">
                  Description
                </span>
              </p>
              <p className="text-justify text-sm sm:text-base">
                {event.description}
              </p>
              <p className="mt-4">
                <span className="text-sm sm:text-base font-bold">Date: </span>
                <span>{new Date(event.date).toLocaleDateString()}</span>
              </p>
              <p>
                <span className="text-sm sm:text-base font-bold">Time: </span>
                <span>{event.time}</span>
              </p>
              <p>
                <span className="text-sm sm:text-base font-bold">Venue: </span>
                <span>{event.location}</span>
              </p>
              {event.registrationFee && (
                <p>
                  <span className="text-sm sm:text-base font-bold">
                    Registration Fee:{" "}
                  </span>
                  <span>
                    {event.registrationFee
                      ? `₹${event.registrationFee}`
                      : "Free"}
                  </span>
                </p>
              )}
            </div>

            {/* Button */}
            <div className="mt-6 flex justify-start">
              {user && (
                <button
                  onClick={addToCart}
                  className={`text-sm sm:text-base px-2.5 border-2 border-black py-2 inline-block text-white bg-black rounded-lg hover:bg-transparent hover:text-black hover:border-2 hover:border-black transition ${
                    isLoading ? "bg-gray-300 cursor-not-allowed" : ""
                  }`}
                  disabled={isLoading}
                >
                  {isLoading ? "Adding..." : "Add to Cart"}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default EventDetails;
