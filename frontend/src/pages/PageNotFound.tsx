import { Button } from "@/components/ui/button";
import { GoBack } from "@/utils/goBack";
import { MoveLeft } from "lucide-react";

const PageNotFound = () => {
  return <div className="flex flex-col space-y-3 items-center justify-center h-screen font-medium">
    <h2 className="">The route you're trying to access could not be found</h2>
    <Button variant='outline' onClick={GoBack()}>
      Go Back<MoveLeft size={8} />
    </Button>
  </div>;
};

export default PageNotFound;
