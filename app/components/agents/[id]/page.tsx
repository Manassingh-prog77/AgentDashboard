"use client";
import { useParams } from "next/navigation"; // Using useParams from next/navigation
import { useState, useEffect } from "react";

export default function AgentDescription() {
  const { id } = useParams(); // Get the agent ID from the URL params using useParams
  const [agentName, setAgentName] = useState<string | null>(null); // State to hold agent name
  const [loading, setLoading] = useState<boolean>(true); // To handle loading state
  const [error, setError] = useState<string | null>(null); // To handle any error

  useEffect(() => {
    const fetchAgentData = async () => {
      try {
        // Make API call to fetch agent data
        const response = await fetch(`https://api.retellai.com/get-agent/${id}`, {
          method: "GET",
          headers: {
            Authorization: "Bearer key_caba942c1deb87e371563fadf38e", // Replace with actual API key
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch agent data");
        }

        const data = await response.json();

        // Extract agent name from the response
        setAgentName(data.agent_name);
      } catch (error) {
        setError("Error fetching agent data");
        console.error("Error fetching agent data:", error);
      } finally {
        setLoading(false); // Stop loading once data is fetched
      }
    };

    fetchAgentData();
  }, [id]); // Effect runs whenever the `id` changes

  return (
    <>
      {/* Navbar */}
      <div className="flex items-center justify-center bg-purple-600 h-16 px-8 text-white shadow-lg">
        {/* Centered Agent Name in Navbar */}
        <div className="text-xl font-semibold text-center">
          {loading ? "Loading..." : error ? error : `Agent Name: ${agentName}`}
        </div>
      </div>
    </>
  );
}
