import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Features from "@/components/Features";
import Recent from "@/components/Recent";
import { useNavigate } from "react-router-dom";

const semesters = Array.from({ length: 8 }, (_, i) => `Semester ${i + 1}`);
const branches = [
  "Civil",
  "Electrical",
  "Computer",
  "Electronics & Communication",
];

const Home = () => {
  const navigate = useNavigate()
  const [selectedSemester, setSelectedSemester] = useState<string>("");
  const [selectedBranch, setSelectedBranch] = useState<string>("");


  const handleSearch = () => { navigate(`/pdfs?semester=${selectedSemester}&branch=${selectedBranch}`); }

  return (
    <div className="min-h-screen">
      <section className="relative h-screen flex items-center overflow-hidden">
        {/* Simple Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-600 dark:from-slate-800 dark:to-slate-950" />

        {/* Main Content */}
        <div className="relative w-full max-w-7xl mx-auto px-4">
          {/* Hero Text */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Engineering Study Materials
              <br />
              All in One Place
            </h1>
            <p className="text-xl text-gray-100 mb-8 max-w-2xl mx-auto">
              Access thousands of engineering PDFs, notes, and study materials
            </p>
          </div>

          {/* Search Card */}
          <div className="max-w-4xl mx-auto bg-white/10 backdrop-blur-sm rounded-xl shadow-2xl p-8 border border-white/20">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Semester Selection */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-white/90">
                  Select Semester
                </label>
                <Select onValueChange={setSelectedSemester} value={selectedSemester}>
                  <SelectTrigger className="bg-white/10 border-white/20 text-white">
                    <SelectValue placeholder="Choose Semester" />
                  </SelectTrigger>
                  <SelectContent>
                    {semesters.map((semester) => (
                      <SelectItem key={semester} value={semester}>
                        {semester}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Branch Selection */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-white/90">
                  Select Branch
                </label>
                <Select onValueChange={setSelectedBranch} value={selectedBranch}>
                  <SelectTrigger className="bg-white/10 border-white/20 text-white">
                    <SelectValue placeholder="Choose Branch" />
                  </SelectTrigger>
                  <SelectContent>
                    {branches.map((branch) => (
                      <SelectItem key={branch} value={branch}>
                        {branch}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Button
              className="w-full mt-6 bg-white/10 hover:bg-white/20 text-white border border-white/20
                        backdrop-blur-sm transition-all duration-300"
              disabled={!selectedSemester || !selectedBranch}
              onClick={handleSearch}
            >
              Search PDFs
            </Button>
          </div>
        </div>
      </section>


      {/* features */}
      <Features />
      {/* Recent */}
      <Recent />
    </div>
  );
};

export default Home;