import { useState } from "react";
import { motion } from "framer-motion"; // Import motion
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
import { fadeInUpVariants, staggerContainerVariants } from "@/utils/animation";

const semesters = Array.from({ length: 8 }, (_, i) => `Semester ${i + 1}`);
const branches = [
  "Civil",
  "Electrical",
  "Computer",
  "Electronics & Communication",
];

const Home = () => {
  const navigate = useNavigate();
  const [selectedSemester, setSelectedSemester] = useState<string>("");
  const [selectedBranch, setSelectedBranch] = useState<string>("");

  const handleSearch = () => {
    navigate(`/pdfs?semester=${selectedSemester}&branch=${selectedBranch}`);
  };

  return (
    <motion.div
      className="min-h-screen"
      initial="hidden"
      animate="visible"
      variants={staggerContainerVariants}
    >
      <section className="relative h-screen flex items-center overflow-hidden">
        {/* Simple Gradient Background */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-600 dark:from-slate-800 dark:to-slate-950"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        />

        {/* Main Content */}
        <div className="relative w-full max-w-7xl mx-auto px-4">
          {/* Hero Text */}
          <motion.div
            className="text-center mb-16"
            variants={staggerContainerVariants}
          >
            <motion.h1
              className="text-4xl md:text-6xl font-bold text-white mb-6"
              variants={fadeInUpVariants}
            >
              Engineering Study Materials
              <br />
              All in One Place
            </motion.h1>
            <motion.p
              className="text-xl text-gray-100 mb-8 max-w-2xl mx-auto"
              variants={fadeInUpVariants}
            >
              Access thousands of engineering PDFs, notes, and study materials
            </motion.p>
          </motion.div>

          {/* Search Card */}
          <motion.div
            className="max-w-4xl mx-auto bg-white/10 backdrop-blur-sm rounded-xl shadow-2xl p-8 border border-white/20"
            variants={fadeInUpVariants}
            //whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Semester Selection */}
              <motion.div
                className="space-y-2"
                variants={fadeInUpVariants}
              >
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
              </motion.div>

              {/* Branch Selection */}
              <motion.div
                className="space-y-2"
                variants={fadeInUpVariants}
              >
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
              </motion.div>
            </div>

            <motion.div
              variants={fadeInUpVariants}
              //whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                className="w-full mt-6 bg-white/10 hover:bg-white/20 text-white border border-white/20
                          backdrop-blur-sm transition-all duration-300"
                disabled={!selectedSemester || !selectedBranch}
                onClick={handleSearch}
              >
                Search PDFs
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <motion.div
        variants={fadeInUpVariants}
        viewport={{ once: true }}
        whileInView="visible"
        initial="hidden"
      >
        <Features />
      </motion.div>

      {/* Recent */}
      <motion.div
        variants={fadeInUpVariants}
        viewport={{ once: true }}
        whileInView="visible"
        initial="hidden"
      >
        <Recent />
      </motion.div>
    </motion.div>
  );
};

export default Home;