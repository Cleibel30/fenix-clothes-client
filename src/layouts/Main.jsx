import { Link } from "react-router-dom";
import { Slider } from "../components/Slider";


export const Main = () => {
  return (
    <main className="container marginTop z-1">
      <div className="row">
        <div className="col-sm-12 col-md-12 col-lg-12 p-0">
          <Slider />
        </div>

      </div>
    </main>
  )
}
