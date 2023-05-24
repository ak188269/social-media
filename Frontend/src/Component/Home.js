import "./Home.css"
import { useNavigate } from "react-router-dom";
function Home() {
const navigate=useNavigate();
const getStarted=()=>{
 navigate("/login");
}
  return (
    <>

      {/* ----------hero section begins here -------- */}

      <section id="hero-section">
        <main>

          <div id="hero-section-text" className="hs-items">
            <span className="text-items">
              Are you feeling alone and boring
            </span>
            <span className="text-items">
              ?
            </span>
            <span className="text-items">

              come let`s have fun
            </span>
            <button id="my-button" onClick={getStarted} style={{width:"fit-content",padding:".7rem 1rem"}}>Get started</button>
          </div>
          <div className="hs-items chat-gif">
            <img src="homePage.gif" alt="" />
        
          </div>
        </main>
   
       
      </section>
    </>
  )
}

export default Home;