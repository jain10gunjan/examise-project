import AllCalculators from "@/components/calculators/AllCalculators";
import HomepageComponent from "@/components/examisehome/HomepageComponent";
import Services from "@/components/examisehome/Services";

export default function Home() {
  return (
    <main>
    
       <HomepageComponent/>
      {/* <Services/> */}
      <AllCalculators/>
     </main>
  );
}
