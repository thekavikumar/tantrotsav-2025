import { useState, useEffect } from 'react';
import axios from 'axios';
import { FiSearch, FiFilter } from 'react-icons/fi'; // Import icons
import EventCard from '../components/EventCard';
import Loading from "../components/Loading";

function Events() {
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [clubFilter, setClubFilter] = useState('All'); // New state for filter
  const [filteredEvents, setFilteredEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get(
          `/api/events`
        );
        setEvents(response.data);
        setFilteredEvents(response.data); // Initial filtering
      } catch (error) {
        console.error('Error fetching events:', error);
      }
      finally {
        setIsLoading(false);
      }
    };

    fetchEvents();
  }, []);

  // Automatically filter events as user types or changes filter
  useEffect(() => {
    const query = searchQuery.toLowerCase();
    let filtered = events.filter((event) =>
      event.title.toLowerCase().includes(query)
    );

    if (clubFilter !== 'All') {
      filtered = filtered.filter((event) => event.clubName === clubFilter);
    }

    setFilteredEvents(filtered);
  }, [searchQuery, clubFilter, events]);

  // Extract unique club names for filtering
  const uniqueClubs = [
    'All',
    ...new Set(events.map((event) => event.clubName)),
  ];

  if (isLoading) {
    // Display a loading spinner or placeholder while fetching
    return <Loading />;
  }

  return (
    <div className="w-full min-h-screen py-16 px-4 sm:px-6 lg:px-8 pt-28  bg-gradient-to-br from-black to-indigo-950 text-white">
      <h2 className="text-5xl font-bold text-center mb-8">Upcoming Events</h2>

      {/* Search and Filter Section */}
      <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-8">
        {/* Search Bar */}
        <div className="relative w-full max-w-[300px]">
          <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-black" />
          <input
            type="text"
            placeholder="Search events..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full p-2 pl-10 border-2 border-black rounded-[5px] text-[#323232] focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>

        {/* Filter Dropdown */}
        <div className="relative w-full max-w-[180px] sm:max-w-[130px]">
          <FiFilter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-black" />
          <select
            value={clubFilter}
            onChange={(e) => setClubFilter(e.target.value)}
            className="w-full p-2 pl-10 border-2 border-black rounded-[5px] text-[#323232] bg-white focus:outline-none focus:ring-2 focus:ring-black appearance-none"
          >
            {uniqueClubs.map((clubName) => (
              <option key={clubName} value={clubName} className="text-left">
                {clubName}
              </option>
            ))}
          </select>
        </div>
        <a href="https://www.google.com" target="_blank" rel="noopener noreferrer">
          <button className="text-sm sm:text-base px-2.5 block text-center border-2 border-blue-600 bg-blue-600 text-white py-2  rounded-lg hover:bg-blue-800 transition">
            All Events
          </button>
        </a>
      </div>

      {/* Display Events */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-y-32 justify-items-center">
        {filteredEvents.map((event) => (
          <EventCard key={event._id} event={event} />
        ))}
      </div>

      {/* No Results Fallback */}
      {filteredEvents.length === 0 && (
        <p className="text-center text-gray-500 mt-8">
          No events found matching your criteria.
        </p>
      )}
    </div>
  );
}

export default Events;
