import { useEffect } from "react";
import axios from "../../api/index";
export default function Auth() {
  useEffect(() => {
    console.log("run");
    axios.get("");
  });
  return (
    <div className="text-red-700">
      <button>a</button>
    </div>
  );
}
