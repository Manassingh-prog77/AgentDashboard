"use client";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

// Utility to format timestamp
const formatDate = (timestamp: number) =>
  new Date(timestamp).toLocaleString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [agentsData, setAgentsData] = useState<any[]>([]);
  const rowsPerPage = 5;
  const router = useRouter();

  useEffect(() => {
    const fetchAgentsData = async () => {
      try {
        const response = await fetch("https://api.retellai.com/list-agents", {
          method: "GET",
          headers: {
            Authorization: "Bearer key_caba942c1deb87e371563fadf38e",
          },
        });
        const data = await response.json();
        setAgentsData(data);
      } catch (error) {
        console.error("Error fetching agents data:", error);
      }
    };

    fetchAgentsData();
  }, []);

  const filteredAgents =
    agentsData && agentsData.length > 0
      ? agentsData.filter((agent: any) =>
          agent.agent_name.toLowerCase().includes(searchQuery.toLowerCase())
        )
      : [];

  const totalPages = Math.ceil(filteredAgents.length / rowsPerPage);
  const paginatedData = filteredAgents.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const handleRowClick = (id: string) => {
   router.push(`/components/agents/${id}`); // Navigate to the agent detail page with the agent's ID
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-50 text-black p-6">
      <div className="w-[90%] max-w-6xl">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
          <Input
            type="text"
            placeholder="Search by Agent Name..."
            className="w-full md:w-[350px] bg-white border border-gray-300 text-gray-800 text-sm font-medium px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Select>
            <SelectTrigger className="w-[220px] bg-blue-500 text-white hover:bg-blue-600 text-sm font-medium px-4 py-2 rounded-md">
              <SelectValue placeholder="Create an Agent" />
            </SelectTrigger>
            <SelectContent className="bg-white border border-gray-300 rounded-md shadow-md">
              <SelectItem value="single-prompt-agent" disabled>
                Single Prompt Agent
              </SelectItem>
              <SelectItem value="multi-prompt-agent" disabled>
                Multi-Prompt Agent
              </SelectItem>
              <SelectItem value="custom-llm" disabled>Custom LLM</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Table Section */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <Table className="w-full">
            <TableCaption className="text-gray-600 text-sm font-medium py-2">
              A detailed list of agents and their information.
            </TableCaption>
            <TableHeader>
              <TableRow className="bg-blue-500 text-black">
                <TableHead className="px-4 py-3 text-left text-white text-sm font-semibold">Agent Name</TableHead>
                <TableHead className="px-4 py-3 text-left text-white text-sm font-semibold">Agent Type</TableHead>
                <TableHead className="px-4 py-3 text-left text-white text-sm font-semibold">Voice</TableHead>
                <TableHead className="px-4 py-3 text-left text-white text-sm font-semibold">Edited By</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedData.length > 0 ? (
                paginatedData.map((agent, index) => (
                  <TableRow
                    key={index}
                    className="hover:bg-gray-100 transition-all cursor-pointer"
                    onClick={() => handleRowClick(agent.agent_id)}
                  >
                    <TableCell className="px-4 py-3 text-sm">{agent.agent_name}</TableCell>
                    <TableCell className="px-4 py-3 text-sm">{agent.response_engine.type}</TableCell>
                    <TableCell className="px-4 py-3 text-sm">{agent.voice_id}</TableCell>
                    <TableCell className="px-4 py-3 text-sm">
                      {formatDate(agent.last_modification_timestamp)}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={4}
                    className="text-center px-4 py-6 text-sm font-medium text-gray-600"
                  >
                    No agents found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>

          {/* Pagination */}
          <div className="flex items-center justify-between px-4 py-3 bg-gray-100">
            <Button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((prev) => prev - 1)}
              className="bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium px-4 py-2 rounded-md disabled:bg-gray-300"
            >
              Previous
            </Button>
            <span className="text-gray-700 text-sm font-medium">
              Page {currentPage} of {totalPages}
            </span>
            <Button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((prev) => prev + 1)}
              className="bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium px-4 py-2 rounded-md disabled:bg-gray-300"
            >
              Next
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
