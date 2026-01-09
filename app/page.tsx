import BackgroundImage from "./components/BackgroundImage";
import HeroText from "./components/heroText";
import Part1 from "./components/part/part1";
import Part2 from "./components/part/part2";
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
        </>
    );
};
export default App;
