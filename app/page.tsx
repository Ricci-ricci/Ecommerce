import BackgroundImage from "./components/BackgroundImage";
import HeroText from "./components/heroText";
import Part1 from "./components/part/part1";
import Part2 from "./components/part/part2";
import Part3 from "./components/part/part3";
import Part4 from "./components/part/part4";
import Part5 from "./components/part/part5";
import Part6 from "./components/part/part6";
import Navbar from "./navbar/navbar";
const App = () => {
    return (
        <>
            <Navbar />
            <BackgroundImage>
                <HeroText />
            </BackgroundImage>
            <Part1></Part1>
            <Part2></Part2>
            <Part3></Part3>
            <Part4></Part4>
            <Part5></Part5>
            <Part6></Part6>
        </>
    );
};
export default App;
