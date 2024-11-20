"use client";
import { useEffect, useState } from "react";
import { FaCog, FaHashtag, FaCalendar } from "react-icons/fa";
import { BsSoundwave } from "react-icons/bs";
import { Input } from "@/components/ui/input";

// SidebarLeft Component to fetch and display voices data
const SidebarLeft = () => {
  const [voicesData, setVoicesData] = useState<any[]>([]); // State to store voices data
  const [loading, setLoading] = useState<boolean>(true); // To handle loading state
  const [error, setError] = useState<string | null>(null); // To handle errors
  const [searchQuery, setSearchQuery] = useState<string>("");

  useEffect(() => {
    const fetchVoicesData = async () => {
      try {
        // Fetch the voices data from the API
        const response = await fetch("https://api.retellai.com/list-voices", {
          method: "GET",
          headers: {
            Authorization: "Bearer key_caba942c1deb87e371563fadf38e", // Replace with actual API key
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch voices data");
        }

        const data = await response.json();
        setVoicesData(data); // Set voices data from the API response
      } catch (error) {
        setError("Error fetching voices data");
        console.error("Error fetching voices data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchVoicesData();
  }, []); // This effect runs only once when the component mounts

  // Group the voices by language (based on accent)
  const languages = [
    { name: "English", voices: [] },
    { name: "Spanish", voices: [] },
    { name: "French", voices: [] },
  ];

  // Assign the voices to their respective languages based on the accent
  voicesData.forEach((voice) => {
    if (voice.accent === "American") {
      languages[0].voices.push({
        name: voice.voice_name,
        gender: voice.gender === "male" ? "Male" : "Female",
      });
    } else if (voice.accent === "Spanish") {
      languages[1].voices.push({
        name: voice.voice_name,
        gender: voice.gender === "male" ? "Male" : "Female",
      });
    } else if (voice.accent === "French") {
      languages[2].voices.push({
        name: voice.voice_name,
        gender: voice.gender === "male" ? "Male" : "Female",
      });
    }
  });

  if (loading) {
    return <div>Loading...</div>; // Show loading state
  }

  if (error) {
    return <div>{error}</div>; // Show error message if fetch failed
  }

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  // Filter voices based on search query
  const filteredLanguages = languages.map((language) => {
    const filteredVoices = language.voices.filter((voice) =>
      voice.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    return { ...language, voices: filteredVoices };
  });

  return (
    <div className="flex flex-col h-screen bg-white border-r shadow-md">
      {/* Header and Search Bar */}
      <div className="p-4 text-center">
        <h2 className="text-lg font-bold text-gray-950 mb-3">Select Voice</h2>
        <Input
          placeholder="🔍 Search Voice/Language"
          className="w-full border-gray-300 rounded-md"
          value={searchQuery} // Controlled component
          onChange={handleSearchChange} // Handle input change
        />
      </div>

      {/* Language Sections */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {filteredLanguages.map((language) => (
          <div key={language.name}>
            {/* Language Title */}
            <div className="flex items-center">
              <div className="flex-grow h-px bg-gray-300"></div>
              <h3 className="mx-3 text-sm font-semibold text-gray-700 text-center">
                {language.name}
              </h3>
              <div className="flex-grow h-px bg-gray-300"></div>
            </div>
            <div className="space-y-2">
              {/* Voices */}
              {language.voices.length > 0 ? (
                language.voices.map((voice) => (
                  <div
                    key={voice.name}
                    className="flex items-center justify-between p-2 bg-gray-100 rounded-md hover:bg-gray-200"
                  >
                    <span className="text-gray-700">{voice.name}</span>
                    <span
                      className={`px-2 py-1 text-xs font-semibold rounded-md ${
                        voice.gender === "Female"
                          ? "bg-pink-100 text-pink-600"
                          : "bg-blue-100 text-blue-600"
                      }`}
                    >
                      {voice.gender}
                    </span>
                  </div>
                ))
              ) : (
                <div className="text-center text-gray-500">No voices available</div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Combined Sidebar Component
export default function CombinedSidebar() {
  const [activeSection, setActiveSection] = useState<string>("voices");

  const icons = [
    { icon: BsSoundwave, label: "Microphone", section: "voices" },
    { icon: FaCog, label: "Configure", section: "settings" },
    { icon: FaCalendar, label: "Calendar", section: "calendar" },
    { icon: FaHashtag, label: "Settings", section: "configure" },
  ];

  return (
    <div className="flex flex-row w-full h-screen bg-gray-100">
      {/* Leftmost Sidebar */}
      <div className="flex flex-col w-[24%] bg-gray-200 border-r shadow-lg">
        <div className="flex flex-col items-center py-8 space-y-9">
          {icons.map((item, index) => (
            <div
              key={index}
              onClick={() => setActiveSection(item.section)}
              className={`flex items-center justify-center w-12 h-12 rounded-full shadow-md transition ${
                activeSection === item.section
                  ? "bg-purple-500 text-white"
                  : "bg-gray-300 text-gray-600"
              } hover:bg-purple-500 hover:text-white`}
            >
              <item.icon className="text-xl" />
            </div>
          ))}
        </div>
      </div>

      {/* Right Sidebar Content */}
      <div className="flex flex-col w-[76%] bg-white border-r shadow-md">
        {activeSection === "voices" && <SidebarLeft />}
        {activeSection === "configure" && (
          <div className="p-6">
            <h2 className="text-lg font-bold">Configuration</h2>
            <p>Adjust application configurations here.</p>
          </div>
        )}
        {activeSection === "calendar" && (
          <div className="p-6">
            <h2 className="text-lg font-bold">Calendar</h2>
            <p>Manage your calendar events here.</p>
          </div>
        )}
        {activeSection === "settings" && (
          <div className="p-6">
            <h2 className="text-lg font-bold">Settings</h2>
            <p>Customize application settings here.</p>
          </div>
        )}
      </div>
    </div>
  );
}
